import mongoose from "mongoose";

const gradeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    tp_td: {
        type: Number,
        required: true,
        default: 0
    },
    control: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
});





const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;