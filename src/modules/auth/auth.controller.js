import {asyncHandler} from "../../middlewares/asyncHandler.js";
import authService from "./auth.service.js";

const signup = asyncHandler(async (req, res) => {
    const result = await authService.signup(req.body)
    res.status(201).json({
        success: true,
        ...result,
    })
})

const login = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body
    const user = await authService.login(identifier, password)
    res.json({
        success: true,
        message: 'Login successful',
        data: {
            id: user.id,
            email: user.email,
        }
    })
})

const verifyOTP = asyncHandler(async (req, res) => {
    const { userId, otp } = req.body
    const result = await authService.verifyOTP(userId, otp)
    res.json({
        success: true,
        ...result,
    })
})

export default { signup, login, verifyOTP }