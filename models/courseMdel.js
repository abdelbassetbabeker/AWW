import mongoose from "mongoose"

const courseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        uniqe: true,
    },
    coefficient: {
        type: Number,
        required: true
    },
    control_porc: {
        type: Number,
        required: true,
        default: 50
    },
    tp_td_porc: {
        type: Number,
        required: true,
        default: 50
    },
    specialty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty'
    },
    semester_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester'
    },
    // teacher_id: [
    //     {
    //         _id: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'Teacher'
    //         }
    //     }
    // ]
}, {
    timestamps: true
})





const Course = mongoose.model('Course', courseSchema);

export default Course;