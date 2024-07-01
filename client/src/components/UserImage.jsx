import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

const UserImage = ({ user }) => {
  return (
    <>
      <div className="size-[50px] flex items-center justify-center rounded-full overflow-hidden">
        <img
          className="object-cover w-full h-full rounded-md"
          src={user.image || "/user.png"}
          alt="Profile Image"
        />
      </div>
      <div>
        <h4 className="text-sm sm:text-base text-gray-600 font-bold">Author</h4>
        <p className="text-sm sm:text-base font-semibold text-tsoft">
          {user.name}
        </p>
      </div>
    </>
  )
}

export default UserImage
