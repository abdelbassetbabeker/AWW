import express from "express";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../controllers/admin/adminStudentController.js";
import { createTeacher, deleteTeacher, getTeacherById, getTeachers, updateTeacher } from "../controllers/admin/adminTeacherController.js";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/admin/adminCourseController.js";
import { createSpecialty, deleteSpecialty, getSpecialties, getSpecialtyById, updateSpecialty } from "../controllers/admin/adminSpecialtyController.js";

import { authRole, authUser } from "../Middleware/authMiddleware.js";
import { createDepartment, deleteDepartment, getDepartmentById, getDepartments, updateDepartment } from "../controllers/admin/adminDepartmentController.js";
import { createSemester, deleteSemester, getSemesterById, getSemesters, updateSemester } from "../controllers/admin/adminSemesterController.js";
import { deleteRecord, getStudentRecords, newRecord, updateRecord } from "../controllers/admin/studentRecordController.js";
import { deleteEnrolmenet, newEnrolment } from "../controllers/admin/studentEnrolmentController.js";
import { pvReclamations, pvResponse } from "../controllers/admin/studentPvReclamationController.js";

export const teacherRouter = express.Router();
export const departmentRouter = express.Router();
export const specialtyRouter = express.Router();
export const semesterRouter = express.Router();
export const courseRouter = express.Router();
export const studentRouter = express.Router();



// students

const accessToken = 'sqdds'

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     description: Returns a list of all students
 *     tags:
 *       - Students
 *     security:
 *       - BearerAuth: ['{{accessToken}}']
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal Server Error
 */


studentRouter.route('/').post(authUser, authRole('admin'), createStudent)
studentRouter.delete('/:id', authUser, authRole('admin'), deleteStudent)
studentRouter.put('/:id', authUser, authRole('admin'), updateStudent)
studentRouter.route('/').get(authUser, authUser, authRole('admin'), getStudents)
studentRouter.get('/:id', authUser, authRole('admin'), getStudentById)



studentRouter.put('/record/:id', authUser, authRole('admin'), newRecord)
studentRouter.get('/record/:id', authUser, authRole('admin'), getStudentRecords)
studentRouter.delete('/record/:studentID/:recordID', authUser, authRole('admin'), deleteRecord)
studentRouter.put('/record/:studentID/:recordID', authUser, authRole('admin'), updateRecord)

studentRouter.put('/enrolment/:studentID', authUser, authRole('admin'), newEnrolment)
studentRouter.delete('/enrolment/:studentID', authUser, authRole('admin'), deleteEnrolmenet)

// studentRouter.get('/pv', authUser, authRole('admin'), pvReclamations)
studentRouter.put('/pv/:id', authUser, authRole('admin'), pvResponse)




// teachers
teacherRouter.route('/').post(authUser, authRole('admin'), createTeacher)
teacherRouter.delete('/:id', authUser, authRole('admin'), deleteTeacher)
teacherRouter.put('/:id', authUser, authRole('admin'), updateTeacher)
teacherRouter.route('/').get(authUser, authUser, authRole('admin'), getTeachers)
teacherRouter.get('/:id', authUser, authRole('admin'), getTeacherById)



// courses
courseRouter.route('/').post(authUser, authRole('admin'), createCourse)
courseRouter.delete('/:id', authUser, authRole('admin'), deleteCourse)
courseRouter.put('/:id', authUser, authRole('admin'), updateCourse)
courseRouter.route('/').get(authUser, authUser, authRole('admin'), getCourses)
courseRouter.get('/:id', authUser, authRole('admin'), getCourseById)





// Department
departmentRouter.route('/').post(authUser, authRole('admin'), createDepartment)
departmentRouter.delete('/:id', authUser, authRole('admin'), deleteDepartment)
departmentRouter.put('/:id', authUser, authRole('admin'), updateDepartment)
departmentRouter.route('/').get(authUser, authUser, authRole('admin'), getDepartments)
departmentRouter.get('/:id', authUser, authRole('admin'), getDepartmentById)




// Specialty
specialtyRouter.route('/').post(authUser, authRole('admin'), createSpecialty)
specialtyRouter.delete('/:id', authUser, authRole('admin'), deleteSpecialty)
specialtyRouter.put('/:id', authUser, authRole('admin'), updateSpecialty)
specialtyRouter.get('/', authUser, authRole('admin'), getSpecialties)
specialtyRouter.get('/:id', authUser, authRole('admin'), getSpecialtyById)





// Semester
semesterRouter.route('/').post(authUser, authRole('admin'), createSemester)
semesterRouter.delete('/:id', authUser, authRole('admin'), deleteSemester)
semesterRouter.put('/:id', authUser, authRole('admin'), updateSemester)
semesterRouter.route('/').get(authUser, authUser, authRole('admin'), getSemesters)
semesterRouter.get('/:id', authUser, authRole('admin'), getSemesterById)





