import React, { useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"
import { useSelector } from "react-redux"

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([])

  const user = useSelector((state) => state.auth.userInfo)

  const getBlogs = async () => {
    const response = await fetch(
      `http://localhost:3000/api/blog?userId=${user._id}`,
      {
        credentials: "include",
      }
    )

    const data = await response.json()

    if (response.ok) {
      setBlogs(data)
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-12 font-bold tracking-wide text-center">
        My Blogs
      </h1>
      {blogs.length <= 0 ? (
        <h1 className="text-center text-4xl font-bold tracking-wider text-zinc-700">
          You haven't created any Blogs yet.
        </h1>
      ) : (
        <div className="flex flex-wrap items-center justify-center">
          {blogs.map((item) => (
            <BlogCard
              key={item._id}
              blog={item}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBlogs
