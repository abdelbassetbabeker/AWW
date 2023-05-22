import express from "express";
import { getCourse, updateCourse } from "../controllers/teacher/courseTeacherEditController.js";
import { studentGrade, updateGrade } from "../controllers/teacher/gradeController.js";
import { reclamationResponse, reclamations } from "../controllers/teacher/reclamationController.js";
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
router.get('/course', authUser, authRole('teacher'), getCourse)
router.put('/grade/:studentID', authUser, authRole('teacher'), updateGrade)
router.get('/grade/:studentID', authUser, authRole('teacher'), studentGrade)
router.get('/', authUser, authRole('teacher'), studentList)

router.get('/reclamations', authUser, authRole('teacher'), reclamations)
router.post('/reclamations/:studentID', authUser, authRole('teacher'), reclamationResponse)


export default router; 