
import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});





const Department = mongoose.model('Department', departmentSchema);

export default Department;

