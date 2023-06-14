const Student = require("../models/Student");
const User = require("../models/User");

exports.getStudents = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 5; // Number of students per page
  const sortBy = req.query.sortBy || "firstName"; // Field to sort by (default: firstName)
  const sortOrder = req.query.sortOrder || "asc"; // Sort order (asc or desc)

  try {
    const count = await Student.countDocuments(); // Total number of students
    const totalPages = Math.ceil(count / limit); // Total number of pages

    const students = await Student.find()
      .populate("college", "name") // Populate the "college" field with the name only
      .populate("course", "name") // Populate the "course" field with the name only
      .populate("userLevel", "name") // Populate the "userLevel" field with the name only
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      students,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("college", "name") // Populate the "college" field with the name only
      .populate("course", "name") // Populate the "course" field with the name only
      .populate("userLevel", "name"); // Populate the "userLevel" field with the name only

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Retrieve students by college with pagination
exports.getStudentsByCollege = async (req, res) => {
  const { collegeId } = req.params;
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 5; // Number of students per page

  try {
    const count = await Student.countDocuments({ college: collegeId }); // Total number of students for the college
    const totalPages = Math.ceil(count / limit); // Total number of pages

    const students = await Student.find({ college: collegeId })
      .populate("college", "name") // Populate the "college" field with the name only
      .populate("course", "name") // Populate the "course" field with the name only
      .populate("userLevel", "name") // Populate the "userLevel" field with the name only
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      students,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Retrieve students by course with pagination
exports.getStudentsByCourse = async (req, res) => {
  const { courseId } = req.params;
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 5; // Number of students per page

  try {
    const count = await Student.countDocuments({ course: courseId }); // Total number of students for the course
    const totalPages = Math.ceil(count / limit); // Total number of pages

    const students = await Student.find({ course: courseId })
      .populate("college", "name") // Populate the "college" field with the name only
      .populate("course", "name") // Populate the "course" field with the name only
      .populate("userLevel", "name") // Populate the "userLevel" field with the name only
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      students,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createStudent = async (req, res) => {
  const { firstName, lastName, email, college, course, userLevel, password } =
    req.body;

  try {
    // Create a new User document with the email and password
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    // Create a new Student document with a reference to the created User document
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password,
      college,
      course,
      userLevel,
      user: newUser._id,
    });

    // Generate student number in the format "YY-XXXXX"
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
    newStudent.studentNumber = `${currentYear}-${randomDigits}`;

    // const student = await newStudent.save();
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateStudent = async (req, res) => {
  const { firstName, lastName, email, college, course, userLevel } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, college, course, userLevel },
      { new: true }
    );
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndRemove(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
