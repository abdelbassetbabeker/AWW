import express from "express";
import { authUser } from "../controllers/authController.js";
const router = express.Router();




/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 1234567890
 *                 full_name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE2MjAxNjMzOTMsImV4cCI6MTYyMDE2Njk5M30.W_9vx_V6euDg-KJaR1b56APi6yKjV7C5I5Y5V7z1AaA
 */


router.post('/login', authUser);

export default router