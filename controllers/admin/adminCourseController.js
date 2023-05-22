import asyncHandler from "express-async-handler";
import Course from '../../models/courseMdel.js'
import User from "../../models/userModel.js";




//@Des      Create New Course
//@route    POST
//@access   Protected 
//@role     admin 

export const createCourse = asyncHandler(async (req, res) => {
    const {
        name,
        coefficient,
        specialty_id,
        semester_id,
    } = req.body;

    // Check if course already exists
    const existingCourse = await Course.findOne({ name });

    if (existingCourse) {
        res.status(409); // Conflict
        throw new Error("Course Name all already exists !");
    }

    res.json
    // if (name && coefficient && semester_id && teacher_id && specialty_id) {
    if (name && coefficient && semester_id && specialty_id) {
        try {
            const newCourse = await Course.create({
                user: req.user.id,
                name,
                coefficient,
                specialty_id,
                semester_id,
            });

            res.status(201).json({ message: 'course Created Successfully' });
        } catch (error) {
            res.status(400);
            throw new Error("Bad Request");
        }
    } else {
        res.status(400);
        throw new Error("Error some fields missed empty...");
    }
});





//@Des      Delete Course
//@route    DELETE
//@access   Protected
//@role     admin 
export const deleteCourse = asyncHandler(async (req, res) => {
    if (req.params.id) {
        try {
            const courseDeleted = await Course.findByIdAndDelete(req.params.id)
            res.status(204).json({ message: "Course Deleted.." }) // or 200
        } catch (error) {
            res.status(404)
            throw new Error('Course Not found ...')
        }
    } else {
        res.status(400)
        throw new Error('Error While Deleting ..')
    }
});




//@Des      Update Student info 
//@route    PUT
//@access   Protected 
//@role     admin 
export const updateCourse = asyncHandler(async (req, res) => {

    const {
        name,
        coefficient,
        control_porc,
        tp_td_porc,
        specialty_id,
        semester_id,
        // teacher_id,
    } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    const existingCourse = await User.findOne({ name });
    if (existingCourse) {
        res.status(409);
        throw new Error("Course Name all already exists !");
    }

    try {
        // Update fields
        course.name = name || course.name;
        course.coefficient = coefficient || course.coefficient;
        course.control_porc = control_porc || course.control_porc;
        course.tp_td_porc = tp_td_porc || course.tp_td_porc;
        course.specialty_id = specialty_id || course.specialty_id;
        course.semester_id = semester_id || course.semester_id;
        // course.teacher_id = teacher_id || course.teacher_id;

        const updatedCourse = await course.save();
        res.json({ message: "Course updated successfully" });
    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});





//@Des      fetch all courses
//@route    GET
//@access   Protected
export const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({})
    res.json(courses)
    res.status(200)
});





//@Des      find course by id 
//@route    GET
//@access   Protected
export const getCourseById = asyncHandler(async (req, res) => {
    try {
        if (req.params.id) {
            const course = await Course.findById(req.params.id)
            if (course) {
                res.json(course)
                res.status(200)
            } else {
                res.status(404).json({ message: "course not found..!" })
            }
        }
        else {
            res.status(400)
            throw new Error("bad request")
        }
    } catch (error) {
        res.status(400)
        throw new Error("bad request")
    }
});






