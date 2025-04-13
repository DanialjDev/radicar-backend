const ticketModel = require("../../model/ticket");
const { default: mongoose } = require("mongoose");

exports.getAll = async (req, res) => {
  try {

    const findticket = await ticketModel.find({ userId: req.user._id }).select('title status priority');

    return res.status(200).json(findticket);
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

    const findTicket = await ticketModel.findOne({ _id: id, userId: req.user._id }).select('title status priority');

    return res.status(200).json(findTicket);
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
exports.createTicket = async (req, res) => {
  try {
    const { title, status, priority } = req.body;

    const createTicket = await ticketModel.create({
      userId: req.user._id, title, status, priority
    });

    return res.status(201).json({ message: "تیکت با موفقیت ایجاد شد" });
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

exports.updateTicket = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params

    const updateData = {};

    updateData.status = status
    updateData.personnelId = req.personnel._id
    console.log(req.personnel._id);
    
    if (mongoose.Types.ObjectId.isValid(id)) {
      const isTicket = await ticketModel.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true }
      );
  
      if (!isTicket) {
        return res.status(404).json({ message: "تیکت یافت نشد" });
      }
  
      return res.status(200).json({ message: "تیکت با موفقیت ویرایش شد" });
    }
    return res.status(404).json({ message: "id not valid" });

  } catch (error) {
    console.log(error);
  }
};
