
import mongoose from "mongoose";

const pvReclamationSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Semester_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester'
    },
    body: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
        default: false
    },
    response: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});





const PvReclamation = mongoose.model('PvReclamation', pvReclamationSchema);

export default PvReclamation;