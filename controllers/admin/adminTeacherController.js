import asyncHandler from "express-async-handler";
import Teacher from '../../models/teacherModel.js'
import User from "../../models/userModel.js";
import bcrypt from 'bcryptjs';




//@Des      Create New Teacher
//@route    POST
//@access   Protected 
//@role     admin 
export const createTeacher = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        full_name,
        phone,
        birth_date,
        gander,
        course_id
    } = req.body;

    // Check if email is unique
    const existingEmail = await User.findOne({ email });
    const existingPhone = await Teacher.findOne({ phone });

    if (existingEmail) {
        res.status(409);
        throw new Error("Email already exists");
    }
    if (existingPhone) {
        res.status(409);
        throw new Error("Phone already exists");
    }

    if (full_name && email && password && birth_date && gander && phone && course_id) {
        try {
            const newUser = await User.create({
                email,
                password: bcrypt.hashSync(password, 10),
                full_name,
                role: "teacher",
            });

            const newTeacher = await Teacher.create({
                user: req.user.id,
                user_id: newUser._id,
                full_name,
                phone,
                birth_date,
                gander,
                course_id,
            });

            res.status(201).json({ message: 'Teacher Created Successfully' });

        } catch (error) {
            res.status(400);
            throw new Error("Bad request");

        }
    } else {
        res.status(400);
        throw new Error("Bad request");
    }
});





//@Des      Delete Teacher
//@route    DELETE
//@access   Protected
//@role     admin 
export const deleteTeacher = asyncHandler(async (req, res) => {

    if (req.params.id) {
        try {

            const { user_id } = await Teacher.findById(req.params.id)
            const { _id } = await User.findById(user_id)
            await User.findByIdAndDelete(_id)
            await Teacher.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "Teacher Deleted.." })

        } catch (error) {

            res.status(404)
            throw new Error('Teacher or user Not found ...')
        }
    }
    else {
        res.status(400)
        throw new Error('Error While Deleting ..')
    }


});




//@Des      Update Teacher info 
//@route    PUT
//@access   Protected 
//@role     admin 
export const updateTeacher = asyncHandler(async (req, res) => {

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
        res.status(404);
        throw new Error("Student not found");
    }
    const { user_id } = teacher

    const user = await User.findById(user_id);
    const {
        full_name,
        email,
        password,
        phone,
        birth_date,
        gender,
        course_id
    } = req.body;

    try {

        // Update fields
        user.full_name = full_name || user.full_name;
        user.email = email || user.email;
        user.password = bcrypt.hashSync(password, 10) || user.password;


        teacher.phone = phone || teacher.phone;
        teacher.full_name = full_name || teacher.full_name;
        teacher.birth_date = birth_date || teacher.birth_date;
        teacher.gender = gender || teacher.gender;
        teacher.course_id = course_id || teacher.course_id;

        await teacher.save();
        await user.save();

        res.status(204);
        res.json({ message: "profile Updated" });

    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});






//@Des      fetch all teacher
//@route    GET
//@access   Protected
export const getTeachers = asyncHandler(async (req, res) => {

    const teachers = await Teacher.find({}).populate('course_id', 'name');
    res.status(200)
    res.send(teachers)

});





//@Des      find teacher by id 
//@route    GET
//@access   Protected
export const getTeacherById = asyncHandler(async (req, res) => {

    try {
        if (req.params.id) {
            const teacher = await Teacher.findById(req.params.id)
            if (teacher) {
                res.send(teacher)
                res.status(200)
            } else {
                res.status(404);
                throw new Error("teacher not found..!");
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






