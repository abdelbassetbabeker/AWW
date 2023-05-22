import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
//models used 
import Student from '../../models/studentModel.js'
import Recording from "../../models/recordingModel.js";




export const pvReclamations = asyncHandler(async (req, res) => {
    const {
        year,
        semester_id,
    } = req.body;



    const re = await Recording.aggregate([
        { $unwind: "$recordData" },
        {
            $match: {
                "recordData.year": year,
                "recordData.semester_id": semester_id.toString
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "student_id",
                foreignField: "_id",
                as: "student"
            }
        },
        {
            $project: {
                _id: 0,
                student_id: 1,
                year: "$recordData.year",
                semester_id: "$recordData.semester_id",
                pv_reclamation: "$recordData.pv_reclamation",
                student_name: { $arrayElemAt: ["$student.full_name", 0] },
            }
        }
    ]);

    res.send(re)

});





export const pvResponse = asyncHandler(async (req, res) => {

    const { id: pvReclamations_id } = req.params
    const {
        year,
        semester_id,
        student_id,
        response_body
    } = req.body;

    const studentRecording = await Recording.findOne({ student_id });


    if (!studentRecording) {
        res.status(400);
        throw new Error('student Record not found');
    }

    const recordIndex = studentRecording.recordData.findIndex(
        (record) => (record.semester_id.toString() === semester_id.toString()) && (record.year === year)
    );

    if (recordIndex === -1) {
        res.status(400);
        throw new Error('record not found');
    }

    const pvIndex = studentRecording.recordData[recordIndex].pv_reclamation.findIndex(
        (pv) => pv._id === pvReclamations_id
    )
    studentRecording.recordData[recordIndex].pv_reclamation.response = response_body

    studentRecording.save()
    res.status(200).json({ message: "respone added successfully" })
    // res.send(recordIndex)
    // res.send('response added !')

});

