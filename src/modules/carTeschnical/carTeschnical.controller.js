const CarTechniacalModel = require("../../model/carTechnical");
const { default: mongoose } = require("mongoose");

exports.createCarTechniacal = async (req, res) => {
    try {
        const { name, defaultNumber, defaultItem, categoryId } = req.body
        const personnelId = req.personnel._id
        const carTeschnical = await CarTechniacalModel.create({ name, personnelId, defaultNumber, defaultItem, categoryId })
        return res.status(201).json(carTeschnical);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getAllCarTechniacal = async (req, res) => {
    try {

        const findCarTeschnical = await CarTechniacalModel.find({})
            .populate({
                path: "personnelId",
                select: "_id name",
            })
            .populate({
                path: "categoryId",
                select: "_id fname ename",
            })

        return res.status(200).json(findCarTeschnical);
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

        const findCarTeschnical
            = await CarTechniacalModel.findOne({ _id: id })
                .populate({
                    path: "personnelId",
                    select: "_id name",
                }).populate({
                    path: "categoryId",
                    select: "_id fname ename",
                })

        return res.status(200).json(findCarTeschnical);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};
exports.updateCarTechniacal = async (req, res) => {
    try {
        const { name, defaultNumber, defaultItem, categoryId } = req.body;
        const { id } = req.params

        const updateData = {};
        updateData.name = name
        updateData.defaultNumber = defaultNumber
        updateData.defaultItem = defaultItem
        updateData.categoryId = categoryId


        const iscarTeschnical = await CarTechniacalModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (!iscarTeschnical) {
            return res.status(404).json({ message: "مدل ماشین یافت نشد" });
        }

        return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};
exports.removeCarTechniacal = async (req, res) => {
    try {
        const { id } = req.params

        const iscarFactory = await CarTechniacalModel.findOneAndDelete({ _id: id });

        if (!iscarFactory) {
            return res.status(404).json({ message: "مدل ماشین یافت نشد" });
        }

        return res.status(200).json({ message: "مدل ماشین با موفقیت حذف شد" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};
