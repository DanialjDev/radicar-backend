const Carmodel = require('../../model/car'); 

const deactivateExpiredCars = async () => {
  const THIRTY_MINUTES_AGO = new Date(Date.now() - 30 * 60 * 1000);

  try {
    const result = await Carmodel.updateMany(
      {
        isActive: true,
        updatedAt: { $lte: THIRTY_MINUTES_AGO }
      },
      { $set: { isActive: false } }
    );

    console.log(`✅ تعداد خودروهای غیرفعال‌شده: ${result.modifiedCount}`);
  } catch (error) {
    console.error('❌ خطا در غیرفعال‌سازی خودروها:', error);
  }
};

module.exports = {
  deactivateExpiredCars
};
