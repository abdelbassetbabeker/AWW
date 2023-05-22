import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import swaggerUi from "swagger-ui-express"
import cors from 'cors';


// used Middlewares
import { errorHandler, notFound } from './Middleware/errorMiddleware.js';
import { setUser } from './Middleware/setUserMiddleware.js';


// Importing Admin The Routes 
import {
    courseRouter,
    departmentRouter,
    semesterRouter,
    specialtyRouter,
    studentRouter,
    teacherRouter
} from './routes/adminRoutes.js'

import authRoutes from './routes/authRoutes.js'

import studentsRouter from './routes/studentRoutes.js'


// Importing teacher The Routes 
import teachersRouter from './routes/teacherRoutes.js'
import swaggerDoc from './utils/swagger.js';






// configurations ... 
dotenv.config();
connectDB()
const app = express();
app.use(express.json());
app.use(setUser);



// Enable CORS for all routes
app.use(cors());


// swgger For Routs Documentations 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));






// Routes

//Publick Routes login route
app.use('/api', authRoutes);




// Admin Routes
app.use('/api/admin/students', studentRouter);
app.use('/api/admin/teachers', teacherRouter);
app.use('/api/admin/departments', departmentRouter);
app.use('/api/admin/semesters', semesterRouter);
app.use('/api/admin/specialties', specialtyRouter);
app.use('/api/admin/courses', courseRouter);




// teacher Routes
app.use('/api/teacher', teachersRouter);






// Student Routes
app.use('/api/students', studentsRouter);












// error Midllware handeler
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
