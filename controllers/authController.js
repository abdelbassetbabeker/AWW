import asynchHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


/**
 * Authenticate a user with the given email and password.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {string} req.body.email - The email entered by the user.
 * @param {string} req.body.password - The password entered by the user.
 * @returns {Promise<void>} A Promise that resolves to the authenticated user object, or throws an error if authentication fails.
 */

export const authUser = asynchHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('invalid credentials')
    };
});


