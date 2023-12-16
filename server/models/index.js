const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String
});

const reusedKeys = {
  createdAt: { type: Date, default: Date.now },
  createdBy: { firstName: String, lastName: String, userId: String }
}

const PaymentTag = new mongoose.Schema({
  name: { type: String, unique: true, index: true, required: true }
});

const Period = new mongoose.Schema({
  name: { type: String, unique: true, index: true, required: true },
  start: Date, 
  end: Date
});

const Payment = new mongoose.Schema({
  amount: Number,
  incoming: { type: Boolean, default: false },
  period: { name: String, start: Date, end: Date },
  tags: [{ type: String, index: true }],
  note: String
});

module.exports = {
  Payment, Period, PaymentTag, User
}

