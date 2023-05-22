import jwt from "jsonwebtoken";
// import Admin from "../models/adminModel";
import asynchHandler from "express-async-handler";


export const authUser = asynchHandler(async (req, res, next) => {
    if (req.user == null) {
        res.status(401)
        throw new Error("login first..!")
    }
    next()
})


export const authRole = (role) => {
    return asynchHandler(async (req, res, next) => {
        if (req.user.role !== role) {
            res.status(403)
            throw new Error('Not Allowed')
        }
        next()
    })

}