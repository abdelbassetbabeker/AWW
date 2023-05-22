import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
import Course from '../../models/courseMdel.js'
import CourseReclamation from "../../models/courseReclamationModel.js";
import Enrollment from "../../models/enrollmentModel.js";
import Grade from "../../models/gradeModel.js";
import Recording from "../../models/recordingModel.js";
import Student from "../../models/studentModel.js";




//@Des      get list of student for their teacher to his course info 
//@route    GET
//@access   Protected 
//@role     student


export const studentGrade = asyncHandler(async (req, res) => {

    const {
        year,
        semesterID
    } = req.query


    try {
        const { _id } = await Student.findOne({ user_id: req.user._id });

        if (year && semesterID && _id) {
            const courses = await Recording.aggregate([
                { $unwind: "$recordData" },
                {
                    $match: {
                        "student_id": _id,
                        "recordData.year": parseInt(year),
                        "recordData.semester_id": new ObjectId(semesterID)
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
                    $lookup: {
                        from: "departments",
                        localField: "recordData.department_id",
                        foreignField: "_id",
                        as: "department"
                    }
                },
                {
                    $lookup: {
                        from: "specialties",
                        localField: "recordData.specialty_id",
                        foreignField: "_id",
                        as: "specialty"
                    }
                },
                {
                    $lookup: {
                        from: "courses",
                        localField: "recordData.enrolment.course_id",
                        foreignField: "_id",
                        as: "course"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        student_id: 1,
                        student_name: { $arrayElemAt: ["$student.full_name", 0] },
                        department: { $arrayElemAt: ["$department.name", 0] },
                        specialty: { $arrayElemAt: ["$specialty.name", 0] },
                        year: "$recordData.year",
                        semester_id: "$recordData.semester_id",
                        enrolment: {
                            $map: {
                                input: "$recordData.enrolment",
                                as: "enrol",
                                in: {
                                    course_id: "$$enrol.course_id",
                                    name: {
                                        $let: {
                                            vars: {
                                                course: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$course",
                                                                cond: { $eq: ["$$this._id", "$$enrol.course_id"] }
                                                            }
                                                        },
                                                        0
                                                    ]
                                                }
                                            },
                                            in: "$$course.name"
                                        }
                                    },
                                    coefficient: {
                                        $let: {
                                            vars: {
                                                course: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$course",
                                                                cond: { $eq: ["$$this._id", "$$enrol.course_id"] }
                                                            }
                                                        },
                                                        0
                                                    ]
                                                }
                                            },
                                            in: "$$course.coefficient"
                                        }
                                    },
                                    control_porc: {
                                        $let: {
                                            vars: {
                                                course: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$course",
                                                                cond: { $eq: ["$$this._id", "$$enrol.course_id"] }
                                                            }
                                                        },
                                                        0
                                                    ]
                                                }
                                            },
                                            in: "$$course.control_porc"
                                        }
                                    },
                                    tp_td_porc: {
                                        $let: {
                                            vars: {
                                                course: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$course",
                                                                cond: { $eq: ["$$this._id", "$$enrol.course_id"] }
                                                            }
                                                        },
                                                        0
                                                    ]
                                                }
                                            },
                                            in: "$$course.tp_td_porc"
                                        }
                                    },
                                    grads: "$$enrol.grads",
                                    reclamation: "$$enrol.reclamation"
                                }
                            }
                        }
                    }
                }
            ]);


            if (courses.length !== 0) {
                res.status(200).json(courses[0])
            } else {
                res.status(200).json({ message: "No Result Found", data: [] })
            }
        }
        else {
            res.status(400);
            throw new Error("some Fields are empty");
        }

    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});











//@Des      post a reclamtion for course 
//@route    POST
//@access   Protected 
//@role     student 

