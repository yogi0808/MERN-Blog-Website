import User from "../models/user-model.js"

const adminAuthenticate = async (req, res, next) => {
    try {

        const userId = req.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({ message: "User not Exist." })
        }

        if (user.isAdmin) {
            next()
        } else {
            return res.status(400).json({ message: "User is not Admin." })
        }

    } catch (e) {
        return res.status(500).json({ message: "Error in Admin authenticate." })
    }
}

export default adminAuthenticate