import express from "express";
import { studentGrade, courseReclamtion, studentReclamtions, deleteCourseReclamtion, pvReclamtion, deletePvReclamtion, studentRecords, listReclamtions } from "../controllers/student/studentController.js";
import { authRole, authUser } from "../Middleware/authMiddleware.js";

const router = express.Router();

// get the main profile of the student 

router.get('/', authUser, authRole('student'), studentGrade)
router.get('/records', authUser, authRole('student'), studentRecords)
router.post('/course', authUser, authRole('student'), courseReclamtion)
router.delete('/course/:reclamationID/:courseID', authUser, authRole('student'), deleteCourseReclamtion)
router.get('/course', authUser, authRole('student'), studentReclamtions)

router.get('/reclamations', authUser, authRole('student'), studentGrade)

router.post('/pvrec/:id', authUser, authRole('student'), pvReclamtion)
router.delete('/pvrec/:id', authUser, authRole('student'), deletePvReclamtion)
export default router