"use client";

import LoginNav from '@/components/loginnav';
import ProfileCard from '@/components/profilecard';
import ProfilePost from '@/components/profilepost';
import Head from 'next/head';
import { use, React } from 'react';
import { useState, useEffect } from 'react';

export default function Page({ params }) {
  const { id } = use(params)
  const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
      try {
          const resp = await fetch(`/api/user/getuser?id=${id}`, {
          method: "GET",
          });

          if (!resp.ok) {
          throw new Error("Failed to fetch user data");
          }

          const data = await resp.json();
          setUserData(data);
      } catch (error) {

      }
    };

    fetchUser();
  }, [id]);

  return (
    <>
      <Head>
        <title>dev-journal</title>
        <meta name="description" content="A Blogging Site For Devs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <LoginNav/>
        <div className="flex mt-10">
            <ProfileCard userData={userData} editProfile={false} />  {/* Shows pfp, username, bio and joinDate */}
            <div className="flex-grow"></div>
            <div className="w-1/2 mr-10">
                <div className="border-2 border-white rounded-xl px-5 py-5">
                    <h2 className="text-4xl text-center">Posts</h2>
                </div>
                <ProfilePost postTitle="Title 1" postId="1" postDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis aliquam mi, eget ornare ex efficitur eu. Integer non erat eget ligula congue pellentesque. Cras nec consequat felis. Sed a ex vel augue elementum egestas a at odio."/>
                <ProfilePost postTitle="Title 2" postId="2" postDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis aliquam mi, eget ornare ex efficitur eu. Integer non erat eget ligula congue pellentesque. Cras nec consequat felis. Sed a ex vel augue elementum egestas a at odio."/>
                <ProfilePost postTitle="Title 3" postId="3" postDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis aliquam mi, eget ornare ex efficitur eu. Integer non erat eget ligula congue pellentesque. Cras nec consequat felis. Sed a ex vel augue elementum egestas a at odio."/>
            </div>
        </div>
      </div>
    </>
  )
}