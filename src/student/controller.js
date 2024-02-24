const pool = require('../../db');

const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getStudentById = (req, res) => {
    const studentId = parseInt(req.params.id);
    pool.query(queries.getStudentById, [studentId], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    } )
}

const addStudent = (req, res) => {
    const {name, email, age, dob} = req.body;

    // check if email exists
    pool.query(queries.checkExistingEmail, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exists");
        }

        pool.query(queries.addStudent, [name, email, age, dob], (req, results) => {
            if (error) throw error;
            res.status(201).send("Student created successfully");
        })
    });
}

// const deleteStudent = (req, res) => {
//     const studentId = parseInt(req.params.id);

//     // check if student exists
//     pool.query(queries.getStudentById, [studentId], (error, results) => {
//         if (!results.rows.length){
//             res.send("No students found");
//         }

//         pool.query(queries.deleteStudent, [studentId], (error, results) => {
//             if (error) throw error;
//             res.status(200).send("Student deleted successfully");
//         })
//     });
// }

const deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id);

    // check if student exists
    pool.query(queries.getStudentById, [studentId], (error, results) => {
        if (error) {
            // Handle query error
            console.error("Error checking if student exists:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (!results.rows.length) {
            // No student found with the given ID
            res.status(404).send("No student found");
            return;
        }

        // Student exists, proceed with deletion
        pool.query(queries.deleteStudent, [studentId], (deleteError, deleteResults) => {
            if (deleteError) {
                // Handle deletion query error
                console.error("Error deleting student:", deleteError);
                res.status(500).send("Internal Server Error");
                return;
            }
            res.status(200).send("Student deleted successfully");
        });
    });
};


module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent
};