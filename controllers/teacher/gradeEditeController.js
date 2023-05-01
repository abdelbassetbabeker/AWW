import asyncHandler from "express-async-handler";
import Course from '../../models/courseMdel.js'
import Grade from "../../models/gradeModel.js";
import Teacher from "../../models/teacherModel.js";






//@Des      Update updateGrade by teacher to his course info 
//@route    PUT
//@access   Protected 
//@role     teacher 
export const updateGrade = asyncHandler(async (req, res) => {

    const {
        tp_td,
        control,
    } = req.body;

    const { course_id } = await Teacher.findOne({ user_id: req.user._id });

    // res.send(req.params.id)

    const grade = await Grade.findOne(
        {
            course_id: course_id,
            student_id: req.params.id
        });
    if (grade) {
        try {
            // Update fields
            if (tp_td && control) {
                grade.tp_td = tp_td || grade.tp_td;
                grade.control = control || grade.control;
                await grade.save();
                res.json({ message: "informations updated successfully" });
            }
            else {
                res.status(404);
                throw new Error("Some Fields are Missed Empty..");
            }
        } catch (error) {
            res.status(400);
            throw new Error("Bad Request");
        }
    }
    else {
        res.status(404).json({ message: 'no record found with given information' });
    }
});


