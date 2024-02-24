const getStudents = "SELECT * FROM students";
const getStudentById = "SELECT * FROM students WHERE student_id = $1";
const checkExistingEmail = "SELECT s FROM students s WHERE s.email = $1";
const addStudent = "INSERT INTO students(name, email, age, dob) VALUES ($1, $2, $3, $4)";
const deleteStudent = "DELETE FROM students WHERE student_id = $1";

module.exports = {
    getStudents,
    getStudentById,
    checkExistingEmail,
    addStudent,
    deleteStudent
};