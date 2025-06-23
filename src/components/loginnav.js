import Link from "next/link"
import Image from "next/image"
import UrlButton from "./urlbutton"

export default function LoginNav({}) {

    return(
      <header className="shadow-md h-20 flex items-center border-b-2 border-[#3d444d] bg-[#010409]">
        <div className="w-full flex items-center justify-between px-4">
          <Link href="/">
          <div className="flex items-center gap-0">
          <h1 className="font-bold text-3xl px-2 pl-20">Dev Journal</h1>
            <Image
                className="dark:invert"
                src="/assets/img/logo.png"
                alt="logo"
                width={70}
                height={70}
              />
          </div>
          </Link>
          <div className="flex justify-center">
            <textarea className="border focus:border-[#5a9ef9] focus:outline-none rounded-lg h-10 resize-none py-2 px-2 overflow-hidden" placeholder="search..."></textarea>
            <Image
                className="dark:invert mx-3  border border-black rounded-full py-1 px-1 bg-[#fefbf6] hover:bg-[#9e9c95]"
                src="/assets/img/searchicon.svg"
                alt="logo"
                width={40}
                height={40}
              />
          </div>
          <nav>
            <ul className="flex justify-end px-4">
              <li className="mx-2"><UrlButton buttonText="Create Post" link="/dashboard/createpost"/></li>
              <li className="mx-2"><UrlButton buttonText="Dashboard" link="/dashboard"/></li>
              <li className="mx-2"><UrlButton buttonText="Logout" link="/auth/logout"/></li>
            </ul>
          </nav>
        </div>
      </header>
    )
}