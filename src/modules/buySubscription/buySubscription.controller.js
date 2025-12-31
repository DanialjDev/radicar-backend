const { default: mongoose } = require("mongoose");
const buySubscriptionModel = require("../../model/subscription/buySubscription");

exports.getBuySubscription = async (req, res) => {
  try {
    const allBuySubscription = await buySubscriptionModel
      .find({repairmanId : req.repairman._id})
      .sort({ _id: -1 })
      .lean();

  
    return res.status(200).json(allBuySubscription);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getBuySubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const buySubscription = await buySubscriptionModel
        .findOne({ _id: id , repairmanId : req.repairman._id })
        .lean();
      if (!buySubscriptionModel) {
        return res.status(404).json({ message: "buySubscription not found" });
      }
      return res.status(200).json(buySubscription);
    }
    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getBuySubscriptionPersonnel = async (req, res) => {
  try {
    const allowedFilters = ["repairmanId","userId"];
    const filter = {};

    allowedFilters.forEach(key => {
      if (req.query[key]) {
        filter[key] = req.query[key];
      }
    });

    const allBuySubscription = await buySubscriptionModel
      .find(filter)
      .sort({ _id: -1 })
      .lean();

    return res.status(200).json(allBuySubscription);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getBuySubscriptionByIdPersonnel = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const buySubscription = await buySubscriptionModel
        .findOne({ _id: id })
        .lean();
      if (!buySubscriptionModel) {
        return res.status(404).json({ message: "buySubscription not found" });
      }
      return res.status(200).json(buySubscription);
    }
    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getBuySubscriptionUser = async (req, res) => {
  try {
    const allBuySubscription = await buySubscriptionModel
    .find({userId : req.user._id})
    .sort({ _id: -1 })
    .lean();

    return res.status(200).json(allBuySubscription);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getBuySubscriptionByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const buySubscription = await buySubscriptionModel
        .findOne({ _id: id ,userId : req.user._id })
        .lean();
      if (!buySubscriptionModel) {
        return res.status(404).json({ message: "buySubscription not found" });
      }
      return res.status(200).json(buySubscription);
    }
    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};