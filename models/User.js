const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolio = new Schema({
  coin: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
});
const favorite = new Schema({
  coin: {
    type: String,
  },
});
// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  portfolio: [portfolio],
  favorite: [favorite],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;

// module.exports = User = mongoose.model("users", UserSchema);
