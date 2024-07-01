import React, { useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"
import { toast } from "react-toastify"

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)

  const getBlogs = async () => {
    const response = await fetch(`http://localhost:3000/api/blog`, {
      credentials: "include",
    })

    const data = await response.json()

    if (response.ok) {
      setBlogs(data)
    } else {
      toast.error(data.message)
    }
  }

  const getNewPage = async () => {
    const response = await fetch(
      `http://localhost:3000/api/blog?page=${page + 1}`,
      {
        credentials: "include",
      }
    )

    const data = await response.json()

    if (response.ok) {
      setBlogs((prev) => [...prev, ...data])
      setPage(page + 1)
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])
  return (
    <main className="px-5 sm:px-10 max-w-screen-2xl 2xl:mx-auto">
      <div className="flex flex-wrap items-center justify-center">
        {blogs.map((item) => (
          <BlogCard
            key={item._id}
            blog={item}
          />
        ))}
      </div>
      {blogs.length >= 10 && (
        <div className="flex items-center justify-center p-12">
          <button
            onClick={getNewPage}
            className="rounded-full relative border bg-transparent px-4 py-2 text-lg overflow-hidden tracking-wide dark:border-white border-black after:content-[''] after:w-full after:absolute after:bottom-0 after:left-0 after:h-0 hover:after:h-full after:rounded-full after:bg-[#121212] after:dark:bg-white hover:dark:text-black hover:text-white after:transition-all after:duration-300 after:ease-out after:-z-10 font-semibold"
          >
            Load More...
          </button>
        </div>
      )}
    </main>
  )
}

export default Blogs
