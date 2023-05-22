import asyncHandler from "express-async-handler";
import Semester from '../../models/semasterModel.js'

//@Des      Create New Semester
//@route    POST
//@access   Protected 
//@role     admin 

export const createSemester = asyncHandler(async (req, res) => {
    const {
        name,
        department_id
    } = req.body;

    // Check if Semester already exists
    const existingSemester = await Semester.findOne({ name });

    if (existingSemester) {
        res.status(409);
        throw new Error("Semester Name already exists !");
    }

    try {
        const newSemester = await Semester.create({
            user: req.user.id,
            name,
            department_id
        });

        res.status(201).json({ message: 'Semester Created Successfully' });
    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});



//@Des      Delete Semester
//@route    DELETE
//@access   Protected
//@role     admin 
export const deleteSemester = asyncHandler(async (req, res) => {
    if (req.params.id) {
        try {
            await Semester.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "Semester Deleted.." })
        } catch (error) {
            res.status(400)
            throw new Error('Semester Not found ...')
        }
    } else {
        res.status(400)
        throw new Error('Error While Deleting ..')
    }
});





//@Des      Update Semester info 
//@route    PUT
//@access   Protected 
//@role     admin 
export const updateSemester = asyncHandler(async (req, res) => {

    const {
        name,
        department_id
    } = req.body;

    const Semester = await Semester.findById(req.params.id);
    if (!Semester) {
        res.status(404);
        throw new Error("Semester not found");
    }

    const existingSemester = await Semester.findOne({ name });
    if (existingSemester && existingSemester._id != req.params.id) {
        res.status(400);
        throw new Error("Semester Name already exists !");
    }

    try {
        // Update fields
        Semester.name = name || Semester.name;
        Semester.department_id = department_id || Semester.department_id;

        const updatedSemester = await Semester.save();
        res.json({ message: "Semester updated successfully" });
    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});





//@Des      fetch all Semesters
//@route    GET
//@access   Protected
export const getSemesters = asyncHandler(async (req, res) => {

    try {
        let semesters = await Semester.find();

        if (semesters.length > 0) {
            res.status(200).json(semesters);
        } else {
            res.status(404).json({ message: "Specialties not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});





//@Des      find Semester by id 
//@route    GET
//@access   Protected
export const getSemesterById = asyncHandler(async (req, res) => {
    try {
        if (req.params.id) {
            const Semester = await Semester.findById(req.params.id)
            if (Semester) {
                res.send(Semester)
                res.status(200)
            } else {
                res.status(404).json({ message: "Semester not found..!" })
            }
        }
        else {
            res.status(400)
            throw new Error("bad request")
        }
    } catch (error) {
        res.status(400)
        throw new Error("bad request")
    }
});
