import asyncHandler from "express-async-handler";
import Course from "../../models/courseMdel.js";
import Enrollment from "../../models/enrollmentModel.js";
import Recording from "../../models/recordingModel.js";
import Student from "../../models/studentModel.js";
import Teacher from "../../models/teacherModel.js";





// //@Des      get list of student for their teacher to his course info 
// //@route    GET
// //@access   Protected 
// //@role     teacher 
// export const studentList = asyncHandler(async (req, res) => {
//     try {
//         // Get the course_id of the teacher
//         const { course_id } = await Teacher.findOne({ user_id: req.user._id });

//         // Find all the Recording documents that have an enrolment with matching course_id
//         const recordings = await Recording.find({
//             "recordData.enrolment.course_id": course_id
//         });

//         // Extract the student_id from each Recording document
//         const students = recordings.map((recording) => recording);

//         // Return the list of students
//         res.send(students);
//     } catch (error) {
//         res.status(400);
//         throw new Error("Bad Request");
//     }
// });






//@Des      Get list of students and their grades for a teacher's course by year and semester_id
//@route    GET /api/students
//@access   Protected 
//@role     teacher 
export const studentList = asyncHandler(async (req, res) => {

    const { year, semesterID } = req.query
    const teacher = await Teacher.findOne({ user_id: req.user._id });
    const course = await Course.findOne({ _id: teacher.course_id });
    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    const students = await Recording.find(
        {
            "recordData.year": parseInt(year),
            "recordData.semester_id": semesterID,
            "recordData.enrolment.course_id": course._id
        },
        {
            "student_id": 1,
            "recordData.$": 1
        }
    ).populate("student_id", "full_name");
    if (!students || students.length === 0) {
        res.status(404);
        throw new Error("No students found for the given course");
    }
    const studentGrades = students.map((student) => {
        const grade = student.recordData[0].enrolment.find((enrolment) => {
            return enrolment.course_id.toString() === course._id.toString();
        }).grads;
        return {
            _id: student._id,
            student_id: student.student_id._id,
            name: student.student_id.full_name,
            grade: grade
        };
    });

    res.json(studentGrades);
});
