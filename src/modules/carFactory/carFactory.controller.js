const CarFactoryModel = require("../../model/carFactory");
const CarModel = require("../../model/carModel");
const { default: mongoose } = require("mongoose");

exports.createCarFactory = async (req, res) => {
    try {
        const { name, logo } = req.body
        const personnelId = req.personnel._id
        const createCarFactory = await CarFactoryModel.create({ name, personnelId, logo })
        return res.status(201).json(createCarFactory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getAllCarFactory = async (req, res) => {
    try {

        const findCarFactory = await CarFactoryModel.find({})
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

        const findCarFactory = await CarFactoryModel.findOne({ _id :id })
            .populate({
                path: "personnelId",
                select: "_id name",
            })

        return res.status(200).json(findCarFactory);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};
exports.getOneWithUser = async (req, res) => {
    try {
        const { id } = req.params;

        const findCarModel = await CarModel.find({ carFactoryId :id })


        return res.status(200).json(findCarModel);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};
exports.updateCarFactory = async (req, res) => {
    try {
        const { name, logo } = req.body;
        const { id } = req.params

        const updateData = {};
        updateData.name = name
        updateData.logo = logo


        const iscarFactory = await CarFactoryModel.findOneAndUpdate(
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
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};
exports.removeCarFactory = async (req, res) => {
    try {
        const { id } = req.params

        const iscarFactory = await CarFactoryModel.findOneAndDelete({ _id: id });

        if (!iscarFactory) {
            return res.status(404).json({ message: "کارخانه یافت نشد" });
        }

        return res.status(200).json({ message: "کارخانه با موفقیت حذف شد" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};
