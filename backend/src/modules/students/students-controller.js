const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudents(req.query);
  res.status(200).json({
    success: true,
    data: students,
  });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const result = await addNewStudent(req.body);
  res.status(201).json({
    success: true,
    message: result.message,
  });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    id: req.params.id,
  };
  const result = await updateStudent(payload);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const student = await getStudentDetail(req.params.id);
  res.status(200).json({
    success: true,
    data: student,
  });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const payload = {
    userId: req.params.id,
    reviewerId: req.user.id, // Assuming authenticated user's id is available in req.user
    status: req.body.status,
  };
  const result = await setStudentStatus(payload);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
