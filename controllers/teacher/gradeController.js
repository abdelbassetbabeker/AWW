import asyncHandler from "express-async-handler";
import Grade from "../../models/gradeModel.js";
import Recording from "../../models/recordingModel.js";
import Teacher from "../../models/teacherModel.js";






//@Des      Update updateGrade by teacher to his course info 
//@route    PUT
//@access   Protected 
//@role     teacher 
export const updateGrade = asyncHandler(async (req, res) => {

    const { studentID } = req.params;

    const {
        semesterID,
        year,
        td_tp,
        control,
    } = req.body;

    const { course_id } = await Teacher.findOne({ user_id: req.user._id });
    const studentRecords = await Recording.findOne({
        student_id: studentID,
        'recordData.year': year,
        'recordData.semester_id': semesterID
    });

    // res.status(200).json({ studentRecords });

    const recordIndex = 0
    // const recordIndex = studentRecords.recordData.findIndex(
    //     // (record) => record._id.toString() === record_id
    // );


    if (recordIndex === -1) {
        res.status(404);
        throw new Error("Student record not found.");
    }


    // res.status(200).json({ data: studentRecords.recordData[recordIndex].enrolment[0].course_id, course_id })

    const courseIndex = studentRecords.recordData[recordIndex].enrolment
        .map((enrolment) => enrolment.course_id.toString())
        .indexOf(course_id.toString());


    if (courseIndex === -1) {
        res.status(404);
        throw new Error("Course index not found.");
    }
    studentRecords.recordData[recordIndex].enrolment[courseIndex].grads.td_tp = td_tp;
    studentRecords.recordData[recordIndex].enrolment[courseIndex].grads.control = control;

    await studentRecords.save();

    res.status(200).send("Grades updated successfully");

});








//@Des      Update updateGrade by teacher to his course info 
//@route    PUT
//@access   Protected 
//@role     teacher 
export const studentGrade = asyncHandler(async (req, res) => {

    const { course_id } = await Teacher.findOne({ user_id: req.user._id });
    const grade = await Grade.findOne(
        {
            course_id: course_id,
            student_id: req.params.id
        });
    if (grade) {
        try {


            res.status(200)
            res.send(grade)

        } catch (error) {
            res.status(400);
            throw new Error("Bad Request");
        }
    }
    else {
        res.status(404).json({ message: 'no record found with given information' });
    }
});


