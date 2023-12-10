const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String
});

const reusedKeys = {
  createdAt: { type: Date, default: Date.now },
  createdBy: User
}

const PaymentTag = new mongoose.Schema({
  name: { type: String, unique: true, index: true, required: true }
});

const Period = new mongoose.Schema({
  id: String,
  name: String,
  start: Date, 
  end: Date, 
  ...reusedKeys
});

const Payment = new mongoose.Schema({
  amount: Number,
  incoming: { type: Boolean, default: false },
  period: Period,
  tags: [PaymentTag],
  note: String,
  ...reusedKeys
});

module.exports = {
  Payment, Period, PaymentTag, User
}

