import Link from "next/link"
import Image from "next/image"
import UrlButton from "./urlbutton"

export default function NotLoginNav({}) {

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
          <nav>
            <ul className="text-black flex justify-end px-4">
              <li className="mx-2"><UrlButton buttonText="Login" link="/auth/login"/></li>
              <li className="mx-2"><UrlButton buttonText="Sign Up" link="/auth/signup"/></li>
            </ul>
          </nav>
        </div>
      </header>
    )
}