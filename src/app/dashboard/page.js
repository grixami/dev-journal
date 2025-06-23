"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cookieExists } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import Head from "next/head";
import LoginNav from "@/components/loginnav";
import { getCookie } from "@/utils/cookies";
import ProfileCard from "@/components/profilecard";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!cookieExists("auth_token")) {
            router.replace("/");
            return;
        }

        const fetchUser = async () => {
        const token = getCookie("auth_token");

            try {
                const resp = await fetch(`/api/user/getself?token=${token}`, {
                method: "GET",
                });

                if (!resp.ok) {
                throw new Error("Failed to fetch user data");
                }

                const data = await resp.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.replace("/");
            }
        };

        fetchUser();
    }, [router]);

return (
    <>
        <Head>
            <title>dev-jornal</title>
            <meta name="description" content="A Blogging Site For Devs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div>
            <LoginNav/>
            <div className="flex mt-10">
                <ProfileCard userData={userData} editProfile={true} />  {/* Shows pfp, username, bio and joinDate */}
                <div className="flex-grow"></div>
                <div className="w-1/2 mr-10">
                    <div className="border-2 border-white rounded-xl px-5 py-5">
                        <h2 className="text-4xl text-center">Posts</h2>
                    </div>
                    <div className="cursor-pointer border-2 border-white rounded-xl px-5 py-5 my-5 transform transition-transform duration-500 ease-in-out hover:-translate-x-10 hover:bg-[#35383d]">
                        <h2 className="text-3xl">Title 1</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis aliquam mi, eget ornare ex efficitur eu. Integer non erat eget ligula congue pellentesque. Cras nec consequat felis. Sed a ex vel augue elementum egestas a at odio.</p>
                    </div>
                    <div className="cursor-pointer border-2 border-white rounded-xl px-5 py-5 my-5 transform transition-transform duration-500 ease-in-out hover:-translate-x-10 hover:bg-[#35383d]">
                        <h2 className="text-3xl">Title 2</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis aliquam mi, eget ornare ex efficitur eu. Integer non erat eget ligula congue pellentesque. Cras nec consequat felis. Sed a ex vel augue elementum egestas a at odio.</p>
                    </div>
                    <div className="cursor-pointer border-2 border-white rounded-xl px-5 py-5 my-5 transform transition-transform duration-500 ease-in-out hover:-translate-x-10 hover:bg-[#35383d]">
                        <h2 className="text-3xl">Title 3</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis aliquam mi, eget ornare ex efficitur eu. Integer non erat eget ligula congue pellentesque. Cras nec consequat felis. Sed a ex vel augue elementum egestas a at odio.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}