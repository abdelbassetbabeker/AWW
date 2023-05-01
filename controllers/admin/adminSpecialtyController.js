import asyncHandler from "express-async-handler";
import Specialty from '../../models/specialtyModel.js'
import User from "../../models/userModel.js";


//@Des      Create New Specialty
//@route    POST
//@access   Protected 
//@role     admin 

export const createSpecialty = asyncHandler(async (req, res) => {
    const {
        name,
        department_id,
    } = req.body;

    // Check if specialty already exists
    const existingSpecialty = await Specialty.findOne({ name });

    if (existingSpecialty) {
        res.status(400);
        throw new Error("Specialty Name already exists !");
    }


    if (name && department_id) {
        try {
            const newSpecialty = await Specialty.create({
                user: req.user.id,
                name,
                department_id,
            });

            res.status(201).json(newSpecialty);
        } catch (error) {
            res.status(400);
            throw new Error("Bad Request");
        }
    } else {
        res.status(400);
        throw new Error("Error fields are empty...");
    }
});





//@Des      Delete Specialty
//@route    DELETE
//@access   Protected
//@role     admin 
export const deleteSpecialty = asyncHandler(async (req, res) => {
    if (req.params.id) {
        try {
            const specialtyDeleted = await Specialty.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "Specialty Deleted.." })
            console.log(req.params.id);
        } catch (error) {
            res.status(400)
            throw new Error('Specialty Not found ...')
        }
    } else {
        res.status(400)
        throw new Error('Error While Deleting ..')
    }
});




//@Des      Update Specialty info 
//@route    PUT
//@access   Protected 
//@role     admin 
export const updateSpecialty = asyncHandler(async (req, res) => {

    const {
        name,
        department_id,
    } = req.body;

    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
        res.status(404);
        throw new Error("Specialty not found");
    }
    const existingSpecialty = await User.findOne({ name });
    if (existingSpecialty) {
        res.status(400);
        throw new Error("Specialty Name already exists !");
    }

    try {
        // Update fields
        specialty.name = name || specialty.name;
        specialty.department_id = department_id || specialty.department_id;

        const updatedSpecialty = await specialty.save();
        res.json({ message: "Specialty updated successfully" });
    } catch (error) {
        res.status(400);
        throw new Error("Error fields are empty...");
    }
});





//@Des      fetch all specialties
//@route    GET
//@access   Protected
export const getSpecialties = asyncHandler(async (req, res) => {
    const specialties = await Specialty.find({})
    res.send(specialties)
    res.status(200)
});






//@Des      find course by id 
//@route    GET
//@access   Protected
export const getSpecialtyById = asyncHandler(async (req, res) => {
    try {
        if (req.params.id) {
            const specialty = await Specialty.findById(req.params.id)
            if (specialty) {
                res.send(specialty)
                res.status(200)
            } else {
                res.status(404).json({ message: "Specialty not found..!" })
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






