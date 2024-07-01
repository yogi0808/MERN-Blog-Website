import React from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer
        stacked
        position="bottom-right"
      />
      <main className="my-8">
        <Outlet />
      </main>
    </>
  )
}

export default App
