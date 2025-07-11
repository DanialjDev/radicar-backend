const { generateAccessToken } = require("../../middlewares/auth.token");
const settingTechnicalModel = require("../../model/settingTechnical");
const carModel = require("../../model/car");
const carmModel = require("../../model/carModel");
const carTechnicalModel = require("../../model/carTechnical");
const { default: mongoose } = require("mongoose");

exports.getAllIncrement = async (req, res) => {
    try {
        const userId = req.user._id;
        const { carId } = req.query;

        const findCar = await carModel.findOne({ _id: carId, userId });
        if (!findCar) {
            return res.status(404).json({ message: "خودرو یافت نشد" });
        }

        const findModel = await carmModel.findOne({ _id: findCar.carmodelId });
        if (!findModel) {
            return res.status(404).json({ message: "مدل خودرو یافت نشد" });
        }

        const technicalIds = findModel.carTechnicalId;

        for (const techId of technicalIds) {
            const exists = await settingTechnicalModel.findOne({
                userId,
                carId,
                technicalId: techId
            });

            if (!exists) {
                const findTechnical = await carTechnicalModel.findOne({ _id: techId });
                if (!findTechnical) continue;

                await settingTechnicalModel.create({
                    currentNumber: 0,
                    incrementNumber: 0,
                    userId,
                    carId,
                    technicalId: techId,
                    categoryId: findTechnical.categoryId
                });
            }
        }

        const findSettingTechnical = await settingTechnicalModel.find({ userId, carId }) // ✅ فیلتر carId اضافه شد
            .populate({
                path: "categoryId",
                select: "_id fname",
            })
            .populate({
                path: "technicalId",
                select: "_id name",
            })
            .select("incrementNumber categoryId technicalId");

        const grouped = {};

        findSettingTechnical.forEach(item => {
            const catId = item.categoryId._id;
            const catName = item.categoryId.fname;

            if (!grouped[catId]) {
                grouped[catId] = {
                    categoryId: catId,
                    categoryName: catName,
                    items: []
                };
            }

            grouped[catId].items.push(item);
        });

        const result = Object.values(grouped);
        return res.status(200).json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};

exports.getAllCurrent = async (req, res) => {
    try {
        const userId = req.user._id;
        const { carId } = req.query;

        const findCar = await carModel.findOne({ _id: carId, userId });
        if (!findCar) {
            return res.status(404).json({ message: "خودرو یافت نشد" });
        }

        const findModel = await carmModel.findOne({ _id: findCar.carmodelId });
        if (!findModel) {
            return res.status(404).json({ message: "مدل خودرو یافت نشد" });
        }

        const technicalIds = findModel.carTechnicalId;

        for (const techId of technicalIds) {
            const exists = await settingTechnicalModel.findOne({
                userId,
                carId,
                technicalId: techId
            });

            if (!exists) {
                const findTechnical = await carTechnicalModel.findOne({ _id: techId });
                if (!findTechnical) continue;

                await settingTechnicalModel.create({
                    currentNumber: 0,
                    incrementNumber: 0,
                    userId,
                    carId,
                    technicalId: techId,
                    categoryId: findTechnical.categoryId
                });
            }
        }

        const findSettingTechnical = await settingTechnicalModel.find({ userId, carId }) // اضافه شدن carId به فیلتر
            .populate({
                path: "categoryId",
                select: "_id fname",
            })
            .populate({
                path: "technicalId",
                select: "_id name",
            })
            .select("currentNumber categoryId technicalId");

        const grouped = {};

        findSettingTechnical.forEach(item => {
            const catId = item.categoryId._id;
            const catName = item.categoryId.fname;

            if (!grouped[catId]) {
                grouped[catId] = {
                    categoryId: catId,
                    categoryName: catName,
                    items: []
                };
            }

            grouped[catId].items.push(item);
        });

        const result = Object.values(grouped);
        return res.status(200).json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};


exports.updateSettingTechnicalIncrement = async (req, res) => {
    try {
        const userId = req.user._id
        const updatedGroups = req.body;


        if (!Array.isArray(updatedGroups)) {
            return res.status(400).json({ message: 'داده ارسالی باید آرایه‌ای از دسته‌بندی‌ها باشد' });
        }

        for (const group of updatedGroups) {
            for (const item of group.items) {
                if (typeof item.incrementNumber === 'number') {
                    await settingTechnicalModel.findByIdAndUpdate(
                        { _id: item._id, userId },
                        { incrementNumber: item.incrementNumber },
                        { new: true }
                    );
                }
            }
        }

        res.json({ message: 'همه آیتم‌ها با موفقیت بروزرسانی شدند' });

    } catch (error) {
        console.log(error);
    }
};
exports.updateSettingTechnicalCurrent = async (req, res) => {
    try {
        const userId = req.user._id
        const updatedGroups = req.body;

        if (!Array.isArray(updatedGroups)) {
            return res.status(400).json({ message: 'داده ارسالی باید آرایه‌ای از دسته‌بندی‌ها باشد' });
        }

        for (const group of updatedGroups) {
            for (const item of group.items) {
                if (typeof item.currentNumber === 'number') {
                    await settingTechnicalModel.findByIdAndUpdate(
                        { _id: item._id, userId },
                        { currentNumber: item.currentNumber },
                        { new: true }
                    );
                }
            }
        }

        res.json({ message: 'همه آیتم‌ها با موفقیت بروزرسانی شدند' });
    } catch (error) {
        console.log(error);
    }
};