export const studentRecords = asyncHandler(async (req, res) => {



    const { _id } = await Student.findOne({ user_id: req.user._id });

    try {
        const courses = await Recording.aggregate([
            { $unwind: "$recordData" },
            {
                $match: {
                    "student_id": _id,
                }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "student_id",
                    foreignField: "_id",
                    as: "student"
                },

            },
            {
                $lookup: {
                    from: "departments",
                    localField: "recordData.department_id",
                    foreignField: "_id",
                    as: "department"
                }
            },
            {
                $lookup: {
                    from: "specialties",
                    localField: "recordData.specialty_id",
                    foreignField: "_id",
                    as: "specialty"
                }
            },
            {
                $lookup: {
                    from: "semesters",
                    localField: "recordData.semester_id",
                    foreignField: "_id",
                    as: "semester"
                }
            },
            {
                $project: {
                    _id: 0,
                    student_id: 1,
                    student_name: { $arrayElemAt: ["$student.full_name", 0] },
                    recordData: {
                        year: "$recordData.year",
                        level: "$recordData.level",
                        semester_id: "$recordData.semester_id",
                        semester: { $arrayElemAt: ["$semester.name", 0] },
                        level: { $arrayElemAt: ["$semester.level", 0] },
                        department: { $arrayElemAt: ["$department.name", 0] },
                        specialty: { $arrayElemAt: ["$specialty.name", 0] },
                        // specialty_id: "$recordData.specialty_id",
                        // department_id: "$department.name",
                        // semester_id: "$specialty.name",
                        pv_reclamation: "$recordData.pv_reclamation"
                    }
                }
            }
        ])

        if (courses) {
            res.status(200).json(courses)
        } else {
            res.status(200).json({ message: "No Result Found", data: [] })
        }
    } catch (error) {
        res.status(400);
        throw new Error("Bad Request", error);
    }

});








