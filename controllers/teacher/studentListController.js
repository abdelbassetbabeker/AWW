import asyncHandler from "express-async-handler";
import Course from '../../models/courseMdel.js'
import Enrollment from "../../models/enrollmentModel.js";
import Student from "../../models/studentModel.js";
import Teacher from "../../models/teacherModel.js";






//@Des      get list of student for their teacher to his course info 
//@route    GET
//@access   Protected 
//@role     teacher 
export const studentList = asyncHandler(async (req, res) => {

    try {
        const { course_id } = await Teacher.findOne({ user_id: req.user._id });
        const enrollment = await Enrollment.findOne({})
        // Iterate through the enrollments and get the student info for each student
        const students = [];
        for (const enrollment of enrollments) {
            const student = await Student.findById(enrollment.student_id);
            students.push(student);
        }

        // Return the list of students
        return students;
        res.send(enrollment);

    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});


