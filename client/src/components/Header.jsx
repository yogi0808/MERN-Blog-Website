import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import MenuSvg from "../svgs/MenuSvg"
import SocialLinks from "./SocialLinks"
import { useSelector } from "react-redux"

const links = [
  {
    id: "1",
    title: "Home",
    path: "/",
  },
  {
    id: "2",
    title: "Blogs",
    path: "/blogs",
  },
]

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const userInfo = useSelector((state) => state.auth.userInfo)

  return (
    <header
      className={`w-screen sticky top-0 flex items-center justify-center py-5 sm:px-10 px-5 border-b border-zinc-500
        dark:bg-[#121212] bg-white z-10`}
    >
      <nav className="flex justify-between items-center flex-1 max-w-screen-2xl">
        <Link
          to="/"
          className="text-3xl font-semibold tracking-wide"
        >
          Blog.
        </Link>
        <div className="flex items-center justify-center gap-2">
          <div
            className={`flex flex-col dark:bg-black/70 md:bg-transparent md:dark:bg-transparent md:flex-row justify-center items-center gap-12 md:gap-2 h-[calc(100vh-77px)] md:h-full absolute md:static top-[calc(100%+1px)] left-0 max-md:w-screen ${
              isNavOpen
                ? "rounded-none translate-y-0"
                : "rounded-full -translate-y-[calc(100%+80px)] md:translate-y-0"
            } transition-all duration-300 ease-in-out backdrop-blur-2xl md:backdrop-blur-0`}
          >
            {links.map((link) => (
              <NavLink
                onClick={() => setIsNavOpen(false)}
                key={link.id}
                className={({ isActive }) =>
                  `px-2 text-lg font-normal tracking-wide hover:text-inherit ${
                    isActive
                      ? "text-inherit dark:text-inherit"
                      : "dark:text-white text-black md:dark:text-zinc-500 md:text-zinc-400"
                  }  transition-all mix-blend-difference md:mix-blend-normal`
                }
                to={link.path}
              >
                {link.title}
              </NavLink>
            ))}
            {userInfo && userInfo.isAdmin ? (
              <NavLink
                onClick={() => setIsNavOpen(false)}
                className={({ isActive }) =>
                  `px-2 text-lg font-normal tracking-wide hover:text-inherit ${
                    isActive
                      ? "text-inherit dark:text-inherit"
                      : "dark:text-white text-black md:dark:text-zinc-500 md:text-zinc-400"
                  }  transition-all mix-blend-difference md:mix-blend-normal`
                }
                to="/admindashboard"
              >
                Dashboard
              </NavLink>
            ) : (
              ""
            )}
            {userInfo ? (
              <>
                <NavLink
                  onClick={() => setIsNavOpen(false)}
                  className={({ isActive }) =>
                    `px-2 text-lg font-normal tracking-wide hover:text-inherit ${
                      isActive
                        ? "text-inherit dark:text-inherit"
                        : "dark:text-white text-black md:dark:text-zinc-500 md:text-zinc-400"
                    }  transition-all mix-blend-difference md:mix-blend-normal`
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  onClick={() => setIsNavOpen(false)}
                  className={({ isActive }) =>
                    `px-2 text-lg font-normal tracking-wide hover:text-inherit ${
                      isActive
                        ? "text-inherit dark:text-inherit"
                        : "dark:text-white text-black md:dark:text-zinc-500 md:text-zinc-400"
                    }  transition-all mix-blend-difference md:mix-blend-normal`
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  onClick={() => setIsNavOpen(false)}
                  className={({ isActive }) =>
                    `px-2 text-lg font-normal tracking-wide hover:text-inherit ${
                      isActive
                        ? "text-inherit dark:text-inherit"
                        : "dark:text-white text-black md:dark:text-zinc-500 md:text-zinc-400"
                    }  transition-all mix-blend-difference md:mix-blend-normal`
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          <div className="hidden md:flex w-4 h-px dark:bg-white bg-black" />

          <SocialLinks />

          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="md:hidden"
          >
            <MenuSvg openNavigation={isNavOpen} />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
