import React from "react"

const Button = ({ children, disable, cClassis, rounded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        rounded ? "rounded-full" : "rounded-sm"
      } relative border bg-transparent px-4 py-2 text-lg overflow-hidden tracking-wide dark:border-white border-black after:content-[''] after:w-full after:absolute after:bottom-0 after:left-0 after:h-0 hover:after:h-full after:bg-[#121212] after:dark:bg-white hover:dark:text-black hover:text-white after:transition-all after:duration-300 after:ease-out after:-z-10 font-semibold disabled:bg-zinc-500 disabled:border-none disabled:text-black disabled:cursor-not-allowed ${
        cClassis ? cClassis : ""
      }`}
      disabled={disable}
    >
      {children}
    </button>
  )
}

export default Button
