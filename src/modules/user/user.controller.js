const userModel = require("./../../model/user");
const settingUserModel = require("./../../model/settingUser");
const bcrypt = require("bcrypt");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/auth.token");
const { default: mongoose } = require("mongoose");

exports.register = async (req, res) => {
  try {
    const { name,password,phoneNumber,email } =req.body;

    const createUser = await userModel.create({
        name,password,phoneNumber,email
    });
    // const createSettingUser = await settingUserModel.create({
    //   userId : createUser._id
    // });

    const accessToken = generateAccessToken(createUser._id);
        const updateUser = await userModel.findOneAndUpdate(
            { phoneNumber },
            { accessToken },
            {
              projection: { accessToken: 1, _id: 0 }, 
              returnDocument: "after",
            }
          );
        res.cookie("access_token", accessToken, { httpOnly: true });     

    return res.status(201).json({message : "ثبت نام با موفقیت انجام شد", user : updateUser});
  } catch (error) {
    if (
        error.code === 11000 &&
        error.keyPattern &&
        Object.keys(error.keyPattern).length > 0
      ) {
        return res.status(400).json({ message: 'شماره تلفن قبلاً ثبت شده' });

      }
      console.log(error);
      return res.status(500).json({ message: "خطای سرور" });
  }
};
exports.getAll = async (req, res) => {
  try {
    const findUsers = await userModel.find({}).select("name phoneNumber createdAt updatedAt").lean()

    return res.json(findUsers)
    
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "خطای سرور" });
  }
};
exports.getOne = async (req, res) => {
  try {
    const findUser = await userModel.findOne({_id : req.user._id}).select("name phoneNumber createdAt updatedAt").lean()

    return res.json(findUser)
    
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "خطای سرور" });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await userModel.findOne({ phoneNumber });
    if (user) {
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (isValidPassword) {
        const accessToken = generateAccessToken(user._id);
        const updateUser = await userModel.findOneAndUpdate(
            { phoneNumber },
            { accessToken },
            {
              projection: { accessToken: 1, _id: 0 }, 
              returnDocument: "after",
            }
          );
        res.cookie("access_token", accessToken, { httpOnly: true });        

        return res
          .status(200)
          .json({ message: "login successfully ", user : updateUser  });
      }
      return res.status(401).json({ message: "passwords do not match" });
    }
    return res.status(404).json({ message: "user not found" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    
      const updateData = {};

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateData.password = hashedPassword;
      }
  
      const isUser = await userModel.findOneAndUpdate(
        { phoneNumber },
        updateData,
        { new: true }
      );
  
      if (!isUser) {
        return res.status(404).json({ message: "user not found" });
      }
  
      return res.status(200).json({message : "تغییر رمز عبور با موفقیت انجام شد"});
    
  } catch (error) {
    console.log(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name,phoneNumber, password } = req.body;
    const {id} = req.params
    
      const updateData = {};
      updateData.name = name
      updateData.phoneNumber = phoneNumber

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateData.password = hashedPassword;
      }
  
      const isUser = await userModel.findOneAndUpdate(
        { _id:id },
        updateData,
        { new: true }
      );
  
      if (!isUser) {
        return res.status(404).json({ message: "user not found" });
      }
  
      return res.status(200).json({message : "اطلاعات با موفقیت ویرایش شد"});
    
  } catch (error) {
    console.log(error);
  }
};
