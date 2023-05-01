import mongoose from "mongoose";

const courseReclamationSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
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
        required: false
    }

}, {
    timestamps: true
});





const CourseReclamation = mongoose.model('CourseReclamation', courseReclamationSchema);

export default CourseReclamation;