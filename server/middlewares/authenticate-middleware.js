import { validateToken } from "../lib/helper.js"

const authenticateUser = async (req, res, next) => {
    try {

        const token = req.cookies.token

        const validToken = await validateToken(token)

        if (!validToken) {
            return res.status(401).json({ message: "Unauthorized User." })
        }

        req.userId = validToken.userId

        next()

    } catch (e) {
        return res.status(500).json({ message: "Error in AuthenticateUser." })
    }
}

export default authenticateUser