import express from "express"
// const express = require("express")
import { getAllBlog, getSingleBlog, updateBlog, deleteBlog, createBlog, getRandomBlogs } from "../controllers/blog-controller.js"
// const blogController = require("../controllers/blog-controller")
import authenticateUser from "../middlewares/authenticate-middleware.js"
// const authenticateUser = require("../middlewares/authenticate-middleware")

const router = express.Router()

router.route("/").get(getAllBlog)
router.route("/random").get(getRandomBlogs)
router.route("/:slug").get(getSingleBlog)
router.route("/:slug").patch(authenticateUser, updateBlog)
router.route("/:slug").delete(authenticateUser, deleteBlog)
router.route("/").post(authenticateUser, createBlog)

export default router