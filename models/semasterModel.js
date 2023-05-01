import mongoose from "mongoose";

const semesterSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        uniqe: true,
    },
    level: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});





const Semester = mongoose.model('Semester', semesterSchema);
export default Semester;