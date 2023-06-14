const College = require("../models/College");

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find().populate("courses");
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createCollege = async (req, res) => {
  const { name } = req.body;

  try {
    const newCollege = new College({ name });
    const college = await newCollege.save();
    res.json(college);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCollege = async (req, res) => {
  const { name } = req.body;

  try {
    const college = await College.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCollege = async (req, res) => {
  try {
    await College.findByIdAndRemove(req.params.id);
    res.json({ message: "College deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
