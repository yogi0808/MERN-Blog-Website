import { Types } from "mongoose"
import User from "../models/user-model.js"
import { hashPassword } from "../lib/helper.js"
import Blog from "../models/Blog-model.js"

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password")

        return res.status(200).json({ users })

    } catch (e) {
        return res.status(500).json({ message: "Error in Getting All users.", error: e.message })
    }
}

export const getSingleUser = async (req, res) => {
    try {

        const userId = req.params.id

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId." })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        return res.status(200).json(user)

    } catch (e) {
        return res.status(500).json({ message: "Error in Getting user.", error: e.message })
    }
}

export const register = async (req, res) => {

    try {

        const { name, username, email, image, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already Exist." })
        }

        const newUser = new User({
            name, image, username, email, password
        })


        await newUser.save()

        return res.status(201).json({ message: "User Register Successfully.", user: newUser })
    } catch (e) {
        return res.status(500).json({ message: "Error in register.", error: e.message })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not Exist." })
        }

        const isPassValid = await user.comperePassword(password)

        if (!isPassValid) {
            return res.status(400).json({ message: "Invalid Email or Password." })
        }

        const token = await user.makeToken()

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })

        user.password = ""

        return res.status(200).json({ message: "User Login Successful.", token, user })

    } catch (e) {
        return res.status(500).json({ message: "Error in register.", error: e.message })
    }
}

export const logout = async (req, res) => {
    try {

        res.clearCookie("token")

        return res.status(200).json({ message: "Logout Successfully." })

    } catch (e) {
        return res.status(500).json({ message: "Error in Logout.", error: e.message })
    }
}

export const update = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const user = await User.findOne({ email }).select("-password")

        if (!user) {
            return res.status(400).json({ message: "Invalid Email." })
        }


        const update = {
            username
        }

        if (password) {
            const hashPass = await hashPassword(password)
            update.password = hashPass
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, update, { new: true })

        return res.status(200).json({ message: "User Updated Successfully.", user: updatedUser })

    } catch (e) {
        return res.status(500).json({ message: "Error in Update User.", error: e.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId." })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        const blogs = await Blog.find({ user: userId })

        const blogIds = []

        if (blogs.length > 0) {
            blogs.forEach(blog => {
                blogIds.push(blog._id)
            });
        }

        await Blog.deleteMany({ _id: { $in: blogIds } })

        await User.findByIdAndDelete(userId)

        return res.status(200).json({ message: "User Deleted successfully." })

    } catch (e) {
        return res.status(500).json({ message: "Error in Delete User.", error: e.message })
    }
}
