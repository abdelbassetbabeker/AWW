import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asynchHandler from "express-async-handler";



export const setUser = asynchHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode.id)
        req.user = user
    }
    next()

})

