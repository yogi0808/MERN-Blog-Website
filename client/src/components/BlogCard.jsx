import React, { useEffect, useState } from "react"
import { formatDate } from "../helper"
import { Link } from "react-router-dom"

const BlogCard = ({ blog }) => {
  const [user, setUser] = useState("")

  const date = formatDate(new Date(blog.createdAt))

  const getBlog = async () => {
    const response = await fetch(
      `http://localhost:3000/api/auth/user/${blog.user}`,
      {
        credentials: "include",
      }
    )

    const data = await response.json()

    if (response.ok) {
      setUser(data)
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    getBlog()
  }, [])

  return (
    <div className="p-6 sm:p-8 lg:p-12 border dark:border-white border-black flex flex-col w-fit max-w-[380px] gap-4 md:gap-6">
      <p className="dark:font-light font-normal tracking-wide pointer-events-none">
        {date}
      </p>
      <div>
        <Link
          to={`/blogs/${blog.slug}`}
          className="aspect-square inline-block max-w-[300px]"
        >
          <img
            src={blog.image}
            alt="post"
            className="object-cover h-full w-full rounded-sm"
          />
        </Link>
      </div>
      <div className="flex gap-3 flex-col">
        <h2 className="line-clamp-1 font-semibold text-2xl sm:text-3xl pointer-events-none">
          {blog.title}
        </h2>
        <p className="line-clamp-3 text-sm md:text-base dark:font-light font-normal tracking-wide pointer-events-none">
          {blog.desc}
        </p>
        <p className="dark:font-light font-normal tracking-wide pointer-events-none">
          <span className="font-semibold">Author</span> {user.name}
        </p>
      </div>
    </div>
  )
}

export default BlogCard
