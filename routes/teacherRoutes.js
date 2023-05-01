import express from "express";
import { updateCourse } from "../controllers/teacher/courseTeacherEditController.js";
import { updateGrade } from "../controllers/teacher/gradeEditeController.js";
import { studentList } from "../controllers/teacher/studentListController.js";

import { authRole, authUser } from "../Middleware/authMiddleware.js";

const router = express.Router();



// Teacher functionalities
// router.route('/create').post(authUser, authRole('admin'), createStudent)
// studentRouter.delete('/:id', authUser, authRole('admin'), deleteStudent)
// studentRouter.put('/:id', authUser, authRole('admin'), updateStudent)
// studentRouter.route('/').get(authUser, authUser, authRole('admin'), getStudents)
// studentRouter.get('/:id', authUser, authRole('admin'), getStudentById)


router.put('/course', authUser, authRole('teacher'), updateCourse)
router.put('/grade/:id', authUser, authRole('teacher'), updateGrade)
router.get('/', authUser, authRole('teacher'), studentList)



export default router; 