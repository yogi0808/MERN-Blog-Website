import React, { useEffect, useState } from "react"
import { formatDate } from "../helper"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router"
import UserImage from "../components/UserImage"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const SingleBlog = () => {
  const { slug } = useParams()

  const [blog, setBlog] = useState({})
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.auth.userInfo)

  const getBlog = async () => {
    const response = await fetch(`http://localhost:3000/api/blog/${slug}`, {
      credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error(data.message)
    } else {
      setBlog(data)

      const userRes = await fetch(
        `http://localhost:3000/api/auth/user/${data.user}`,
        { credentials: "include" }
      )

      const userData = await userRes.json()
      if (!userRes.ok) {
        toast.error(userData.message)
      } else {
        setUser(userData)
      }
    }
  }

  const deleteBlog = async () => {
    const text = "Are you sure you want to Delete this Blog?"

    if (confirm(text)) {
      const res = await fetch(`http://localhost:3000/api/blog/${blog.slug}`, {
        method: "DELETE",
        credentials: "include",
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message)
        navigate("/", { replace: true })
      } else {
        toast.error(data.message)
      }
    } else {
      return
    }
  }

  useEffect(() => {
    getBlog()
  }, [])

  return (
    <main className="px-5 sm:px-10 max-w-screen-2xl 2xl:mx-auto">
      <h1 className="text-3xl md:text-4xl mb-12 font-bold tracking-wide text-center">
        {blog.title}
      </h1>
      <div className="w-full sm:max-w-[90%] max-h-[80vh] mx-auto lg:w-3/4 py-6 md:py-9 lg:py-12 overflow-hidden object-center flex items-center justify-center rounded-md">
        <img
          src={blog.image}
          alt="blog image"
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div className="w-full mt-12 md:px-4 flex flex-col gap-10">
        <div className="flex gap-4 justify-center items-center w-fit">
          <UserImage user={user} />
          <div>
            <h4 className="text-sm sm:text-base text-gray-600 font-bold">
              Published
            </h4>
            <p className="text-sm sm:text-base font-semibold text-tsoft">
              {formatDate(new Date(blog.createdAt))}
            </p>
          </div>
        </div>
        <p className="text-tsoft">{blog.desc}</p>
      </div>
      {blog.user === userInfo._id.toString() || userInfo.isAdmin ? (
        <>
          <Link
            to={`/editblog/${blog.slug}`}
            className="text-nowrap rounded-full border bg-transparent px-4 py-2 text-lg overflow-hidden tracking-wide dark:border-white border-black font-semibold hover:dark:bg-white hover:bg-[#121212] hover:dark:text-black hover:text-white fixed bottom-28 right-5 sm:right-10 transition-all duration-200 ease-out dark:bg-[#121212] bg-white"
          >
            Edit
          </Link>
          <button
            onClick={deleteBlog}
            className="text-nowrap rounded-full border bg-transparent px-4 py-2 text-lg overflow-hidden tracking-wide dark:border-white border-black font-semibold hover:dark:bg-white hover:bg-[#121212] hover:dark:text-black hover:text-white fixed bottom-12 right-5 sm:right-10 transition-all duration-200 ease-out dark:bg-[#121212] bg-white"
          >
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </main>
  )
}

export default SingleBlog
