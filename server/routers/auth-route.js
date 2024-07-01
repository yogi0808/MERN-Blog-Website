import express from "express"
import { getAllUsers, getSingleUser, register, login, logout, update, deleteUser } from "../controllers/auth-controller.js"
import authenticateUser from "../middlewares/authenticate-middleware.js"
import adminAuthenticate from "../middlewares/admin-authenticate-middleware.js"

const router = express.Router()

router.route("/user").get(authenticateUser, adminAuthenticate, getAllUsers)
router.route("/user/:id").get(getSingleUser)
router.route("/user/:id").delete(authenticateUser, adminAuthenticate, deleteUser)
router.route("/user").post(register)
router.route("/login").post(login)
router.route("/logout").get(authenticateUser, logout)
router.route("/user").patch(authenticateUser, update)

export default router