import React, { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { login } from "../app/features/auth/authSlice"
import { Link } from "react-router-dom"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handelOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser((pre) => ({ ...pre, [name]: value }))
  }

  const despatch = useDispatch()

  const navigate = useNavigate()

  const handelSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    const data = await response.json()

    if (response.ok) {
      toast.success(data.message)
      setUser({ email: "", password: "" })

      despatch(login(data.user))

      navigate("/", { replace: true })
    } else {
      toast.error(data.message)
    }
  }

  return (
    <main className="px-5 sm:px-10 max-w-screen-2xl 2xl:mx-auto flex flex-col gap-12 items-center justify-center">
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl pointer-events-none text-center">
        Login
      </h1>
      <form
        onSubmit={handelSubmit}
        className="flex flex-col gap-4 sm:gap-6 w-full max-w-[550px]"
      >
        <input
          type="text"
          name="email"
          placeholder="Enter your Email."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={user.email}
          onChange={handelOnChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password."
          className="dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm"
          value={user.password}
          onChange={handelOnChange}
        />
        <button
          className={`rounded-sm relative border bg-transparent px-4 py-2 text-lg overflow-hidden tracking-wide dark:border-white border-black after:content-[''] after:w-full after:absolute after:bottom-0 after:left-0 after:h-0 hover:after:h-full after:bg-[#121212] after:dark:bg-white hover:dark:text-black hover:text-white after:transition-all after:duration-300 after:ease-out after:-z-10 font-semibold disabled:bg-zinc-500 disabled:border-none disabled:text-black disabled:cursor-not-allowed`}
          disabled={!user.email || !user.password ? true : false}
        >
          Submit
        </button>
        <p className="text-balance font-medium">
          Don't Have an Account{" "}
          <Link
            to="/register"
            className="text-blue-800 underline"
          >
            click Hear.
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Login
