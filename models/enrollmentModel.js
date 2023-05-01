import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    courses: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            }
        }
    ]
}, {
    timestamps: true
});





const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;