const { default: mongoose } = require("mongoose");
const commentRepairShopModel = require("../../model/repair/commentRepairShop");
const repairShopModel = require("../../model/repair/RepairShop");
const repairManModel = require("../../model/repair/repairman");

exports.addCommentRepairShopByUser = async (req, res) => {
  try {
    const {
      repairShopId,
      stars,
      text
    } = req.body;

    const newCommentRepairShop = await commentRepairShopModel.create({
      repairShopId,
      userId : req.user._id,
      stars,
      text
    });

    return res.status(201).json(newCommentRepairShop);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getCommentRepairShopByUser = async (req, res) => {
  try {
    const allowedFilters = ["repairShopId"];
    const filter = {};

    allowedFilters.forEach(key => {
      if (req.query[key]) {
        filter[key] = req.query[key];
      }
    });

    filter.$or = [
      { reply: { $exists: false } },
      { reply: null }
    ];

    const parentComments = await commentRepairShopModel
      .find(filter)
      .populate("userId", "name")
      .populate("repairmanId", "name")
      .sort({ _id: -1 })
      .lean();

    const commentsWithReplies = await Promise.all(
      parentComments.map(async (comment) => {
        const replies = await commentRepairShopModel
          .find({ reply: comment._id })
          .populate("userId", "name")
          .populate("repairmanId", "name")
          .sort({ _id: -1 })
          .lean();

        return {
          ...comment,
          replies: replies
        };
      })
    );
      
    return res.status(200).json(commentsWithReplies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getCommentRepairShopByRepairman = async (req, res) => {
  try {
    const allowedFilters = ["repairShopId"];
    const filter = {};

    allowedFilters.forEach(key => {
      if (req.query[key]) {
        filter[key] = req.query[key];
      }
    });

    filter.$or = [
      { reply: { $exists: false } },
      { reply: null }
    ];

    const parentComments = await commentRepairShopModel
      .find(filter)
      .populate("userId", "name")
      .populate("repairmanId", "name")
      .sort({ _id: -1 })
      .lean();

    const commentsWithReplies = await Promise.all(
      parentComments.map(async (comment) => {
        const replies = await commentRepairShopModel
          .find({ reply: comment._id })
          .populate("userId", "name")
          .populate("repairmanId", "name")
          .sort({ _id: -1 })
          .lean();

        return {
          ...comment,
          replies: replies
        };
      })
    );
      
    return res.status(200).json(commentsWithReplies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.replyCommentRepairShopByRepairman = async (req, res) => {
  try {
    const {
      commentId,
      text
    } = req.body;

    const isRepairMan = await repairManModel.findOne({_id : req.repairman._id})
    if (!isRepairMan) {
      return res.status(404).json({message : "تعمیرکار یافت نشد"})
    }
    const isRepairShop =await repairShopModel.findOne({repairmanId : req.repairman._id})
    if (!isRepairShop) {
      return res.status(404).json({message : "تعمیرگاه یافت نشد"})
    }
    const isComment = await commentRepairShopModel.findOne({_id : commentId})
    if (!isComment) {
      return res.status(404).json({message : "نظر یافت نشد"})
    }

    const replyCommentRepairShop = await commentRepairShopModel.create({
      repairShopId : isRepairShop._id,
      repairmanId : req.repairman._id,
      reply : commentId,
      text
    });

    return res.status(201).json(replyCommentRepairShop);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};



exports.getCommentRepairShopByPersonnel = async (req, res) => {
  try {
    const allowedFilters = ["status"];
    const filter = {};

    allowedFilters.forEach(key => {
      if (req.query[key]) {
        filter[key] = req.query[key];
      }
    });

    const allComment = await commentRepairShopModel
      .find(filter)
      .sort({ _id: -1 })
      .lean();

    return res.status(200).json(allComment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.updateCommentRepairShopByPersonnel = async (req, res) => {

  try {
    const { id } = req.params;
    const {
      status,
    } = req.body;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const updateData = {
        status
      };

      const isComment = await commentRepairShopModel.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true } 
      );

      if (!isComment) {
        return res.status(404).json({ message: "comment not found" });
      }

      return res.status(200).json(isComment);
    }

    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};



