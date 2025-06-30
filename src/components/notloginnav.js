"use client"

import Link from "next/link"
import Image from "next/image"
import UrlButton from "./urlbutton"
import { useState } from "react"

export default function NotLoginNav({}) {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
      setMenuOpen(!menuOpen)
    }

    return(
      <header className="shadow-md h-20 flex items-center border-b-2 border-[#3d444d] bg-[#010409]">
        <div className="w-full flex items-center justify-between px-4">
          <Link href="/">
          <div className="flex items-center gap-0">
          <h1 className="font-bold text-3xl px-2 sm:pl-20 pl-0">Dev Journal</h1>
            <Image
                className="dark:invert"
                src="/assets/img/logo.png"
                alt="logo"
                width={70}
                height={70}
              />
          </div>
          </Link>
          <nav>
            <ul className="text-black justify-end px-4 hidden md:flex">
              <li className="mx-2 transition-transform duration-300 ease-in-out hover:scale-105"><UrlButton buttonText="Login" link="/auth/login"/></li>
              <li className="mx-2 transition-transform duration-300 ease-in-out hover:scale-105"><UrlButton buttonText="Sign Up" link="/auth/signup"/></li>
            </ul>
          </nav>
          <div className="md:hidden relative">
              <Image
              className="dark:invert hover:cursor-pointer"
              src={"/assets/img/menuicon.png"}
              alt="menu"
              width={50}
              height={50}
              onClick={() => toggleMenu()}
              />
              {menuOpen && (
                <div className="absolute top-full right-4 mt-2 w-48 bg-[#010409] border border-gray-700 rounded-lg shadow-lg z-50 transition-transform origin-top-right animate-scale-in">
                  <ul className="flex flex-col space-y-5 p-4">
                    <li><UrlButton buttonText="Login" link="/auth/login"/></li>
                    <li><UrlButton buttonText="Sign Up" link="/auth/signup"/></li>
                  </ul>
                </div>
              )}
          </div>
        </div>
      </header>
    )
}
