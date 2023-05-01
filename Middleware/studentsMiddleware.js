import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";
import asynchHandler from "express-async-handler";


export const isStudent = asynchHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            const { id } = decode
            const student = await Student.findById(id)

            if (student) {
                req.id = id
                next()
            }
            else {
                res.status(403)
            }

        } catch (error) {
            throw new Error('access forbiden')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authoraized!')
    }

}) 