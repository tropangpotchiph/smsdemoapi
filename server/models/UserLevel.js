const mongoose = require("mongoose");

const UserLevelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserLevel", UserLevelSchema);
