"use client"

import Link from "next/link"
import Image from "next/image"
import UrlButton from "./urlbutton"
import { useState } from "react"

export default function LoginNav({}) {

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
      setMenuOpen(!menuOpen)
    }

    return(
      <header className="shadow-md h-20 flex items-center border-b-2 border-[#3d444d] bg-[#010409]">
        <div className="w-full inline-flex items-center justify-between mx-4">
          <Link href="/" className="transition-transform duration-300 hover:scale-105">
          <div className=" hidden lg:flex items-center gap-0">
            <h1 className="font-bold text-3xl mx-2 ml-20 bor ">Dev Journal</h1>
              <Image
                className="dark:invert"
                src="/assets/img/logo.png"
                alt="logo"
                width={70}
                height={70}
              />
          </div>
          </Link>
          <div className="flex justify-start md:justify-center items-center">
            <form className="flex items-center" action="/search">
              <input type="text" name="query" className="border focus:border-[#5a9ef9] focus:outline-none rounded-lg h-10 resize-none py-2 px-2 overflow-hidden transition-transform duration-300 focus:scale-105 hover:scale-105" placeholder="search..."></input>
              <button type="submit">
              <Image
                  className="cursor-pointer align-middle dark:invert mx-3  border border-black rounded-full py-1 px-1 bg-[#fefbf6] hover:bg-[#9e9c95] duration-300 transition-transform ease-in-out hover:scale-110 hover:rotate-30"
                  src="/assets/img/searchicon.svg"
                  alt="logo"
                  width={40}
                  height={40}
                />
                </button>
            </form>
          </div>
          <nav>
            <ul className="justify-end px-4 hidden xl:flex">
              <li className="mx-2 transition-transform duration-300 ease-in-out hover:scale-105"><UrlButton buttonText="Bookmarks" link="/dashboard/bookmarks"/></li>
              <li className="mx-2 transition-transform duration-300 ease-in-out hover:scale-105"><UrlButton buttonText="Settings" link="/dashboard/settings"/></li>
              <li className="mx-2 transition-transform duration-300 ease-in-out hover:scale-105"><UrlButton buttonText="Create Post" link="/dashboard/createpost"/></li>
              <li className="mx-2 transition-transform duration-300 ease-in-out hover:scale-105"><UrlButton buttonText="Dashboard" link="/dashboard"/></li>
              <li className="mx-2 transition-transform duration-300 ease-in-out hover:scale-105"><UrlButton buttonText="Logout" link="/auth/logout"/></li>
            </ul>
          </nav>

          <div className="relative block xl:hidden">
            <Image
            className="dark:invert hover:cursor-pointer"
            src="/assets/img/menuicon.png"
            alt="menu"
            width={50}
            height={50}
            onClick={() => toggleMenu()}
            />
          {menuOpen && (
            <div className="absolute top-full right-4 mt-2 w-48 bg-[#010409] border border-gray-700 rounded-lg shadow-lg z-50 transition-transform origin-top-right animate-scale-in">
              <ul className="flex flex-col space-y-5 p-4">
                <li><UrlButton buttonText="Bookmarks" link="/dashboard/settings" fullWidth /></li>
                <li><UrlButton buttonText="Settings" link="/dashboard/settings" fullWidth /></li>
                <li><UrlButton buttonText="Create Post" link="/dashboard/createpost" fullWidth /></li>
                <li><UrlButton buttonText="Dashboard" link="/dashboard" fullWidth /></li>
                <li><UrlButton buttonText="Logout" link="/auth/logout" fullWidth /></li>
              </ul>
            </div>
          )}
          </div>

          
        </div>

      </header>
    )
}