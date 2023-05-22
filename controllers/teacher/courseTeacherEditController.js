import asyncHandler from "express-async-handler";
import Course from '../../models/courseMdel.js'
import Teacher from "../../models/teacherModel.js";






//@Des      Update porcentage of tp_td_porc and cont_porc by teacher to his course info 
//@route    PUT
//@access   Protected 
//@role     teacher 
export const updateCourse = asyncHandler(async (req, res) => {

    const {
        control_porc,
        tp_td_porc,
    } = req.body;

    const { course_id } = await Teacher.findOne({ user_id: req.user._id });
    if (!course_id) {
        res.status(404);
        throw new Error("Not Found");
    }
    const course = await Course.findById(course_id);

    try {
        // Update fields
        if (control_porc && tp_td_porc) {
            course.control_porc = control_porc || course.control_porc;
            course.tp_td_porc = tp_td_porc || course.tp_td_porc;
            const updatedCourse = await course.save();
            res.json({ message: "informations updated successfully" });
        }
        else {
            res.status(400);
            throw new Error("Some Fields are Missed Empty..");
        }
    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});






//@Des      get Teacher course
//@route    GET
//@access   Protected 
//@role     teacher 
export const getCourse = asyncHandler(async (req, res) => {

    try {
        const { course_id } = await Teacher.findOne({ user_id: req.user._id });
        const courseInfo = await Course.findOne({ _id: course_id }).select('name _id semester_id coefficient control_porc tp_td_porc');
        // Update fields
        res.status(200).json(courseInfo)

    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }

});


