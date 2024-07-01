import { Schema, model } from "mongoose"

const blogSchema = new Schema({
    title: {
        type: String,
        required: "Title is required.",
        min: [5, "Must be at list 5 Characters."]
    },
    desc: {
        type: String,
        required: "Description is required."
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const Blog = new model("Blog", blogSchema)

export default Blog