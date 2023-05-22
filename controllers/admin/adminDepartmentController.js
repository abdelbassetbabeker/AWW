import asyncHandler from "express-async-handler";
import Department from "../../models/departmentModel.js";

//@Des      Create New Department
//@route    POST
//@access   Protected 
//@role     admin 
export const createDepartment = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if department already exists
    const existingDepartment = await Department.findOne({ name });

    if (existingDepartment) {
        res.status(409);
        throw new Error("Department Name already exists !");
    }

    if (name) {
        try {
            const newDepartment = await Department.create({
                user: req.user.id,
                name,
            });

            res.status(201).json({ message: 'Department Created Successfully' });
        } catch (error) {
            res.status(400);
            throw new Error("Bad Request");
        }
    } else {
        res.status(400);
        throw new Error("Error fields are empty...");
    }
});

//@Des      Delete Department
//@route    DELETE
//@access   Protected
//@role     admin 
export const deleteDepartment = asyncHandler(async (req, res) => {
    if (req.params.id) {
        try {
            const departmentDeleted = await Department.findByIdAndDelete(
                req.params.id
            );
            res.status(200).json({ message: "Department Deleted.." });
        } catch (error) {
            res.status(404);
            throw new Error("Department Not found ...");
        }
    } else {
        res.status(400);
        throw new Error("Error While Deleting ..");
    }
});

//@Des      Update Department info 
//@route    PUT
//@access   Protected 
//@role     admin 
export const updateDepartment = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const department = await Department.findById(req.params.id);
    if (!department) {
        res.status(404);
        throw new Error("Department not found");
    }

    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment && existingDepartment._id != req.params.id) {
        res.status(409);
        throw new Error("Department Name already exists !");
    }

    try {
        // Update fields
        department.name = name || department.name;
        await department.save();

        res.status(200).json({ message: "Department updated successfully" });

    } catch (error) {
        res.status(400);
        throw new Error("Bad Request");
    }
});





//@Des      fetch all departments
//@route    GET
//@access   Protected
export const getDepartments = asyncHandler(async (req, res) => {
    const departments = await Department.find({});
    if (departments) {
        res.send(departments);
        res.status(200);
    } else {
        res.send([]);
        res.status(200);
    }
});





//@Des      find department by id 
//@route    GET
//@access   Protected
export const getDepartmentById = asyncHandler(async (req, res) => {

    if (req.params.id) {
        const department = await Department.findById(req.params.id);
        if (department) {
            res.send(department);
            res.status(200);
        } else {
            res.status(404).json({ message: "Department not found..!" });
        }
    } else {
        res.status(400);
        throw new Error("bad request");
    }

});
