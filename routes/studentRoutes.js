import express from "express";
import { getStudentProfile, studentcourseReclamation } from "../controllers/studentController.js";
import { isStudent } from "../Middleware/studentsMiddleware.js";
const router = express.Router();


// get the main profile of the student 
router.route('/profile').get(isStudent, getStudentProfile)
router.route('/courseReclamation').post(isStudent, studentcourseReclamation)


export default router