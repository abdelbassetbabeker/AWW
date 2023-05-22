import asyncHandler from "express-async-handler";
import { Types as mongooseTypes } from 'mongoose';
import Course from '../../models/courseMdel.js'
import Recording from "../../models/recordingModel.js";
import Teacher from "../../models/teacherModel.js";


const ObjectId = mongooseTypes.ObjectId;





//@Des      post a reclamtion for course 
//@route    POST
//@access   Protected 
//@role     student 
export const reclamations = asyncHandler(async (req, res) => {


    const {
        year,
        semesterID
    } = req.query

    const { course_id } = await Teacher.findOne({ user_id: req.user._id });

    const re = await Recording.aggregate([
        { $unwind: "$recordData" },
        { $unwind: "$recordData.enrolment" },
        {
            $match: {
                "recordData.year": 2023,
                "recordData.semester_id": new ObjectId(semesterID),
                "recordData.enrolment.course_id": course_id
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
                student_name: { $arrayElemAt: ["$student.full_name", 0] },
                student_id: 1,
                "enrolment.reclamation": "$recordData.enrolment.reclamation",
            }
        }
    ]);


    res.send(re)
});









//@Des      post a reclamtion for course 
//@route    POST
//@access   Protected 
//@role     student 
export const reclamationResponse = asyncHandler(async (req, res) => {

    const { studentID } = req.params


    const {
        year,
        semesterID,
    } = req.query

    const {
        reclamationID,
        body
    } = req.body


    const { course_id } = await Teacher.findOne({ user_id: req.user._id });

    const studentRecord = await Recording.findOne({ student_id: studentID });

    if (!studentRecord) {
        res.status(400);
        throw new Error('Student Record not found');
    }
    const recordIndex = studentRecord.recordData.findIndex(
        (record) => record.semester_id.toString() == semesterID.toString() && record.year == year
    )

    if (recordIndex === -1) {
        res.status(400);
        throw new Error('Record not found');
    }

    const courseIndex = studentRecord.recordData[recordIndex].enrolment.findIndex(
        (enrolment) => enrolment.course_id.toString() === course_id.toString()
    )

    if (courseIndex == -1) {
        res.status(404)
        throw new Error("course no found ")
    }

    const reclIndex = studentRecord.recordData[recordIndex].enrolment[courseIndex].reclamation.findIndex(
        (reclamation) => reclamation._id.toString() === reclamationID.toString()
    )

    studentRecord.recordData[recordIndex].enrolment[courseIndex].reclamation[reclIndex].state = true
    studentRecord.recordData[recordIndex].enrolment[courseIndex].reclamation[reclIndex].response = body
    studentRecord.save();

    res.send('response saved ')
});
