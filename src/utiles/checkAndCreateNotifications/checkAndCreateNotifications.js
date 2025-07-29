const SettingTechnical = require('../../model/settingTechnical');
const CarTechnical = require('../../model/carTechnical');
const Notification = require('../../model/notification');
const axios = require('axios');
const User = require('../../model/user'); 
const request = require('request');


async function checkAndCreateNotifications(carId, currentKilometer) {
  let early = 0;
  let due = 0;

  const settings = await SettingTechnical.find({ carId }).populate('technicalId');

  for (const setting of settings) {
    const { currentNumber, incrementNumber,carId, technicalId, userId, categoryId } = setting;

    const interval = incrementNumber > 0 ? incrementNumber : technicalId?.defaultNumber || 0;
    if (interval === 0) continue;

    const dueKilometer = currentNumber + interval;
    const diff = dueKilometer - currentKilometer;

    const user = await User.findById(userId).lean();

    const hasNotification = async (type) => {
      return await Notification.exists({
        carId,
        userId,
        technicalId: technicalId._id,
        level: type, 
        type: 'app',
        isActive : true
      });
    };

    if (diff <= 0 && !(await hasNotification('due')) && currentNumber != 0) {
      const message = `${user.name} عزیز، موعد سرویس ${technicalId.name} خودروی شما فرا رسیده است. لطفاً در اسرع وقت نسبت به تعویض آن اقدام فرمایید
radicartech.ir`;
      // const message = `زمان تعویض ${technicalId.name} فرا رسیده است.`;

      
      await Notification.create({
        carId,
        userId,
        categoryId,
        technicalId: technicalId._id,
        type: 'app',
        level: 'due',
        message,
      });

      if (user?.phoneNumber) {
        await sendSMS({
          phoneNumber: user.phoneNumber,
          message,
          userId,
          carId,
          technicalId: technicalId._id,
          level: 'due',
        });
      }

      sendWebPushMetrix(userId, 'موعد سرویس', message);
      console.log('web push sent successfully due');


      due++;
    }

    if (diff > 0 && diff <= 199 && !(await hasNotification('early')) && currentNumber != 0 ) {
      // const message = `کمتر از ${diff} کیلومتر تا تعویض ${technicalId.name} باقی مانده است.`;
      const message = `${user.name} عزیز، زمان تعویض ${technicalId.name} خودروی شما نزدیک است. تنها ۲۰۰ کیلومتر تا موعد باقی‌ مانده است 
radicartech.ir.`;

      // نوتیف اپ
      await Notification.create({
        carId,
        userId,
        categoryId,
        technicalId: technicalId._id,
        type: 'app',
        level: 'early',
        message,
      });

      if (user?.phoneNumber) {
        await sendSMS({
          phoneNumber: user.phoneNumber,
          message,
          userId,
          carId,
          technicalId: technicalId._id,
          level: 'early',
        });
      }
      sendWebPushMetrix(userId, 'موعد سرویس', message);
      console.log('web push sent successfully early');
      


      early++;
    }
  }

  return { early, due };
}

async function sendSMS({ phoneNumber, message, userId, carId, technicalId, level }) {
  try {
    const response = request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "send",
          user: "u09909208747",
          pass: "Faraz@2018930025035347",
          message: message,
          from: "100001501550", 
          to: phoneNumber,
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("SMS Response:", response.body);

          try {
            await Notification.create({
              userId,
              carId,
              technicalId,
              message,
              type: "sms",
              level,
            });
            console.log("SMS notification saved to DB");
          } catch (dbErr) {
            console.error("Failed to save SMS notification:", dbErr.message);
          }

        } else {
          console.log("Error in sending SMS:", error || body);
        }
      }
    );

    return true;
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    return false;
  }
}


async function sendWebPushMetrix(userId, title,message) {
  try {
    const payload = {
      recipients: [userId],
      channel: "WEB_PUSH",
      message: {
        title: title, 
        body: message,
        icon: "https://amsh.storage.c2.liara.space/icon512_rounded.png",
        url: "https://radicartech.ir",
      }
    };

    const response = await axios.post(
      'https://entry.metrix.ir/push',
      payload,
      {
        headers: {
          'X-Application-Id': 'bwohkihbzajiubw', 
          'X-API-Key': "e215a382-d18f-4774-af0a-a9c986c708b1",    
          'Content-Type': 'application/json'
        }
      }    );

    if (response.status === 200) {
      console.log('Web push sent successfully');
      return true;
    } else {
      console.error('Failed to send web push:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error sending web push:', error.response?.data || error.message);
    return false;
  }
}


module.exports = {
  checkAndCreateNotifications,
  sendWebPushMetrix, 
};
