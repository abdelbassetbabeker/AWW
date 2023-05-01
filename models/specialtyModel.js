import mongoose from "mongoose"

const specialtySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        uniqe: true,
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department_id'
    }
}, {
    timestamps: true
})





const Specialty = mongoose.model('Specialty', specialtySchema);

export default Specialty;