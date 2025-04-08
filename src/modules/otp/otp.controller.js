const otpModel = require("./../../model/otp");
const userModel = require("./../../model/user");
const request = require("request");



exports.createOtp = async (req, res) => {
  try {
    const {phoneNumber} = req.body
    const code = Math.floor(10000 + Math.random() * 90000);
    const findUser = await userModel.findOne({phoneNumber})    
    request.post(
        {
          url: "http://ippanel.com/api/select",
          body: {
            op: "pattern",
            user: process.env.USER_SMS_SECO,
            pass: process.env.USER_SMS_PASSWORD_SECO,
            fromNum: "3000505",
            toNum: phoneNumber,
            patternCode: "or3z24fd798t722", 
            inputData: [
              {
                "code": code,
              },
            ],
          },
          json: true,
        },
        function (error, response, body) {
          if (error) {
            console.log("Error in SMS request:", error);
            return res.status(500).json({ message: "SMS request failed" });
          }

          if (response.statusCode === 200) {
            if (
              typeof response.body !== "number" &&
              Number(response.body[0]) !== 0
            ) {
              console.log("SMS response error:", response.body);
              return res.status(500).json({
                message: response.body[1],
              });
            }
          } else {
            console.log(
              "SMS request failed with status code:",
              response.statusCode
            );
            return res.status(500).json({ message: "SMS request failed" });
          }
        }

      );
      const userId = findUser._id
      const createOtp = await otpModel.create({code,userId})
      return res.status(201).json({message : "پیامک ارسال شد"});

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });  }
};
exports.checkOtp = async (req, res) => {
  try {
    const {phoneNumber,code} = req.body
    const findUser = await userModel.findOne({phoneNumber})
    const findOtp = await otpModel.findOne({code , userId : findUser._id})
    console.log(findOtp);
    
    if (!findOtp) {
        return res.status(400).json({message : "کد وارد شده صحیح نمیباشد"})
    }
    const rmOtp = await otpModel.findOneAndDelete({code,userId : findUser._id})
    return res.json({message : "کد وارد شده صحیح میباشد"})
  } catch (error) {
    console.log(error);
  }
};
