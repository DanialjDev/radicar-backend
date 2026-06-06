const settingUserModel = require("../../model/settingUser");
const { default: mongoose } = require("mongoose");


exports.getOne = async (req, res) => {
  try {

    console.log(req.user._id);

    const findSetting = await settingUserModel.findOne({ userId: req.user._id })

    return res.status(200).json(findSetting);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'خطای داخلی سرور'
    });
  }
};

exports.updateSettingUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const updateFields = {};

    // تنظیمات نوتیفیکیشن
    if (req.body.settingNotification) {
      for (let key in req.body.settingNotification) {
        updateFields[`settingNotification.${key}`] = req.body.settingNotification[key];
      }
    }

    // کیلومتر دلخواه
    if (req.body.customKilometers) {
      for (let key in req.body.customKilometers) {
        updateFields[`customKilometers.${key}`] = req.body.customKilometers[key];
      }
    }

    const updated = await settingUserModel.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { new: true, upsert: true } // اگر پیدا نشد، بسازش
    );

    res.json({
      message: "تنظیمات با موفقیت به‌روزرسانی شد",
      data: updated
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'خطای داخلی سرور' });
  }
};
