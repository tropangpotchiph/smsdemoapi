const Employee = require("../models/Employee");
const User = require("../models/User");

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department", "name")
      .populate("userLevel", "name");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("department", "name")
      .populate("userLevel", "name");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Retrieve employees by department
exports.getEmployeesByDepartment = async (req, res) => {
  const { department } = req.params;

  try {
    const employees = await Employee.find({ department });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createEmployee = async (req, res) => {
  const {
    employeeNumber,
    firstName,
    lastName,
    email,
    password,
    department,
    userLevel,
  } = req.body;

  try {
    // Create a new User document with the email and password
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    // Create a new Employee document with a reference to the created User document
    const newEmployee = new Employee({
      employeeNumber,
      firstName,
      lastName,
      email,
      department,
      userLevel,
      user: newUser._id,
    });
    const employee = await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateEmployee = async (req, res) => {
  const { employeeNumber, firstName, lastName, email, department, userLevel } =
    req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { employeeNumber, firstName, lastName, email, department, userLevel },
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
