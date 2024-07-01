import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const AdminDashboard = () => {
  const [users, setUsers] = useState([])

  const userInfo = useSelector((state) => state.auth.userInfo)

  const getAllUsers = async () => {
    const response = await fetch(`http://localhost:3000/api/auth/user`, {
      credentials: "include",
    })

    const data = await response.json()

    if (response.ok) {
      setUsers(data.users)
    } else {
      toast.error(data.message)
    }
  }

  const deleteUser = async (id) => {
    const text = "Are you sure you want to Delete this User?"

    if (userInfo._id === id) {
      return alert("You cannot Delete Your own Account.")
    }

    if (userInfo && userInfo.isAdmin && confirm(text)) {
      const response = await fetch(
        `http://localhost:3000/api/auth/user/${id}`,
        { method: "DELETE", credentials: "include" }
      )

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        getAllUsers()
      } else {
        toast.error(data.message)
      }
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="px-5 sm:px-10 max-w-screen-2xl 2xl:mx-auto">
      <h1 className="text-3xl md:text-4xl mb-12 font-bold tracking-wide text-center">
        My Blogs
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                isAdmin
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr
                key={item._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.email}
                </th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.username}</td>
                <td className="px-6 py-4">
                  {item.isAdmin ? "Admin" : "not Admin"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteUser(item._id)}
                    className="font-medium text-white px-2 py-1 rounded-md hover:bg-red-500 bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard
