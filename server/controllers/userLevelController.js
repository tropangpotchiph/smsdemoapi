const UserLevel = require("../models/UserLevel");

exports.getUserLevels = async (req, res) => {
  try {
    const userLevels = await UserLevel.find();
    res.json(userLevels);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserLevel = async (req, res) => {
  try {
    const userLevel = await UserLevel.findById(req.params.id);
    if (!userLevel) {
      return res.status(404).json({ message: "User level not found" });
    }
    res.json(userLevel);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createUserLevel = async (req, res) => {
  const { name } = req.body;

  try {
    const newUserLevel = new UserLevel({ name });
    const userLevel = await newUserLevel.save();
    res.json(userLevel);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateUserLevel = async (req, res) => {
  const { name } = req.body;

  try {
    const userLevel = await UserLevel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(userLevel);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteUserLevel = async (req, res) => {
  try {
    await UserLevel.findByIdAndRemove(req.params.id);
    res.json({ message: "User level deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
