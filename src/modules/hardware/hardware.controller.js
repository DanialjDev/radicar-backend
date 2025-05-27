const { generateAccessToken } = require("../../middlewares/auth.token");
const hardwareModel = require("../../model/hardware");
const carModel = require("../../model/car");
const carmModel = require("../../model/carModel");
const carAddressModel = require("../../model/carAddress");
const { default: mongoose } = require("mongoose");
const { checkAndCreateNotifications } = require("../../utiles/checkAndCreateNotifications/checkAndCreateNotifications");

exports.createHardware = async (req, res) => {
    try {
        const { simcard } = req.body

        const findHardware = await hardwareModel.findOne({ simcard })
        if (!findHardware) {
            const createHardware = await hardwareModel.create({ simcard })

            const accessToken = generateAccessToken(createHardware._id);
            const updateHardware = await hardwareModel.findOneAndUpdate(
                { _id: createHardware._id },
                { accessToken },
                {
                    projection: { accessToken: 1, _id: 0 },
                    returnDocument: "after",
                }
            );
            res.cookie("access_token", accessToken, { httpOnly: true });
            return res.status(201).json(updateHardware);
        }

        const accessToken = generateAccessToken(findHardware._id);
        const updateHardware = await hardwareModel.findOneAndUpdate(
            { _id: findHardware._id },
            { accessToken },
            {
                projection: { accessToken: 1, _id: 0 },
                returnDocument: "after",
            }
        ).select("accessToken");
        res.cookie("access_token", accessToken, { httpOnly: true });
        return res.status(200).json(updateHardware);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};
exports.getOne = async (req, res) => {
    try {
        const hardwareId = req.hardware._id
        const findHardware = await hardwareModel.findOne({ _id: hardwareId._id })
        if (!findHardware) {
            return res.status(404).json({ message: "دستگاه یافت نشد" });
        }
        let findCar = await carModel.findOneAndUpdate({ simcard: findHardware.simcard }, { isActive: true })

        if (!findCar) {
            return res.status(404).json({ message: "دستگاه یافت نشد" });
        }

        let findCarModel = await carmModel.findOne({ _id: findCar.carmodelId })

        if (!findCarModel) {
            return res.status(404).json({ message: "دستگاه یافت نشد" });
        }

        let findAddress = await carAddressModel.findOne({ _id: findCarModel.carAddressId }).select("kilometer ignitionStatus network")
        return res.status(200).json(findAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطای داخلی سرور'
        });
    }
};

exports.updateHardware = async (req, res) => {
    try {
        const { currentKilometer } = req.body;

        const hardwareId = req.hardware._id
        const findHardware = await hardwareModel.findOne({ _id: hardwareId._id })
        if (!findHardware) {
            return res.status(404).json({ message: "دستگاه یافت نشد" });
        }

        const updateData = {};
        updateData.currentKilometer = currentKilometer
        updateData.isActive = true



        const iscar = await carModel.findOneAndUpdate(
            { simcard: findHardware.simcard },
            updateData,{new : true});

        if (!iscar) {
            return res.status(404).json({ message: " ماشین یافت نشد" });
        }

        const result = await checkAndCreateNotifications(iscar._id, iscar.currentKilometer);
        console.log(result);

        // return res.status(200).json({ message: "اطلاعات با موفقیت ویرایش شد" });
        return res.json({
            message: 'Kilometer updated and notifications checked',
            notifications: result,
            car : iscar
        });

    } catch (error) {
        console.log(error);
    }
};

