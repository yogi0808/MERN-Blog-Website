import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router"
import { toast } from "react-toastify"
import { logout } from "../app/features/auth/authSlice"

const Logout = () => {
  const despatch = useDispatch()
  const Logout = async () => {
    const response = await fetch(`http://localhost:3000/api/auth/logout`, {
      credentials: "include",
    })

    const data = await response.json()

    if (response.ok) {
      toast.success(data.message)

      despatch(logout())

      return (
        <Navigate
          to="/"
          replace
        />
      )
    } else {
      toast.error(data.message)
      return (
        <Navigate
          to="/profile"
          replace
        />
      )
    }
  }

  useEffect(() => {
    Logout()
  }, [])
}

export default Logout
