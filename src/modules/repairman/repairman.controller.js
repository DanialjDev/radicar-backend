const repairmanModel = require("../../model/repair/repairman");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/auth.token");
const { default: mongoose } = require("mongoose");

exports.getAll = async (req, res) => {
  try {

    const findrepairman = await repairmanModel.find({}).select('-accessToken -password');

    return res.status(200).json(findrepairman);
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyPattern)[0];

      return res.status(400).json({
        message: `${duplicateKey} قبلاً استفاده شده است`,
        field: duplicateKey
      });
    }

    console.error(error);
    return res.status(500).json({
      message: 'خطای داخلی سرور'
    });
  }
};
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params

    if (req.repairman._id.toString() !== id) {
      return res.status(403).json({ message: "دسترسی غیرمجاز" });
    }

    const findrepairman = await repairmanModel.findOne({ _id: id }).select('-accessToken -password');


    return res.status(200).json(findrepairman);
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyPattern)[0];

      return res.status(400).json({
        message: `${duplicateKey} قبلاً استفاده شده است`,
        field: duplicateKey
      });
    }

    console.error(error);
    return res.status(500).json({
      message: 'خطای داخلی سرور'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username,phoneNumber, password } = req.body;
    const repairman = await repairmanModel.findOne({
      $or: [
        { username },
        { phoneNumber }
      ]
    });
    if (repairman) {
      
      if (password) {
        if (!repairman.password) {
          return res.status(400).json({ message: "رمز عبور ثبت نشده است" });
        }
        const isValidPassword = bcrypt.compareSync(password, repairman.password);

        if (isValidPassword) {
          const accessToken = generateAccessToken(repairman._id);
          const updaterepairman = await repairmanModel.findOneAndUpdate(
            {
              $or: [
                { username },
                { phoneNumber }
              ]
            },
            { accessToken },
            {
              projection: { accessToken: 1, _id: 0 },
              returnDocument: "after",
            }
          );
          res.cookie("access_token", accessToken, { httpOnly: true });

          return res
            .status(200)
            .json({ message: "ورود با موفقیت انجام شد", user: updaterepairman });
        }
        return res.status(401).json({ message: "نام کاربری یا رمز عبور اشتباه می باشد" });
      }
    }
    const newRepairman = await repairmanModel.create({phoneNumber})
    return res.status(201).json({message : "تعمیرکار با موفقیت ثبت نام شد",newRepairman})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'خطای داخلی سرور' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { id, password } = req.body;

    const updateData = {};

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const isrepairman = await userModel.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!isrepairman) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    return res.status(200).json({ message: "تغییر رمز عبور با موفقیت انجام شد" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'خطای داخلی سرور' });
  }
};
exports.updateRepairman = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.repairman._id.toString() !== id) {
      return res.status(403).json({ message: "دسترسی غیرمجاز" });
    }

    const { name,
      username,
      phoneNumber,
      nationalCode,
      nationalCodeImage,
      gender,
      email,
      description,
      password,
      birthday} = req.body;

    const updateData = {};
    updateData.name = name
    updateData.nationalCode = nationalCode
    updateData.nationalCodeImage = nationalCodeImage
    updateData.phoneNumber = phoneNumber
    updateData.username = username
    updateData.email = email
    updateData.gender = gender
    updateData.description = description
    updateData.birthday = birthday

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const isUser = await repairmanModel.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!isUser) {
      return res.status(404).json({ message: "تعمیرکار یافت نشد" });
    }

    return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'خطای داخلی سرور' });
  }
};
exports.removeRepairman = async (req, res) => {
  try {
    const { id } = req.params

    const isrepairman = await repairmanModel.findOneAndDelete({ _id: id });

    if (!isrepairman) {
      return res.status(404).json({ message: "تعمیرکار یافت نشد" });
    }

    return res.status(200).json({ message: "تعمیرگار با موفقیت حذف شد" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'خطای داخلی سرور' });
  }
};
