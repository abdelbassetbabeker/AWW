import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// importing data 
import users from './data/users.js'
import departments from './data/departments.js'
import semesters from './data/semesters.js'

// models data 
import Department from './models/departmentModel.js';
import Semester from './models/semasterModel.js';
import User from './models/userModel.js';

dotenv.config();
connectDB()

const importData = async () => {

    try {
        await User.deleteMany();
        await Semester.deleteMany();
        await Department.deleteMany();

        const user = await User.insertMany(users);

        const adminUser = user[0]._id;

        const sampleSemesters = semesters.map(semester => {
            return { ...semester, user: adminUser }
        });
        const sampleDepartments = departments.map(department => {
            return { ...department, user: adminUser }
        });

        await Semester.insertMany(sampleSemesters)
        await Department.insertMany(sampleDepartments)

        console.log('Data Imported !');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


const destroyData = async () => {

    try {
        await User.deleteMany();
        await Department.deleteMany();
        await Semester.deleteMany();


        console.log('Data destroyed !');
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}