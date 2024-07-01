import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { formatDate } from "../helper"
import { Link } from "react-router-dom"

const FeaturedBlogCard = ({ blog }) => {
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
    <div className="w-full sm:w-[90%] lg:w-3/4 py-6 md:py-9 lg:py-12 flex gap-6 md:gap-8 flex-col sm:flex-row border-b dark:border-white border-black ">
      <div className="flex justify-center items-center">
        <Link
          to={`/blogs/${blog.slug}`}
          className="size-44 md:size-60"
        >
          {blog.image ? (
            <img
              src={blog.image}
              alt="post"
              className="object-cover h-full w-full rounded-sm"
            />
          ) : (
            <img
              src="/p1.png"
              alt="post"
              className="object-cover h-full w-full rounded-sm"
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-8 w-full">
        <div className="flex gap-4 md:gap-8 flex-col">
          <h2 className="line-clamp-1 font-semibold text-2xl sm:text-3xl md:text-4xl pointer-events-none">
            {blog.title}
          </h2>
          <p className="line-clamp-3 text-sm md:text-base dark:font-light font-normal tracking-wide pointer-events-none">
            {blog.desc}
          </p>
        </div>
        <div className="flex gap-10">
          <p className="dark:font-light font-normal tracking-wide pointer-events-none">
            <span className="font-semibold">Date</span> {date}
          </p>
          <p className="dark:font-light font-normal tracking-wide pointer-events-none">
            <span className="font-semibold">Author</span> {user.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeaturedBlogCard
