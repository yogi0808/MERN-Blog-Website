import { Schema, model } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    name: {
        type: String,
        required: "name is required",
        min: [3, "Must be at least 3 characters."],
        max: [25, "Maximum 25 characters."]
    },
    username: {
        type: String,
        required: "Username is required",
        min: [3, "Must be at least 3 characters."],
        max: [25, "Maximum 25 characters."]
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: "Email address is required",
        unique: [true, "Email already Exist."],
    },
    password: {
        type: String,
        required: "Password is required",
        min: [6, "Must be at least 6 characters."]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    const user = this

    if (!user.isModified("password")) {
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound)
        user.password = hashPassword
    } catch (e) {
        next(e)
    }

})

userSchema.methods.makeToken = function () {
    return jwt.sign({
        userId: this._id.toString(),
        isAdmin: this.isAdmin,
    },
        process.env.JWT_SECRET_KEY, {
        expiresIn: "1d"
    })
}

userSchema.methods.comperePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password,)
}

const User = new model("User", userSchema)

export default User