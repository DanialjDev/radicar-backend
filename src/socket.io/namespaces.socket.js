const userModel = require("./../model/user");
const chatRoomModel = require("./../model/chatRoom");
const chatMessageModel = require("./../model/chatMessage");
const carModel = require("./../model/car");
const jwt = require('jsonwebtoken');
// const {assignUserToAvailableSupport}  = require("./../utils/assignUserToAvailableSupport");
const axios = require('axios');


exports.initConnectionUserInternal = (io) => {

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.headers.auth;

      if (!token || !token.startsWith('Bearer ')) {
        return next(new Error('توکن ارسال نشده یا فرمت اشتباه است'));
      }

      const pureToken = token.split(' ')[1];
      const decoded = jwt.verify(pureToken, process.env.JWT_SECRET);

      const user = await userModel.findOne({ _id: decoded._id });
      if (!user) return next(new Error('کاربر یافت نشد'));

      socket.user = user;
      next();
    } catch (err) {
      console.error('خطای احراز هویت:', err);
      return next(new Error('احراز هویت ناموفق'));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.user._id.toString();


    socket.on("joinChat", ({ chatRoomId }) => {
      if (chatRoomId) socket.join(chatRoomId);
    });

    socket.on("leaveChat", ({ chatRoomId }) => {
      if (chatRoomId) socket.leave(chatRoomId);
    });

    socket.on("getChats", async () => {
      try {
        const chats = await chatRoomModel
          .find({ userId: userId })
          .populate({
            path: "carId",
            select: " name",
        })          .sort({ createdAt: -1 })
          .lean();
          console.log(userId);
          

          if (chats.length === 0) {

            const findCar = await carModel.find({ userId });
            console.log(findCar);
            
            if (findCar.length === 0) {
              return socket.emit("chatsListError", { message: "ماشینی برای شما ثبت نشده است" });
            }

            let newChats = [];
            for (const car of findCar) {
              // Check if chat room for this car already exists for this user
              const existingChat = await chatRoomModel.findOne({ userId, carId: car._id });
              if (!existingChat) {
                const newChat = await chatRoomModel.create({
                  userId,
                  carId: car._id,
                });
                newChats.push(newChat);
              } else {
                newChats.push(existingChat);
              }
            }

            socket.emit("chatsList", newChats);
          } else {
            socket.emit("chatsList", chats);
          }

      } catch (error) {
        console.error("❌ خطا در دریافت لیست چت‌ها:", error);
        socket.emit("chatsListError", { message: "خطا در دریافت لیست چت‌ها" });
      }
    });

    socket.on("getOneChat", async ({ chatRoomId, limit = 100 }) => {
      try {
        if (!chatRoomId) return socket.emit("chatOneListError", { message: "chatRoomId الزامی است" });

        const chat = await chatRoomModel
          .findOne({ _id: chatRoomId, userId: userId })
          .populate('carId', 'name')
          .lean();

        if (!chat) {
          return socket.emit("chatOneListError", { message: "چت پیدا نشد" });
        }

        const messages = await chatMessageModel
          .find({ chatRoomId })
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean();

        messages.reverse();

        socket.emit("chatOneList", { chat, messages });
      } catch (error) {
        console.error("❌ خطا در دریافت یک چت:", error);
        socket.emit("chatOneListError", { message: "خطا در دریافت چت" });
      }
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { chatRoomId, message, type } = data;

        if (!chatRoomId || !message) {
          return socket.emit("sendMessageError", { message: "chatId و message یا file الزامی است" });
        }

        const chat = await chatRoomModel.findById(chatRoomId).lean();
        if (!chat) return socket.emit("sendMessageError", { message: "چت پیدا نشد" });

        const userMessage = await chatMessageModel.create({
          chatRoomId,
          sender: 'user',
          content: message || '',
          type: type || 'text',
        });
        socket.emit("newMessage", userMessage);


        try {
          console.log(socket.user._id);
          
          const webhookUrl = 'https://radicar-ai-wdofk-gg0n.liara.run/webhook/ai-radicar';
          const payload = {
            ID: String(socket.user._id),
            chatInput: message || ''
          };

          const response = await axios.post(webhookUrl, payload, { timeout: 15000 });

          const data = response && response.data;
          const aiContent = typeof data === 'string'
            ? data
            : (data && (data.reply || data.message || data.answer || data.ChatOutput || ''));

          if (aiContent && aiContent.trim().length > 0) {
            const assistantMessage = await chatMessageModel.create({
              chatRoomId,
              sender: 'assistant',
              content: aiContent.trim(),
              type: 'text',
            });
            

            socket.emit("newMessage", assistantMessage);
          } else {
            socket.emit("aiResponseError", { message: "پاسخی از سرویس هوش مصنوعی دریافت نشد" });
          }
        } catch (aiErr) {
          console.error("❌ خطا در دریافت پاسخ AI:", aiErr?.response?.data || aiErr?.message || aiErr);
          socket.emit("aiResponseError", { message: "خطا در برقراری ارتباط با سرویس هوش مصنوعی" });
        }

      } catch (error) {
        console.error("❌ خطا در ارسال پیام:", error);
        socket.emit("sendMessageError", { message: "ارسال پیام ناموفق بود" });
      }
    });

    socket.on("seenMessages", async ({ chatId, messageIds }) => {
      try {
        if (!chatId || !messageIds?.length) return;

        const isChat = await chatModel.findOne({ _id: chatId });

        await messageChatModel.updateMany(
          {
            _id: { $in: messageIds },
            chatId,
            userId: { $ne: userId },
            isSeen: false
          },
          { $set: { isSeen: true } }
        );

        io.to(isChat.roomId).emit("messagesSeen", {
          chatId,
          seenBy: userId,
          seenMessageIds: messageIds
        });

      } catch (error) {
        console.error("❌ خطا در seenMessages:", error);
        socket.emit("seenError", { message: "خطا در بروزرسانی پیام‌های دیده‌شده" });
      }
    });

  });
};


