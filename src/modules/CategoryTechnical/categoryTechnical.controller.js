const categoryTechnicalModel = require("../../model/categoryTechnical");
const { default: mongoose } = require("mongoose");

exports.createCategoryTechnical = async (req, res) => {
    try {
        const { fname , ename } = req.body
        const personnelId = req.personnel._id
        const categoryTechnical = await categoryTechnicalModel.create({ fname,ename,personnelId })
        return res.status(201).json(categoryTechnical);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getAllCategoryTechnical = async (req, res) => {
    try {

        const findCarTeschnical = await categoryTechnicalModel.find({})
            .populate({
                path: "personnelId",
                select: "_id name",
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

        const findcategoryTechnical
         = await categoryTechnicalModel.findOne({ _id :id })
            .populate({
                path: "personnelId",
                select: "_id name",
            })

        return res.status(200).json(findcategoryTechnical);

    } catch (error) {
        console.log(error);
    }
};
exports.updateCategoryTechnical = async (req, res) => {
    try {
        const { fname , ename } = req.body;
        const { id } = req.params

        const updateData = {};
        updateData.fname = fname
        updateData.ename = ename



        const isCategoryTechnical = await categoryTechnicalModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (!isCategoryTechnical) {
            return res.status(404).json({ message: " دسته بندی یافت نشد" });
        }

        return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

    } catch (error) {
        console.log(error);
    }
};
exports.removeCategoryTechnical = async (req, res) => {
    try {
        const { id } = req.params

        const isCategoryTechnical = await categoryTechnicalModel.findOneAndDelete({ _id: id });

        if (!isCategoryTechnical) {
            return res.status(404).json({ message: "دسته بندی یافت نشد" });
        }

        return res.status(200).json({ message: "دسته بندی با موفقیت حذف شد" });

    } catch (error) {
        console.log(error);
    }
};
