const repairShopModel = require("../../model/repair/RepairShop");
const repairmanModel = require("../../model/repair/repairman");


exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;

        const findRepairShop = await repairShopModel.findOne({ _id: id })
            .populate({
                path: "repairmanId",
                select: "_id name",
            })
        return res.status(200).json(findRepairShop);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};
exports.updateCarAddress = async (req, res) => {
    try {
        const {
            repairmanId,
            name,
            postalCode,
            state,
            county,
            ownerStatus,
            address,
            plate,
            contactNumber,
            repairShopImage,
            location,
            isActive } = req.body;
        const { id } = req.params

        const updateData = {};
        updateData.name = name
        updateData.postalCode = postalCode
        updateData.state = state
        updateData.county = county
        updateData.ownerStatus = ownerStatus
        updateData.address = address
        updateData.plate = plate
        updateData.contactNumber = contactNumber
        updateData.repairShopImage = repairShopImage
        updateData.location = location
        updateData.isActive = isActive

        const findRepairman = await repairmanModel.findOne({ _id: repairmanId })
        if (!findRepairman) {
            return res.status(404).json({ message: "تعمیرکار پید نشد" });
        }

        const existingRepairShop = await repairShopModel.findOne({ repairmanId });

        if (isActive === true) {
            if (!existingRepairShop || existingRepairShop.approvalStatus !== "confirmed") {
                return res.status(400).json({ message: "امکان فعالسازی تعمیرگاه فقط در صورت تایید نهایی وجود دارد." });
            }
        }

        const findRepairShop = await repairShopModel.findOneAndUpdate(
            { repairmanId },
            updateData,
            { new: true }
        );

        if (!findRepairShop) {

            const createRepairShop = await repairShopModel.create({
                repairmanId,
                name,
                postalCode,
                state,
                county,
                ownerStatus,
                address,
                plate,
                contactNumber,
                repairShopImage,
                location
            })
            return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });
        }

        return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'خطای داخلی سرور' });
    }
};

