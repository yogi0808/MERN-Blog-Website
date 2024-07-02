import React, { useEffect, useState } from "react"
import FeaturedBlogCard from "../components/FeaturedBlogCard"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import Button from "../components/Button"

const Home = () => {
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    const response = await fetch(`http://localhost:3000/api/blog/random`, {
      credentials: "include",
    })

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
    <main className="px-5 sm:px-10 max-w-screen-2xl 2xl:mx-auto">
      <div className="flex items-center justify-center flex-col">
        {blogs.map((item) => (
          <FeaturedBlogCard
            key={item._id}
            blog={item}
          />
        ))}
      </div>
      {blogs.length >= 10 && (
        <div className="flex items-center justify-center p-12">
          <Link to="/blogs">
            <Button rounded>Read More Blogs...</Button>
          </Link>
        </div>
      )}
    </main>
  )
}

export default Home
