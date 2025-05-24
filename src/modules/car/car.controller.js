const carModel = require("../../model/car");
const hardwareModel = require("../../model/hardware");
const settingTechnicalModel = require("../../model/settingTechnical");
const { default: mongoose } = require("mongoose");

exports.checkSimCard = async (req, res) => {
    try {
        const { simcard } = req.body
        const findCar = await hardwareModel.findOne({ simcard }).select("_id simcard uniqueId")
        if (!findCar) {
            return res.status(404).json({ message: " دستگاهی ثبت نشده است" });
        }
        return res.status(200).json(findCar);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.createCar = async (req, res) => {
    try {

        const { name, carFactoryId, carmodelId, simcard, carId } = req.body
        const userId = req.user._id

        let findCar = await hardwareModel.findOne({ simcard }).select("_id simcard uniqueId")
        if (!findCar) {
            return res.status(404).json({ message: " دستگاهی با این شماره ثبت شده است" });
        }

        const car = await carModel.create({ name, userId, carFactoryId, carmodelId, simcard,isActive:false})

        findCar = await carModel.findOne({ userId, simcard })
            .populate({
                path: "carFactoryId",
                select: "_id name",
            })
            .populate({
                path: "carmodelId",
                select: "_id name",
            })
            .populate({
                path: 'carmodelId',
                populate: {
                    path: 'carTechnicalId',
                    model: 'CarTechnical',
                    select: 'name defaultNumber categoryId'
                }
            })
            .populate({
                path: "userId",
                select: "_id name",
            })

        const carTechnicalList = findCar.carmodelId.carTechnicalId;
        

        for (const item of carTechnicalList) {

            await settingTechnicalModel.create({
              currentNumber: 0,
              incrementNumber: 0,
              technicalId: item._id,
              carId:car._id,
              categoryId : item.categoryId,
              userId
            });
        }

        return res.status(201).json(car);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getAllCar = async (req, res) => {
    try {

        const findCar = await carModel.find({})
            .populate({
                path: "carFactoryId",
                select: "_id name",
            })
            .populate({
                path: "carmodelId",
                select: "_id name",
            })
            .populate({
                path: "userId",
                select: "_id name",
            })


        return res.status(200).json(findCar);
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

        const findCar
            = await carModel.findOne({ _id: id })
                .populate({
                    path: "carFactoryId",
                    select: "_id name",
                })
                .populate({
                    path: "carmodelId",
                    select: "_id name",
                })
                .populate({
                    path: 'carmodelId',
                    populate: {
                        path: 'carTechnicalId',
                        model: 'CarTechnical',
                        select: 'name defaultNumber'
                    }
                })
                .populate({
                    path: "userId",
                    select: "_id name",
                })

        return res.status(200).json(findCar);

    } catch (error) {
        console.log(error);
    }
};
exports.updateCar = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params

        const updateData = {};
        updateData.name = name



        const isCar = await carModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (!isCar) {
            return res.status(404).json({ message: " ماشین یافت نشد" });
        }

        return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

    } catch (error) {
        console.log(error);
    }
};
exports.removeCar = async (req, res) => {
    try {
        const { id } = req.params

        const isCar = await carModel.findOneAndDelete({ _id: id });

        if (!isCar) {
            return res.status(404).json({ message: "ماشین یافت نشد" });
        }

        const isSettingTechnica = await settingTechnicalModel.deleteMany({ carId: id });

        return res.status(200).json({ message: "ماشین با موفقیت حذف شد" });

    } catch (error) {
        console.log(error);
    }
};