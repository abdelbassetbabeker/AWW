import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
//models used 
import Student from '../../models/studentModel.js'
import Recording from "../../models/recordingModel.js";
import Course from "../../models/courseMdel.js";




export const newEnrolment = asyncHandler(async (req, res) => {

    const { studentID } = req.params;

    const {
        record_id,
        course_id
    } = req.body;


    if (!record_id || !studentID || !course_id) {
        res.status(400);
        throw new Error('Record ID or Student ID not provided');
    }

    const course = await Course.findOne({ _id: course_id });

    if (!course) {
        res.status(400);
        throw new Error('course not found');
    }

    const studentRecording = await Recording.findOne({ student_id: studentID });

    if (!studentRecording) {
        res.status(400);
        throw new Error('student Recording not found');
    }

    const recordIndex = studentRecording.recordData.findIndex(
        (record) => record._id.toString() === record_id
    );

    if (recordIndex === -1) {
        res.status(400);
        throw new Error('Record not found');
    }


    const courseEnrolled = studentRecording.recordData[recordIndex].enrolment.findIndex(
        (enrollment) => enrollment.course_id.toString() === course_id

    );

    if (courseEnrolled !== -1) {
        res.status(400);
        throw new Error('course Enrolled ');
    }

    studentRecording.recordData[recordIndex].enrolment.push({ course_id })
    await studentRecording.save();

    res.status(200).json({ message: 'new erolment added successfully!' });
});







// @desc    Delete a recording
// @route   DELETE  /api/recordings/:id
// @access  Private

export const deleteEnrolmenet = asyncHandler(async (req, res) => {
    const { studentID } = req.params;

    const {
        record_id,
        enrolment_id
    } = req.body;

    if (!record_id || !studentID) {
        res.status(400);
        throw new Error('Record ID or Student ID not provided');
    }

    const studentRecording = await Recording.findOne({ student_id: studentID });

    if (!studentRecording) {
        res.status(400);
        throw new Error('student Record not found');
    }

    const recordIndex = studentRecording.recordData.findIndex(
        (record) => record._id.toString() === record_id
    );
    if (recordIndex === -1) {
        res.status(400);
        throw new Error('erolment not found');
    }

    const enrolmenetsIndex = studentRecording.recordData[recordIndex].enrolment.findIndex(
        (enrolment) => enrolment._id.toString() === enrolment_id
    );
    if (enrolmenetsIndex === -1) {
        res.status(400);
        throw new Error('enrolment not found');
    }

    studentRecording.recordData[recordIndex].enrolment.splice(enrolmenetsIndex, 1);
    await studentRecording.save();

    res.status(200).json({ message: 'erolment deleted' });
});






