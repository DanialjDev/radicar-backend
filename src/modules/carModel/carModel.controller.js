const CarModel = require("../../model/carModel");
const { default: mongoose } = require("mongoose");

exports.createCarmodel = async (req, res) => {
    try {
        const { name, logo, carFactoryId, carTechnicalId, carAddressId,defaultItem } = req.body
        const personnelId = req.personnel._id
        const createCarModel = await CarModel.create({ name, logo, personnelId, carFactoryId, carTechnicalId, carAddressId,defaultItem })
        return res.status(201).json(createCarModel);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getAllCarmodel = async (req, res) => {
    try {

        const findCarModel = await CarModel.find({})
            .populate({
                path: "personnelId",
                select: " name",
            })
            .populate({
                path: "carFactoryId",
                select: " name",
            })
            .populate({
                path: "carTechnicalId",
                select: " name",
            })
            .populate({
                path: "carAddressId",
                select: " address",
            }).lean()

        return res.status(200).json(findCarModel);
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

        const findCarModel = await CarModel.findOne({ _id: id })
        .populate({
            path: "personnelId",
            select: " name",
        })
        .populate({
            path: "carFactoryId",
            select: " name",
        })
        .populate({
            path: "carTechnicalId",
            select: " name",
        })
        .populate({
            path: "carAddressId",
            select: " address",
        }).lean()


        return res.status(200).json(findCarModel);

    } catch (error) {
        console.log(error);
    }
};
exports.updateCarmodel = async (req, res) => {
    try {
        const { name, logo, carFactoryId, carTechnicalId, carAddressId ,defaultItem } = req.body;
        const { id } = req.params

        const updateData = {};
        updateData.name = name
        updateData.logo = logo
        updateData.carFactoryId = carFactoryId
        updateData.carTechnicalId = carTechnicalId
        updateData.carAddressId = carAddressId 
        updateData.defaultItem = defaultItem 


        const iscarModel = await CarModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (!iscarModel) {
            return res.status(404).json({ message: "مدل ماشین یافت نشد" });
        }

        return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

    } catch (error) {
        console.log(error);
    }
};
exports.removeCarmodel = async (req, res) => {
    try {
        const { id } = req.params

        const iscarFactory = await CarModel.findOneAndDelete({ _id: id });

        if (!iscarFactory) {
            return res.status(404).json({ message: "مدل ماشین یافت نشد" });
        }

        return res.status(200).json({ message: "مدل ماشین با موفقیت حذف شد" });

    } catch (error) {
        console.log(error);
    }
};
