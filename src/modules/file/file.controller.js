const fileModel = require("../../model/file");

exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'فایلی ارسال نشده است' });

    const fileData = await fileModel.create({
      originalName: req.file.originalname,
      key: req.file.key,
      url: req.file.location,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedByPersonnel: req.personnel?._id || null, 
      uploadedByUser: req.user?._id || null, 
    });

    return res.json({ message: 'آپلود با موفقیت انجام شد', file: fileData });
  } catch (error) {
    console.error("Error creating media:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await fileModel.find({ uploadedByPersonnel: req.personnel?._id || null, uploadedByUser: req.user?._id || null });
    return res.json({ files });
  } catch (error) {
    console.error("Error getting files:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};