const personnelModel = require("../../model/personnel");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/auth.token");
const { default: mongoose } = require("mongoose");

exports.getAll = async (req, res) => {
  try {

    const findPersonnel = await personnelModel.find({}).select('name username phoneNumber email');

    return res.status(200).json(findPersonnel);
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
    const {id} = req.params

    const findPersonnel = await personnelModel.findOne({_id : id}).select('name username phoneNumber email');

    return res.status(200).json(findPersonnel);
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
exports.register = async (req, res) => {
  try {
    const { name, username, password, phoneNumber, email , role } = req.body;

    const createUser = await personnelModel.create({
      name, password, phoneNumber, email, username ,role
    });

    return res.status(201).json({ message: "ثبت نام با موفقیت انجام شد" });
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
    const { username, phoneNumber, password } = req.body;
    const personnel = await personnelModel.findOne({
      $or: [
        { username },
        { phoneNumber }
      ]
    });
    if (personnel) {
      const isValidPassword = bcrypt.compareSync(password, personnel.password);
      if (isValidPassword) {
        const accessToken = generateAccessToken(personnel._id);
        const updatePersonnel = await personnelModel.findOneAndUpdate(
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
          .json({ message: "ورود با موفقیت انجام شد", user: updatePersonnel });
      }
      return res.status(401).json({ message: "نام کاربری یا رمز عبور اشتباه می باشد" });
    }
    return res.status(404).json({ message: "کاربر یافت نشد" });
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

    const isPersonnel = await userModel.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!isPersonnel) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    return res.status(200).json({ message: "تغییر رمز عبور با موفقیت انجام شد" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'خطای داخلی سرور' });
  }
};
exports.updatepersonnel = async (req, res) => {
  try {
    const { name,username,phoneNumber,email,password,role } = req.body;
    const { id } = req.params

    const updateData = {};
    updateData.name = name
    updateData.phoneNumber = phoneNumber
    updateData.username = username
    updateData.role = role
    updateData.email = email

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const isUser = await personnelModel.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!isUser) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'خطای داخلی سرور' });
  }
};
exports.removepersonnel = async (req, res) => {
  try {
    const { id } = req.params

    const ispersonnel = await personnelModel.findOneAndDelete({ _id: id });

    if (!ispersonnel) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    return res.status(200).json({ message: "کاربر با موفقیت حذف شد" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'خطای داخلی سرور' });
  }
};
