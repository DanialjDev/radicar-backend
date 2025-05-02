const { generateAccessToken } = require("../../middlewares/auth.token");
const hardwareModel = require("../../model/hardware");
const { default: mongoose } = require("mongoose");

exports.createHardware = async (req, res) => {
    try {
        const { uniqueId,simcard } = req.body
       
        const createHardware = await hardwareModel.create({ uniqueId,simcard })

        const accessToken = generateAccessToken(user._id);
        const updateHardware = await hardwareModel.findOneAndUpdate(
            { _id : createHardware._id },
            { accessToken },
            {
              projection: { accessToken: 1, _id: 0 }, 
              returnDocument: "after",
            }
          );
        res.cookie("access_token", accessToken, { httpOnly: true }); 
        return res.status(201).json(updateHardware);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getOne = async (req, res) => {
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

exports.updateHardware = async (req, res) => {
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

