const { generateAccessToken } = require("../../middlewares/auth.token");
const settingTechnicalModel = require("../../model/settingTechnical");
const carModel = require("../../model/car");
const carmModel = require("../../model/carModel");
const carAddressModel = require("../../model/carAddress");
const { default: mongoose } = require("mongoose");

exports.getAllIncrement = async (req, res) => {
    try {
        const userId = req.user._id

        const findSettingTechnical = await settingTechnicalModel.find({ userId })
            .populate({
                path: "categoryId",
                select: "_id fname",
            }).select("incrementNumber")

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
            res.json(result);


        return res.status(200).json(findSettingTechnical);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getAllCurrent = async (req, res) => {
    try {
        const userId = req.user._id

        const findSettingTechnical = await settingTechnicalModel.find({ userId })
            .populate({
                path: "categoryId",
                select: "_id fname",
            }).select("currentNumber")

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
            res.json(result);

        return res.status(200).json(findSettingTechnical);
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
                        {_id : item._id , userId},
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
                        {_id : item._id , userId},
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

