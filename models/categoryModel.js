const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "Name cannot be blank"],
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    required: [true, "Created date cannot be blank"],
  },
  subCategories: {
    type: mongoose.Schema.Types.Array,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
