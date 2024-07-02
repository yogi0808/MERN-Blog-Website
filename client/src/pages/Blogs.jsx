import React, { useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"
import { toast } from "react-toastify"
import Button from "../components/Button"

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
          <Button
            rounded
            onClick={getNewPage}
          >
            Load More...
          </Button>
        </div>
      )}
    </main>
  )
}

export default Blogs
