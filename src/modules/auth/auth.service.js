import authRepository from "./auth.repository.js";
import {ApiError} from "../../utils/ApiError.js";
import {comparePassword, hashPassword} from "../../utils/password.js";
import {generateOTP, getOTPExpiry} from "../../utils/otp.js";
import otpRepository from "./otp.repository.js";
import {generateToken} from "../../utils/jwt.js";

export const signup = async (data) => {
    const {
        first_name,
        last_name,
        country,
        phone,
        birth_date,
        username,
        email,
        password,
    } = data
    const existing = await authRepository.findUserByEmailOrUsername(email)
    if (existing) {
        throw new ApiError(400, 'User already exists')
    }
    const password_hash = await hashPassword(password)
    const user = await authRepository.createUser({
        first_name,
        last_name,
        country,
        phone,
        birth_date,
        username,
        email,
        password_hash,
    })
    const otp = generateOTP()
    const expiredAt = getOTPExpiry()
    await otpRepository.createOTP(user.id, otp, expiredAt)
    /* DEV: log otp instead of sending email */
    console.log(`OTP for sign up: ${otp}`)
    return {
        message: "User created. Verify OTP",
        userId: user.id,
    }
}

const login = async (identifier, password) => {
    const user = await authRepository.findUserByEmailOrUsername(identifier)
    if (!user) {
        throw new ApiError(401, 'Invalid credentials')
    }
    if (!user.is_verified) {
        throw new ApiError(403, 'User not verified')
    }
    const isMatch = await comparePassword(password, user.password_hash)
    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials')
    }
    /* Later add JWT */
    const token = generateToken({
        userId: user.id,
        email: user.email,
    })
    return {
        user,
        token
    }
}

const verifyOTP = async (userId, otpCode) => {
    const user = await authRepository.findUserById(userId)
    if (!user) {
        throw new ApiError(404, 'User not found')
    }
    console.log(`User verified: ${user.is_verified}`)
    if (user.is_verified) {
        throw new ApiError(400, 'User already verified')
    }
    const otpRecord = await otpRepository.findValidOTP(userId, otpCode)
    if (!otpRecord) {
        throw new ApiError(4000, 'Invalid or expired OTP')
    }
    await otpRepository.markOTPUsed(otpRecord.id)
    await authRepository.markUserVerified(userId)
    return {
        message: "User verified successfully",
    }
}

export default { login, signup, verifyOTP }