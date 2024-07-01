import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const ProtectedRouteForAdmin = () => {
  const userInfo = useSelector((state) => state.auth.userInfo) || ""
  const isAdmin = userInfo.isAdmin || false

  return userInfo && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
    />
  )
}

export default ProtectedRouteForAdmin
