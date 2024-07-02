import React from "react"

const Input = ({
  type,
  name,
  placeholder,
  cClassis,
  value,
  onChange,
  accept,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`dark:bg-zinc-700 bg-zinc-200 px-4 py-2 rounded-sm ${
        cClassis ? cClassis : ""
      }`}
      accept={accept}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
