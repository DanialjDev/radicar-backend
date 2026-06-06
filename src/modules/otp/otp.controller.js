const otpModel = require("./../../model/otp");
const userModel = require("./../../model/user");
const repairmanModel = require("./../../model/repair/repairman");
const axios = require("axios");
const { generateAccessToken } = require("../../middlewares/auth.token");

const sendOtpSms = async (phoneNumber, code) => {
  const response = await axios.post("http://ippanel.com/api/select", {
    op: "pattern",
    user: process.env.USER_SMS_SECO,
    pass: process.env.USER_SMS_PASSWORD_SECO,
    fromNum: "3000505",
    toNum: phoneNumber,
    patternCode: "or3z24fd798t722",
    inputData: [{ code }],
  });

  if (
    response.status !== 200 ||
    (typeof response.data !== "number" && Number(response.data[0]) !== 0)
  ) {
    throw new Error("SMS request failed");
  }
};

exports.createOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "شماره تلفن الزامی است" });
    }

    const findUser = await userModel.findOne({ phoneNumber });
    const findRepairman = await repairmanModel.findOne({ phoneNumber });

    if (!findUser && !findRepairman) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    const code = Math.floor(10000 + Math.random() * 90000);

    try {
      await sendOtpSms(phoneNumber, code);
    } catch (smsError) {
      console.log("Error in SMS request:", smsError);
      return res.status(500).json({ message: "ارسال پیامک با خطا مواجه شد" });
    }

    if (findUser) {
      await otpModel.create({ code, userId: findUser._id });
    } else {
      await otpModel.create({ code, repairmanId: findRepairman._id });
    }

    return res.status(201).json({ message: "پیامک ارسال شد" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkOtp = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({ message: "شماره تلفن و کد الزامی است" });
    }

    const findUser = await userModel.findOne({ phoneNumber });
    const findRepairman = await repairmanModel.findOne({ phoneNumber });

    if (findUser) {
      const findOtp = await otpModel.findOne({ code, userId: findUser._id });

      if (!findOtp) {
        return res.status(400).json({ message: "کد وارد شده صحیح نمیباشد" });
      }

      const accessToken = generateAccessToken(findUser._id);
      const updateUser = await userModel.findOneAndUpdate(
        { _id: findUser._id },
        { accessToken },
        {
          projection: { accessToken: 1, _id: 0 },
          returnDocument: "after",
        }
      );

      await otpModel.findOneAndDelete({ code, userId: findUser._id });
      res.cookie("access_token", accessToken, { httpOnly: true });
      return res.json({
        message: "کد وارد شده صحیح میباشد",
        accessToken,
        user: updateUser,
      });
    }

    if (findRepairman) {
      const findOtp = await otpModel.findOne({
        code,
        repairmanId: findRepairman._id,
      });

      if (!findOtp) {
        return res.status(400).json({ message: "کد وارد شده صحیح نمیباشد" });
      }

      const accessToken = generateAccessToken(findRepairman._id);
      const updaterepairman = await repairmanModel.findOneAndUpdate(
        { _id: findRepairman._id },
        { accessToken },
        {
          projection: { accessToken: 1, _id: 0 },
          returnDocument: "after",
        }
      );

      await otpModel.findOneAndDelete({
        code,
        repairmanId: findRepairman._id,
      });
      res.cookie("access_token", accessToken, { httpOnly: true });
      return res.json({
        message: "کد وارد شده صحیح میباشد",
        accessToken,
        user: updaterepairman,
      });
    }

    return res.status(404).json({ message: "کاربر یافت نشد" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
