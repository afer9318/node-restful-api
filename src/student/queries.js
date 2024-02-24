const getStudents = "SELECT * FROM students";
const getStudentById = "SELECT * FROM students WHERE student_id = $1";

module.exports = {
    getStudents,
    getStudentById
};