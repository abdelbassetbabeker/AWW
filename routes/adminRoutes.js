import express from "express";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../controllers/admin/adminStudentController.js";
import { createTeacher, deleteTeacher, getTeacherById, getTeachers, updateTeacher } from "../controllers/admin/adminTeacherController.js";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/admin/adminCourseController.js";
import { createSpecialty, deleteSpecialty, getSpecialties, getSpecialtyById, updateSpecialty } from "../controllers/admin/adminSpecialtyController.js";

import { authRole, authUser } from "../Middleware/authMiddleware.js";
import { createDepartment, deleteDepartment, getDepartmentById, getDepartments, updateDepartment } from "../controllers/admin/adminDepartmentController.js";
import { createSemester, deleteSemester, getSemesterById, getSemesters, updateSemester } from "../controllers/admin/adminSemesterController.js";

export const teacherRouter = express.Router();
export const departmentRouter = express.Router();
export const specialtyRouter = express.Router();
export const semesterRouter = express.Router();
export const courseRouter = express.Router();
export const studentRouter = express.Router();



// students
studentRouter.route('/create').post(authUser, authRole('admin'), createStudent)
studentRouter.delete('/:id', authUser, authRole('admin'), deleteStudent)
studentRouter.put('/:id', authUser, authRole('admin'), updateStudent)
studentRouter.route('/').get(authUser, authUser, authRole('admin'), getStudents)
studentRouter.get('/:id', authUser, authRole('admin'), getStudentById)



// teachers
teacherRouter.route('/create').post(authUser, authRole('admin'), createTeacher)
teacherRouter.delete('/:id', authUser, authRole('admin'), deleteTeacher)
teacherRouter.put('/:id', authUser, authRole('admin'), updateTeacher)
teacherRouter.route('/').get(authUser, authUser, authRole('admin'), getTeachers)
teacherRouter.get('/:id', authUser, authRole('admin'), getTeacherById)



// courses
courseRouter.route('/create').post(authUser, authRole('admin'), createCourse)
courseRouter.delete('/:id', authUser, authRole('admin'), deleteCourse)
courseRouter.put('/:id', authUser, authRole('admin'), updateCourse)
courseRouter.route('/').get(authUser, authUser, authRole('admin'), getCourses)
courseRouter.get('/:id', authUser, authRole('admin'), getCourseById)





// Department
departmentRouter.route('/create').post(authUser, authRole('admin'), createDepartment)
departmentRouter.delete('/:id', authUser, authRole('admin'), deleteDepartment)
departmentRouter.put('/:id', authUser, authRole('admin'), updateDepartment)
departmentRouter.route('/').get(authUser, authUser, authRole('admin'), getDepartments)
departmentRouter.get('/:id', authUser, authRole('admin'), getDepartmentById)




// Specialty
specialtyRouter.route('/create').post(authUser, authRole('admin'), createSpecialty)
specialtyRouter.delete('/:id', authUser, authRole('admin'), deleteSpecialty)
specialtyRouter.put('/:id', authUser, authRole('admin'), updateSpecialty)
specialtyRouter.route('/').get(authUser, authUser, authRole('admin'), getSpecialties)
specialtyRouter.get('/:id', authUser, authRole('admin'), getSpecialtyById)





// Semester
semesterRouter.route('/create').post(authUser, authRole('admin'), createSemester)
semesterRouter.delete('/:id', authUser, authRole('admin'), deleteSemester)
semesterRouter.put('/:id', authUser, authRole('admin'), updateSemester)
semesterRouter.route('/').get(authUser, authUser, authRole('admin'), getSemesters)
semesterRouter.get('/:id', authUser, authRole('admin'), getSemesterById)





