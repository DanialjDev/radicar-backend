const { default: mongoose } = require("mongoose");
const subscriptionModel = require("../../model/subscription/subscription");

exports.addSubscription = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      Duration,
      status,
      Category,
      discount,
      forPerson
    } = req.body;

    const newSubscription = await subscriptionModel.create({
      name,
      description,
      price,
      Duration,
      status,
      Category,
      discount,
      forPerson
    });

    return res.status(201).json(newSubscription);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const allSubscription = await subscriptionModel
      .find({isDelete : false})
      .sort({ _id: -1 })
      .lean();

  
    return res.status(200).json(allSubscription);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const Subscription = await subscriptionModel
        .findOne({ _id: id })
        .lean();
      if (!Subscription) {
        return res.status(404).json({ message: "subscription not found" });
      }
      return res.status(200).json(Subscription);
    }
    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.removeSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const removeSubscription = await subscriptionModel
        .findOneAndUpdate({ _id: id }, { isDelete: true })
        .lean();
      if (!removeSubscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      return res.status(200).json(removeSubscription);
    }
    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.updateSubscription = async (req, res) => {

  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      Duration,
      status,
      Category,
      discount,
      forPerson
    } = req.body;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const updateData = {
        name,
        description,
        price,
        Duration,
        status,
        Category,
        discount,
        forPerson
      };

      const isSubscription = await subscriptionModel.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true } // بازگشت سند به‌روز شده
      );

      if (!isSubscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      return res.status(200).json(isSubscription);
    }

    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      Object.keys(error.keyPattern).length > 0
    ) {
      const duplicatedField = Object.keys(error.keyPattern)[0];
      const duplicatedValue = error.keyValue[duplicatedField];
      return res.status(409).json({
        message: `این ${duplicatedField} (${duplicatedValue}) قبلاً وجود دارد.`,
      });
    }
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};



exports.getSubscriptionUser = async (req, res) => {
  try {
    const allSubscription = await subscriptionModel
      .find({ isDelete: false, status: true, forPerson: "User" })
      .sort({ _id: -1 })
      .lean();

  
    return res.status(200).json(allSubscription);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getSubscriptionByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const Subscription = await subscriptionModel
        .findOne({ _id: id, forPerson: "User" })
        .lean();
      if (!Subscription) {
        return res.status(404).json({ message: "subscription not found" });
      }
      return res.status(200).json(Subscription);
    }
    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getSubscriptionRepairman = async (req, res) => {
  try {
    const allSubscription = await subscriptionModel
      .find({isDelete : false,status:true,forPerson : "repairman"})
      .sort({ _id: -1 })
      .lean();

  
    return res.status(200).json(allSubscription);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.getSubscriptionByIdRepairman = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const Subscription = await subscriptionModel
        .findOne({ _id: id,forPerson : "repairman" })
        .lean();
      if (!Subscription) {
        return res.status(404).json({ message: "subscription not found" });
      }
      return res.status(200).json(Subscription);
    }
    return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};
