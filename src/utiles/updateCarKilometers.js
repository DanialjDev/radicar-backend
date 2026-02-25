const Carmodel = require('../model/car');

const MIN_INCREMENT = 5;
const MAX_INCREMENT = 20;

const getRandomIncrement = () => {
  return Math.floor(Math.random() * (MAX_INCREMENT - MIN_INCREMENT + 1)) + MIN_INCREMENT;
};

const increaseCarsKilometers = async () => {
  const increment = getRandomIncrement();

  try {
    const result = await Carmodel.updateMany(
      { isActive: true },
      { $inc: { currentKilometer: increment } }
    );

    console.log(
      `✅ کیلومتر ${result.modifiedCount} خودرو فعال، ${increment} واحد افزایش یافت.`
    );
  } catch (error) {
    console.error('❌ خطا در افزایش کیلومتر خودروها:', error);
  }
};

module.exports = {
  increaseCarsKilometers
};

