const Department = require("../models/Department");

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const newDepartment = new Department({ name });
    const department = await newDepartment.save();
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndRemove(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
