const CarTechniacalModel = require("../../model/carTechnical");
const { default: mongoose } = require("mongoose");

exports.createCarTechniacal = async (req, res) => {
    try {
        const { name, defaultNumber } = req.body
        const personnelId = req.personnel._id
        const createCarFactory = await CarTechniacalModel.create({ name, personnelId, defaultNumber })
        return res.status(201).json(createCarFactory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getAllCarTechniacal = async (req, res) => {
    try {

        const findCarFactory = await CarTechniacalModel.find({})
            .populate({
                path: "personnelId",
                select: "_id name",
            })

        return res.status(200).json(findCarFactory);
    } catch (error) {


        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
}
exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;

        const findCarFactory = await CarTechniacalModel.findOne({ _id :id })
            .populate({
                path: "personnelId",
                select: "_id name",
            })

        return res.status(200).json(findCarFactory);

    } catch (error) {
        console.log(error);
    }
};
exports.updateCarTechniacal = async (req, res) => {
    try {
        const { name, defaultNumber } = req.body;
        const { id } = req.params

        const updateData = {};
        updateData.name = name
        updateData.defaultNumber = defaultNumber


        const iscarFactory = await CarTechniacalModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (!iscarFactory) {
            return res.status(404).json({ message: "کارخانه یافت نشد" });
        }

        return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

    } catch (error) {
        console.log(error);
    }
};
exports.removeCarTechniacal = async (req, res) => {
    try {
        const { id } = req.params

        const iscarFactory = await CarTechniacalModel.findOneAndDelete({ _id: id });

        if (!iscarFactory) {
            return res.status(404).json({ message: "کارخانه یافت نشد" });
        }

        return res.status(200).json({ message: "کارخانه با موفقیت حذف شد" });

    } catch (error) {
        console.log(error);
    }
};
