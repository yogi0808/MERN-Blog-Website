import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const hashPassword = async (pass) => {
    const saltRound = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(pass, saltRound)
    return hashPass
}

export const validateToken = async (token) => {

    if (!token) {
        return false
    }

    return await jwt.verify(token, process.env.JWT_SECRET_KEY)
}
