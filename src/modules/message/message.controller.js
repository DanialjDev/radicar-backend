const messageModel = require("../../model/message");
const { default: mongoose } = require("mongoose");

exports.createMessageUser = async (req, res) => {
  try {
    const { ticketId,message } = req.body;

    const createMessage = await messageModel.create({
      ticketId,sender:req.user._id,message
    });

    return res.status(201).json({ message: "پیام با موفقیت ارسال شد" });
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
exports.createMessagePersonnel = async (req, res) => {
  try {
    const { ticketId,message } = req.body;

    const createMessage = await messageModel.create({
      ticketId,sender:req.personnel._id,message
    });

    return res.status(201).json({ message: "پیام با موفقیت ارسال شد" });
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
    const findMessage = await messageModel.find({ ticketId : id })

    return res.status(200).json(findMessage);
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


