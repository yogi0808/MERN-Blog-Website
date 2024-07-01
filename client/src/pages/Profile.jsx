import React from "react"
import { useSelector } from "react-redux"
import { NavLink, Outlet } from "react-router-dom"

const links = [
  {
    id: "1",
    title: "My Blogs",
    path: "",
  },
  {
    id: "2",
    title: "Create Blog",
    path: "/createblog",
  },
  {
    id: "3",
    title: "Logout",
    path: "logout",
  },
]

const Profile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo)
  return (
    <main className="px-5 sm:px-10 max-w-screen-2xl 2xl:mx-auto">
      <div className="w-full flex flex-wrap gap-12 md:gap-0">
        <div className="w-full md:w-1/3">
          <div className="w-full mx-auto md:w-fit flex flex-col md:sticky top-28 items-center justify-center bg-zinc-800 rounded-md p-4 gap-6 md:p-8">
            <div className="size-32 rounded-full overflow-hidden relative flex items-center justify-center">
              <img
                src={userInfo.image ? userInfo.image : "/user.png"}
                alt="Profile image"
                className="object-cover object-center w-full h-full"
              />
            </div>
            <h5 className="text-2xl font-semibold">{userInfo.username}</h5>
            <div className="flex flex-col gap-2">
              {links.map((item) => (
                <NavLink
                  key={item.id}
                  className={({ isActive }) =>
                    `px-2 text-lg font-normal tracking-wide hover:text-inherit ${
                      isActive
                        ? "text-inherit dark:text-inherit"
                        : "dark:text-white text-black md:dark:text-zinc-500 md:text-zinc-400"
                    }  transition-all mix-blend-difference md:mix-blend-normal`
                  }
                  to={item.path}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Profile
