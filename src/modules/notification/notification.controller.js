const Notification = require('../../model/notification');
const technicalModel = require('../../model/carTechnical');
const carModel = require('../../model/car');
const settingTechnicalModel = require('../../model/settingTechnical');
const CategoryTechnical = require('../../model/categoryTechnical');
const { default: mongoose } = require('mongoose');



exports.getAll = async (req, res) => {
  try {
    // const userId = req.user._id;
    // const notifications = await Notification.find({ userId, isActive: true })
    //   .populate({
    //     path: 'technicalId',
    //     model: 'CarTechnical',
    //     populate: {
    //       path: 'categoryId',
    //       model: 'CategoryTechnical',
    //       select: 'fname'
    //     }
    //   })
    //   .lean();
    // const grouped = new Map();

    // notifications.forEach((notif) => {
    //   const category = notif.technicalId?.categoryId;
    //   const categoryId = String(category?._id || 'unknown');
    //   const categoryName = category?.fname || 'نامشخص';

    //   if (!grouped.has(categoryId)) {
    //     grouped.set(categoryId, {
    //       categoryId: categoryId,
    //       categoryName: categoryName,
    //       notifications: []
    //     });
    //   }

    //   grouped.get(categoryId).notifications.push(notif);
    // });
    // res.json([...grouped.values()]);

    const result = await Notification.aggregate([
      { $match: { isActive: true, userId: new mongoose.Types.ObjectId(req.user._id) } },

      {
        $lookup: {
          from: 'cartechnicals',
          localField: 'technicalId',
          foreignField: '_id',
          as: 'technical'
        }
      },
      { $unwind: '$technical' },

      {
        $lookup: {
          from: 'categorytechnicals',
          localField: 'technical.categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },

      {
        $group: {
          _id: '$category._id',
          categoryName: { $first: '$category.fname' },
          notifications: {
            $push: {
              _id: '$_id',
              userId: '$userId',
              carId: '$carId',
              technicalId: '$technicalId',
              message: '$message',
              type: '$type',
              level: '$level',
              isRead: '$isRead',
              isActive: '$isActive',
              createdAt: '$createdAt',
              updatedAt: '$updatedAt',
            }
          }
        }
      },

      {
        $project: {
          _id: 0,
          categoryId: '$_id',
          categoryName: 1,
          notifications: 1
        }
      }
    ]);
    res.json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }


};
exports.update = async (req, res) => {
  try {
    const { id } = req.params

    const findNotification = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { isActive: false }
    )

    if (!findNotification) {
      return res.status(404).json({ message: "اعلان یافت نشد" })
    }

    let upddateSetting = null
    const findSettingTechnical = await settingTechnicalModel.findOne({ technicalId: findNotification.technicalId, userId: req.user._id })
    const findCar = await carModel.findOne({ _id: findSettingTechnical.carId })
    upddateSetting = await settingTechnicalModel.findOneAndUpdate(
      { technicalId: findNotification.technicalId, userId: req.user._id },
      { currentNumber: findCar.currentKilometer }
    )
    // if (findSettingTechnical.incrementNumber > 0) {
    //   const newCurrentNumber = findSettingTechnical.incrementNumber + findSettingTechnical.currentNumber
    //   upddateSetting = await settingTechnicalModel.findOneAndUpdate(
    //     { technicalId: findNotification.technicalId, userId: req.user._id },
    //     {currentNumber : newCurrentNumber }
    //   )
    // } else if (findSettingTechnical.incrementNumber === 0) {
    //   const findTechnical = await technicalModel.findOne({_id : findNotification.technicalId })
    //   const newCurrentNumber = findTechnical.defaultNumber + findSettingTechnical.currentNumber
    //   upddateSetting = await settingTechnicalModel.findOneAndUpdate(
    //     { technicalId: findNotification.technicalId, userId: req.user._id },
    //     {currentNumber : newCurrentNumber }
    //   )
    // }

    return res.json({ notification: findNotification, upddateSetting })



  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
