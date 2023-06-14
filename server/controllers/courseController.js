const Course = require("../models/Course");
const College = require("../models/College");

exports.getCourses = async (req, res) => {
  try {
    const collegeId = req.query.collegeId;
    let courses;

    if (collegeId) {
      courses = await Course.find({ college: collegeId }).populate("college");
    } else {
      courses = await Course.find().populate("college");
    }

    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getCourse = async (req, res) => {
  const courseId = req.params.id;
  const collegeId = req.params.collegeId;

  try {
    const course = await Course.findById(courseId).populate("college");

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    if (course.college._id.toString() !== collegeId) {
      return res
        .status(400)
        .json({ msg: "Course does not belong to the specified college" });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createCourse = async (req, res) => {
  const { name } = req.body;
  const collegeId = req.params.collegeId;

  try {
    const newCourse = new Course({
      name,
      college: collegeId,
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateCourse = async (req, res) => {
  const { name, college } = req.body;
  const courseId = req.params.id;
  const collegeId = req.params.collegeId;

  try {
    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    if (course.college.toString() !== collegeId) {
      return res
        .status(400)
        .json({ msg: "Course does not belong to the specified college" });
    }

    course = await Course.findByIdAndUpdate(
      courseId,
      { $set: { name, college } },
      { new: true }
    );

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  const collegeId = req.params.collegeId;

  try {
    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    if (course.college.toString() !== collegeId) {
      return res
        .status(400)
        .json({ msg: "Course does not belong to the specified college" });
    }

    await Course.findByIdAndRemove(courseId);

    res.json({ msg: "Course removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
