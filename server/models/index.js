const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String
});

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
  period: { id: String, name: String, start: Date, end: Date },
  tags: [{ type: String, index: true }],
  note: String,
  createdAt: { type: Date, default: () => Date.now() }
});

module.exports = {
  Payment, Period, PaymentTag, User
}

