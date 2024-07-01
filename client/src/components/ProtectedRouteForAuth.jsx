import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const ProtectedRouteForAuth = () => {
  const userInfo = useSelector((state) => state.auth.userInfo)

  return !userInfo ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
    />
  )
}

export default ProtectedRouteForAuth
