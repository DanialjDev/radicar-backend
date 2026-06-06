const jwt = require("jsonwebtoken");
const personnelModel = require("../model/personnel");

const authPersonnel = async (req, res, next) => {
  try {
  const authHeader = req.header("Authorization")?.split(" ");

  if (authHeader?.length !== 2) {
    return res.status(403).json({
      message: "This route is protected and you can't have access to it !!",
    });
  }

  const token = authHeader[1];

  
    const jwtToken = jwt.verify(token, process.env.JWT_SECRET);

    const personnel = await personnelModel.findOne({_id : jwtToken._id}).lean();        

    if (personnel == null) {
      return res.status(401).json({ message: 'token not correct' });
    }
    Reflect.deleteProperty(personnel, "password");

    req.personnel = personnel;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'token is expire' });
  }
  console.log(error);
  return res.status(500).json({ message: 'خطای داخلی سرور' });
  }  
};


module.exports ={
  authPersonnel
}
