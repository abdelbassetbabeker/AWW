import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
//models used 
import Student from '../../models/studentModel.js'
import User from "../../models/userModel.js";
import Enrollment from "../../models/enrollmentModel.js";
import Grade from "../../models/gradeModel.js";
import client from '../../config/mongoClient.js'



//@Des      Create New Student
//@route    POST
//@access   Protected 
//@role     admin 

export const createStudent = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        full_name,
        birth_date,
        gender,
        level,
        department_id,
        specilty_id,
        courses
    } = req.body;

    // Check if email is unique
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("Email already exists");
    }

    if (full_name && email && password && birth_date && gender && level && specilty_id && department_id && courses) {
        try {
            const newUser = await User.create({
                email,
                password: bcrypt.hashSync(password, 10),
                full_name,
                role: "student",
            });

            const newStudent = await Student.create({
                user: req.user.id,
                user_id: newUser._id,
                full_name,
                birth_date,
                gender,
                level,
                department_id,
                specilty_id,
            });

            await Enrollment.create({
                student_id: newStudent._id,
                courses: courses
            })

            courses.forEach(async (course) => {
                await Grade.create({
                    user: req.user._id,
                    student_id: newStudent._id,
                    course_id: course._id
                })
            });

            res.status(201).json({ message: "Student Created Successfully.. " });

        } catch (error) {
            res.status(400);
            throw new Error("Bad Request ");
        }
    } else {
        res.status(400);
        throw new Error("Some Fields are Missed Empty..");
    }
});





//@Des      Delete Student
//@route    DELETE
//@access   Protected
//@role     admin 
export const deleteStudent = asyncHandler(async (req, res) => {
    if (req.params.id) {
        try {
            const { user_id } = await Student.findById(req.params.id)
            const { _id } = await User.findById(user_id)
            const userDeleted = await User.findByIdAndDelete(_id)
            const studentsdeleted = await Student.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "student Deleted.." })
            console.log(req.params.id);
        } catch (error) {
            res.status(400)
            throw new Error('Student or user Not found ...')
        }
    }
    else {
        res.status(400)
        throw new Error('Error While Deleting ..')
    }


});




//@Des      Update Student info 
//@route    PUT
//@access   Protected 
//@role     admin 
export const updateStudent = asyncHandler(async (req, res) => {

    const student = await Student.findById(req.params.id);

    if (!student) {
        res.status(404);
        throw new Error("Student not found");
    }
    const { user_id } = student

    const user = await User.findById(user_id);
    const {
        email,
        password,
        full_name,
        birth_date,
        gender,
        level,
        specilty_id,
        department_id,
    } = req.body;

    try {

        // Update fields
        user.full_name = full_name || user.full_name;
        user.email = email || user.email;
        user.password = bcrypt.hashSync(password, 10) || user.password;


        student.full_name = full_name || student.full_name;
        student.birth_date = birth_date || student.birth_date;
        student.gender = gender || student.gender;
        student.level = level || student.level;
        student.specilty_id = specilty_id || student.specilty_id;
        student.department_id = department_id || student.department_id;

        const updatedStudent = await student.save();
        const updateduser = await user.save();
        res.json({ message: "profile Updated" });
    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});






//@Des      fetch all Students
//@route    GET
//@access   Protected
export const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({})
    res.send(students)
    res.status(200)
});





//@Des      find Student by id 
//@route    GET
//@access   Protected
export const getStudentById = asyncHandler(async (req, res) => {
    try {
        if (req.params.id) {
            const students = await Student.findById(req.params.id)
            if (students) {
                res.send(students)
                res.status(200)
            } else {
                res.status(404).json({ message: "student not found..!" })
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






