import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { convertToBase64, makeSlug } from "../helper"
import { toast } from "react-toastify"
import Input from "../components/Input"
import Button from "../components/Button"

const EditBlog = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState({
    title: "",
    desc: "",
  })

  const [base64Image, setBase64Image] = useState("")
  const navigate = useNavigate()

  const handelOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBlog((pre) => ({ ...pre, [name]: value }))
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const base64String = await convertToBase64(file)
        setBase64Image(base64String)
      } catch (error) {
        toast.error("Error converting file to base64:")
        console.error("Error converting file to base64:", error)
      }
    }
  }

  const handelSubmit = async (e) => {
    e.preventDefault()

    const newSlug = await makeSlug(blog.title)

    const response = await fetch(`http://localhost:3000/api/blog/${slug}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...blog, image: base64Image, slug: newSlug }),
    })

    const data = await response.json()

    if (response.ok) {
      toast.success(data.message)
      setBlog({ title: "", desc: "" })

      navigate(`/blogs/${newSlug}`, { replace: true })
    } else {
      toast.error(data.message)
    }
  }

  const getBlog = async () => {
    const response = await fetch(`http://localhost:3000/api/blog/${slug}`, {
      credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error(data.message)
    } else {
      setBlog(data)
      setBase64Image(data.image)
    }
  }

  useEffect(() => {
    getBlog()
  }, [])

  return (
    <main className="px-5 sm:px-10 max-w-screen-2xl 2xl:mx-auto flex flex-col gap-12 items-center justify-center">
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl pointer-events-none text-center">
        Create your Blog
      </h1>
      <form
        onSubmit={handelSubmit}
        className="flex flex-col gap-4 sm:gap-6 w-full max-w-[550px]"
      >
        <Input
          type="text"
          name="title"
          placeholder="Enter your Title."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={blog.title}
          onChange={handelOnChange}
        />
        <Input
          type="file"
          name="image"
          accept="image/*"
          placeholder="Enter your image."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          onChange={handleFileChange}
        />
        <textarea
          name="desc"
          placeholder="Enter your Description."
          cols="30"
          rows="10"
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={blog.desc}
          onChange={handelOnChange}
        />
        <Button
          disable={!blog.title || !blog.desc || !base64Image ? true : false}
        >
          Submit
        </Button>
      </form>
    </main>
  )
}

export default EditBlog
