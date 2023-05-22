import mongoose from "mongoose";

const courseReclamationSchema = mongoose.Schema({

    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    body: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: false,
        default: false
    },
    response: {
        type: String,
        required: false,
    }

}, {
    timestamps: true
});





const CourseReclamation = mongoose.model('CourseReclamation', courseReclamationSchema);

export default CourseReclamation;