const CarAddressModel = require("../../model/carAddress");
const { default: mongoose } = require("mongoose");

exports.createCarAddress = async (req, res) => {
    try {
        const {name, kilometer, ignitionStatus,network } = req.body
        const personnelId = req.personnel._id
        const createCarAddress = await CarAddressModel.create({ name,kilometer, personnelId, ignitionStatus,network })
        return res.status(201).json(createCarAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getAllCarAddress = async (req, res) => {
    try {

        const findCarAddress = await CarAddressModel.find({})
            .populate({
                path: "personnelId",
                select: "_id name",
            })

        return res.status(200).json(findCarAddress);
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

        const findCarAddress = await CarAddressModel.findOne({ _id :id })
            .populate({
                path: "personnelId",
                select: "_id name",
            })

        return res.status(200).json(findCarAddress);

    } catch (error) {
        console.log(error);
    }
};
exports.updateCarAddress = async (req, res) => {
    try {
        const { name,kilometer, ignitionStatus,network } = req.body;
        const { id } = req.params

        const updateData = {};
        updateData.kilometer = kilometer
        updateData.ignitionStatus = ignitionStatus
        updateData.name = name
        updateData.network = network


        const isCarAddress = await CarAddressModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (!isCarAddress) {
            return res.status(404).json({ message: "آدرس یافت نشد" });
        }

        return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

    } catch (error) {
        console.log(error);
    }
};
exports.removeCarAddress = async (req, res) => {
    try {
        const { id } = req.params

        const isCarAddress = await CarAddressModel.findOneAndDelete({ _id: id });

        if (!isCarAddress) {
            return res.status(404).json({ message: "آدرس یافت نشد" });
        }

        return res.status(200).json({ message: "آدرس با موفقیت حذف شد" });

    } catch (error) {
        console.log(error);
    }
};
