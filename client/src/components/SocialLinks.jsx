import React from "react"
import InstaSvg from "../svgs/InstaSvg"
import TwitterSvg from "../svgs/TwitterSvg"
import YoutubeSvg from "../svgs/YoutubeSvg"

const SocialLinks = () => {
  return (
    <div className="flex gap-2">
      <a href="https://www.instagram.com/">
        <InstaSvg />
      </a>
      <a href="https://x.com/">
        <TwitterSvg />
      </a>
      <a href="https://www.youtube.com/">
        <YoutubeSvg />
      </a>
    </div>
  )
}

export default SocialLinks
