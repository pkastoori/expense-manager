const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "Name cannot be blank"],
  },
  purchaseDate: {
    type: mongoose.Schema.Types.Date,
    required: [true, "Purchase Date cannot be blank"],
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: [true, "Price cannot be blank"],
  },
  quantity: {
    type: mongoose.Schema.Types.String,
    required: [true, "Quantity cannot be blank"],
  },
  comment: {
    type: mongoose.Schema.Types.String,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
