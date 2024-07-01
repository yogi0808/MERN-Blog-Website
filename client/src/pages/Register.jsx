import React, { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { convertToBase64 } from "../helper"
import { Link } from "react-router-dom"

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })

  const [cPassword, setCPassword] = useState("")

  const [base64Image, setBase64Image] = useState("")

  const navigate = useNavigate()

  const handelOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser((pre) => ({ ...pre, [name]: value }))
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

    if (user.password !== cPassword) {
      return toast.error("Password do not match.")
    }

    const response = await fetch(`http://localhost:3000/api/auth/user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, image: base64Image }),
    })

    const data = await response.json()

    if (response.ok) {
      toast.success(data.message)
      setUser({ name: "", username: "", email: "", password: "" })
      setCPassword("")

      navigate("/login", { replace: true })
    } else {
      toast.error(data.message)
    }
  }

  return (
    <main className="px-5 sm:px-10 max-w-screen-2xl 2xl:mx-auto flex flex-col gap-12 items-center justify-center">
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl pointer-events-none text-center">
        Register
      </h1>
      <form
        onSubmit={handelSubmit}
        className="flex flex-col gap-4 sm:gap-6 w-full max-w-[550px]"
      >
        <input
          type="text"
          name="name"
          placeholder="Enter your Name."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={user.name}
          onChange={handelOnChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Enter your Username."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={user.username}
          onChange={handelOnChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your Email."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={user.email}
          onChange={handelOnChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          placeholder="Enter your image."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          onChange={handleFileChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={user.password}
          onChange={handelOnChange}
        />
        <input
          type="password"
          name="cPassword"
          placeholder="Re-Enter your Password."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
        <button
          className={`rounded-sm relative border bg-transparent px-4 py-2 text-lg overflow-hidden tracking-wide dark:border-white border-black after:content-[''] after:w-full after:absolute after:bottom-0 after:left-0 after:h-0 hover:after:h-full after:bg-[#121212] after:dark:bg-white hover:dark:text-black hover:text-white after:transition-all after:duration-300 after:ease-out after:-z-10 font-semibold disabled:bg-zinc-500 disabled:border-none disabled:text-black disabled:cursor-not-allowed`}
          disabled={
            !user.name ||
            !user.username ||
            !user.email ||
            !user.password ||
            !cPassword
              ? true
              : false
          }
        >
          Submit
        </button>
        <p className="text-balance font-medium">
          Already Have an Account{" "}
          <Link
            to="/login"
            className="text-blue-800 underline"
          >
            click Hear.
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Register
