import { Types } from "mongoose"
import Blog from "../models/Blog-model.js"
import User from "../models/user-model.js"

export const getAllBlog = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const keyword = req.query.searchKeyword
        const userId = req.query.userId
        const startDate = req.query.startDate
        const endDate = req.query.endDate
        const sortOrder = parseInt(req.query.sort)


        const filter = {}

        if (keyword) {
            filter.$or = [
                {
                    title: { $regex: keyword, $options: "i" }
                }, {
                    desc: { $regex: keyword, $options: "i" }
                }
            ]
        }

        if (userId) {

            if (!Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid userId." })
            }

            const user = await User.findById(userId)

            if (!user) {
                return res.status(404).json({ message: "User not Found." })
            }

            filter.user = userId
        }

        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        } else if (startDate) {
            filter.createdAt = {
                $gte: new Date(startDate)
            }
        } else if (endDate) {
            filter.createdAt = {
                $lte: new Date(endDate)
            }
        }
        const skip = (page - 1) * limit


        const sort = {}

        if (sortOrder) {
            sort.title = sortOrder
        }

        const blogs = await Blog.find(filter).sort(sort).skip(skip).limit(limit)

        return res.status(200).json(blogs)

    } catch (e) {
        return res.status(500).json({ message: "Error in Get all Blogs.", error: e.message })
    }
}

export const getRandomBlogs = async (req, res) => {
    try {
        const randomBlogs = await Blog.aggregate([{ $sample: { size: 10 } }])

        return res.status(200).json(randomBlogs)
    } catch (e) {
        return res.status(500).json({ message: "Error in Get Random Blogs.", error: e.message })
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const slug = req.params.slug

        const blog = await Blog.findOne({ slug })

        if (!blog) {
            return res.status(400).json({ message: "Invalid Slug." })
        }

        return res.status(200).json(blog)
    } catch (e) {
        return res.status(500).json({ message: "Error in Get Blog.", error: e.message })
    }
}

export const createBlog = async (req, res) => {
    try {

        const userId = req.userId


        const { title, desc, image, slug } = req.body

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId." })
        }


        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        const blog = await Blog.findOne({ slug })

        if (blog) {
            return res.status(400).json({ message: "Title must be Unique." })
        }

        const newBlog = new Blog({
            title, desc,
            image,
            user: new Types.ObjectId(userId),
            slug
        })

        await newBlog.save()

        return res.status(201).json({ message: "Blog Created Successfully.", blog: newBlog })

    } catch (e) {
        return res.status(500).json({ message: "Error in Create Blog.", error: e.message })
    }
}

export const updateBlog = async (req, res) => {
    try {

        const { title, desc, image, slug } = req.body

        const proSlug = req.params.slug
        const userId = req.userId

        const blog = await Blog.findOne({ slug: proSlug })

        if (!blog) {
            return res.status(400).json({ message: "Invalid Slug." })
        }

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId." })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }


        if (blog.user != userId) {
            return res.status(400).json({ message: "this Post is not belongs to you so you can not Edit this Post." })
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blog._id, {
            title, desc, slug, image
        }, { new: true })

        return res.status(200).json({ message: "Blog Updated Successfully.", blog: updatedBlog })

    } catch (e) {
        return res.status(500).json({ message: "Error in update Post.", error: e.message })
    }
}

export const deleteBlog = async (req, res) => {
    try {

        const userId = req.userId

        const slug = req.params.slug

        const blog = await Blog.findOne({ slug })

        if (!blog) {
            return res.status(400).json({ message: "Invalid Slug." })
        }

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId." })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }


        if (!user.isAdmin) {
            if (blog.user != userId) {
                return res.status(400).json({ message: "this Post is not belongs to you so you can not Delete this Post." })
            }
        }

        await Blog.findByIdAndDelete(blog._id)

        return res.status(200).json({ message: "Blog Deleted Successfully." })


    } catch (e) {
        return res.status(500).json({ message: "Error in Deleting Blog." })
    }
}
