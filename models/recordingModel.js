import mongoose from "mongoose";

const reclamationSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true,
        default: false
    },
    response: {
        type: String,
        required: false
    },
});

const pvReclamationSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true,
        default: false
    },
    response: {
        type: String,
        required: false
    },
});

const enrolmentSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    grads: {
        td_tp: {
            type: String,
            required: true,
            default: 0
        },
        control: {
            type: String,
            required: true,
            default: 0
        }
    },
    reclamation: {
        type: [reclamationSchema],
        required: false
    }
});

const recordSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    specialty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    semester_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    pv_reclamation: {
        type: [pvReclamationSchema],
        required: false
    },
    enrolment: {
        type: [enrolmentSchema],
        required: true
    }
});

// recordSchema.index({ semester_id: 1, year: 1 }, { unique: true });

const recordingSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    recordData: {
        type: [recordSchema],
        required: true
    }
});

const Recording = mongoose.model('Recording', recordingSchema);

export default Recording;