import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
//models used 
import Student from '../../models/studentModel.js'
import Recording from "../../models/recordingModel.js";




export const newRecord = asyncHandler(async (req, res) => {
    const {
        level,
        year,
        semester_id,
        department_id,
        specialty_id,
        enrolment
    } = req.body;

    if (level && year && semester_id && department_id && specialty_id && enrolment && req.params.id) {
        const newRecord = {
            year: year,
            level: level,
            specialty_id: specialty_id,
            department_id: department_id,
            semester_id: semester_id,
            enrolment: enrolment,
        };

        const student = await Student.findById(req.params.id)
        if (!student) {
            res.status(400);
            throw new Error("Student not exists ..");
        }

        const re = await Recording.findOne({ student_id: student._id })
        re.recordData.push(newRecord)
        try {
            await re.save()
            res.status(200).json({ message: "recorde added" })
        } catch (error) {
            res.status(400).json({ message: "Bad Request.." })
        }


    } else {
        res.status(400);
        throw new Error("Some Fields are Missed Empty..");
    }
});




// @desc    Delete a recording
// @route   DELETE  /api/recordings/:id
// @access  Private

export const deleteRecord = asyncHandler(async (req, res) => {
    const { studentID } = req.params;

    const {
        record_id
    } = req.body;

    if (!record_id || !studentID) {
        res.status(400);
        throw new Error('Record ID or Student ID not provided');
    }

    const student = await Recording.findOne({ student_id: studentID });
    if (!student) {
        res.status(400);
        throw new Error('Student not found');
    }

    const recordIndex = student.recordData.findIndex(
        (record) => record._id.toString() === record_id
    );
    if (recordIndex === -1) {
        res.status(400);
        throw new Error('Record not found');
    }

    student.recordData.splice(recordIndex, 1);
    await student.save();

    res.status(200).json({ message: 'Record deleted' });
});







// @desc    Update a recording
// @route   UPDATE  /api/recordings/:id
// @access  Private

export const updateRecord = asyncHandler(async (req, res) => {

    const { studentID } = req.params;
    const {
        record_id,
        level,
        year,
        semester_id,
        department_id,
        specialty_id,
        enrolment
    } = req.body;


    if (!record_id || !studentID) {
        res.status(400);
        throw new Error('Record ID or Student ID not provided');
    }

    const student = await Recording.findOne({ student_id: studentID });
    if (!student) {
        res.status(400);
        throw new Error('Student not found');
    }

    const recordIndex = student.recordData.findIndex(
        (record) => record._id.toString() === record_id
    );
    if (recordIndex === -1) {
        res.status(400);
        throw new Error('Record not found');
    }

    student.recordData[recordIndex].year = year || student.recordData[recordIndex].year
    student.recordData[recordIndex].level = level || student.recordData[recordIndex].level
    student.recordData[recordIndex].semester_id = semester_id || student.recordData[recordIndex].semester_id
    student.recordData[recordIndex].department_id = department_id || student.recordData[recordIndex].department_id
    student.recordData[recordIndex].specialty_id = specialty_id || student.recordData[recordIndex].specialty_id
    student.recordData[recordIndex].enrolment = enrolment || student.recordData[recordIndex].enrolment

    await student.save();

    res.status(200).json({ message: 'Record deleted' });
});







// @desc    Get a recording
// @route   GET /api/recordings/:id
// @access  Private
export const getStudentRecords = asyncHandler(async (req, res) => {
    const recording = await Recording.findOne({ student_id: req.params.id });

    if (!recording) {
        res.status(404);
        throw new Error('Recording not found');
    }

    res.status(200).json(recording);
});