//@Des      post a reclamtion for course 
//@route    POST
//@access   Protected 
//@role     student 
export const courseReclamtion = asyncHandler(async (req, res) => {

    const {
        body,
        courseID: course_id,
    } = req.body;

    const {
        year,
        semesterID,
    } = req.query;


    const { _id } = await Student.findOne({ user_id: req.user._id });

    const studentRecord = await Recording.findOne({ student_id: _id });
    try {
        const recordIndex = studentRecord.recordData.findIndex(
            (record) => ((record.year == year) && (record.semester_id == semesterID))
        )
        if (recordIndex == -1) {
            res.status(404)
            throw new Error("record no found ")
        }

        const courseIndex = studentRecord.recordData[recordIndex].enrolment.findIndex(
            (record) => record.course_id.toString() === course_id.toString()
        )

        if (courseIndex == -1) {
            res.status(404)
            throw new Error("course no found ")
        }

        studentRecord.recordData[recordIndex].enrolment[courseIndex].reclamation.push(
            {
                body,
                state: false,
                response: "",
            })
        studentRecord.save();
        res.status(201).send('Reclamation posted successfully');

    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});







//@Des      post a reclamtion for course 
//@route    POST
//@access   Protected 
//@role     student 
export const deleteCourseReclamtion = asyncHandler(async (req, res) => {


    const { reclamationID, courseID } = req.params;
    const {
        year,
        semesterID,
    } = req.query;

    const { _id } = await Student.findOne({ user_id: req.user._id });

    const studentRecord = await Recording.findOne({ student_id: _id });

    const recordIndex = studentRecord.recordData.findIndex(
        (record) => ((record.year == year) && (record.semester_id == semesterID))
    )

    if (recordIndex == -1) {
        res.status(404)
        throw new Error("record no found ")
    }

    const courseIndex = studentRecord.recordData[recordIndex].enrolment.findIndex(
        (record) => record.course_id.toString() === courseID.toString()
    )

    if (courseIndex == -1) {
        res.status(404)
        throw new Error("course no found ")
    }

    const enroIndex = studentRecord.recordData[recordIndex].enrolment[courseIndex].reclamation.findIndex(
        (rec) => rec._id.toString() === reclamationID.toString()
    )

    if (courseIndex == -1) {
        res.status(404)
        throw new Error("course no found ")
    }

    studentRecord.recordData[recordIndex].enrolment[courseIndex].reclamation.splice(enroIndex, 1)
    studentRecord.save();
    res.status(201).send('Reclamation Deleted successfully');
});



//@Des      student reclamations 
//@route    GET
//@access   Protected 
//@role     student 
export const studentReclamtions = asyncHandler(async (req, res) => {
    const { _id } = await Student.findOne({ user_id: req.user._id });
    const studentRecords = await Recording.find({ student_id: _id });
});




//@Des      student reclamations 
//@route    GET
//@access   Protected 
//@role     student 
export const listReclamtions = asyncHandler(async (req, res) => {



    const { _id } = await Student.findOne({ user_id: req.user._id });

    const studentRecords = await Recording.find({
        student_id: _id
    });

    res.send(studentRecords)

});







//@Des      post a reclamtion for course 
//@route    POST
//@access   Protected 
//@role     student 
export const pvReclamtion = asyncHandler(async (req, res) => {

    const { id: record_id } = req.params;
    const { body } = req.body;



    const { _id } = await Student.findOne({ user_id: req.user._id });


    const studentRecord = await Recording.findOne({ student_id: _id });

    const recordIndex = studentRecord.recordData.findIndex(
        (record) => record._id.toString() === record_id.toString()
    )

    if (recordIndex == -1) {
        res.status(404)
        throw new Error(" Not Found ")
    }



    studentRecord.recordData[recordIndex].pv_reclamation.push(
        {
            body,
            state: false,
            response: "",
        })
    studentRecord.save();
    res.status(201).json({ message: 'PV Reclamation posted successfully' });
});






//@Des      post a reclamtion for course 
//@route    POST
//@access   Protected 
//@role     student 
export const deletePvReclamtion = asyncHandler(async (req, res) => {

    const { id: pvReclamation_id } = req.params;
    const { record_id } = req.body;


    const { _id } = await Student.findOne({ user_id: req.user._id });


    const studentRecord = await Recording.findOne({ student_id: _id });

    const recordIndex = studentRecord.recordData.findIndex(
        (record) => record._id.toString() === record_id.toString()
    )

    if (recordIndex == -1) {
        res.status(404)
        throw new Error(" Not Found ")
    }

    const pvIndex = studentRecord.recordData[recordIndex].pv_reclamation.findIndex(
        (pv) => pv._id.toString() === pvReclamation_id.toString()
    )

    if (pvIndex == -1) {
        res.status(404)
        throw new Error(" Not Found ")
    }

    studentRecord.recordData[recordIndex].pv_reclamation.splice(pvIndex, 1)
    studentRecord.save();

    res.status(201).json({ message: 'PV Reclamation deleted successfully' });
});





















// export const studentGrade = asyncHandler(async (req, res) => {

//     const {
//         year,
//         semester_id
//     } = req.query


//     try {
//         const { _id } = await Student.findOne({ user_id: req.user._id });

//         if (year && semester_id && _id) {
//             const courses = await Recording.aggregate([
//                 { $unwind: "$recordData" },
//                 {
//                     $match: {
//                         "student_id": _id,
//                         "recordData.year": year,
//                         "recordData.semester_id": semester_id
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "students",
//                         localField: "student_id",
//                         foreignField: "_id",
//                         as: "student"
//                     }
//                 }
//                 {
//                     $project: {
//                         _id: 0,
//                         student_id: 1,
//                         year: "$recordData.year",
//                         semester_id: "$recordData.semester_id",
//                         pv_reclamation: "$recordData.pv_reclamation",
//                         student_name: { $arrayElemAt: ["$student.full_name", 0] },
//                     }
//                 }
//             ]);



//             if (courses.length !== 0) {
//                 res.status(200).json({ message: "Result", courses })
//             } else {
//                 res.status(200).json({ message: "No Result Found", data: [] })
//             }
//         }
//         else {
//             res.status(400);
//             throw new Error("some Fields are empty");
//         }

//     } catch (error) {
//         res.status(404);
//         throw new Error("Bad Request");
//     }
// });


