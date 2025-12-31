const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  repairmanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repairman", 
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: "IRR"
  },

  description: {
    type: String
  },

  // وضعیت پرداخت
  // PENDING   : پرداخت ساخته شده ولی هنوز انجام نشده
  // SUCCESS   : پرداخت موفق
  // FAILED    : پرداخت ناموفق
  // CANCELED  : لغو شده توسط کاربر
  // REFUNDED  : مبلغ بازگشت داده شده
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED", "CANCELED", "REFUNDED"],
    default: "PENDING"
  },

  gateway: {
    type: String,
    // enum: ["WALLET"],
    enum: ["ZARINPAL", "IDPAY", "NEXT_PAY", "STRIPE","WALLET"],
    required: true
  },

  flow: {
    type: String,
    enum: ["IN", "OUT"],
    required: true
  },

  authority: {
    type: String
  },

  // کد رهگیری نهایی پرداخت (RefId / TransactionId)
  refId: {
    type: String
  },

  // نوع پرداخت از نظر بیزنسی
  // ORDER        : پرداخت سفارش
  // SUBSCRIPTION : پرداخت اشتراک
  // WALLET       : شارژ کیف پول
  // PROJECT      : پرداخت پروژه
  type: {
    type: String,
    enum: ["ORDER", "SUBSCRIPTION", "WALLET", "PROJECT"],
    //
    required: true
  },



  // ذخیره پاسخ کامل درگاه پرداخت (برای دیباگ و پیگیری)
  gatewayResponse: {
    type: Object
  },

  // آی‌پی کاربری که پرداخت را انجام داده
  ip: {
    type: String
  },

  // زمان موفق شدن پرداخت
  paidAt: {
    type: Date
  },

  // دلیل خطا در صورت ناموفق بودن پرداخت
  failureReason: {
    type: String
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Payment", paymentSchema);
