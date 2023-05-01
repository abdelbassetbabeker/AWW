import mongoose from "mongoose";


const teacherSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    full_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    gander: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        uniqe: true,
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
}, {
    timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;