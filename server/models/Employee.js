const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeNumber: {
    type: String,
    required: true,
    unique: true,
    default: generateEmployeeNumber,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Generate an auto-generated employee number in the format "YY-XXXXX"
function generateEmployeeNumber() {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
  return `${currentYear}-${randomDigits}`;
}

module.exports = mongoose.model("Employee", EmployeeSchema);
