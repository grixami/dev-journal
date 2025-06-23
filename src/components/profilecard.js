import Image from "next/image"

export default function ProfileCard({userData, editProfile}) {

    return(
    <div className="w-1/3 ml-10">
    <div className="border rounded-xl px-5 py-5">
        <div className="flex justify-center">
            {userData?.profilepic ? (
                <Image
                    className="border-2 border-white rounded-full"
                    src={`data:image/png;base64,${userData.profilepic}`}
                    alt="logo"
                    width={200}
                    height={200}
                />
            ) : (
                <Image
                    className="border-2 border-white rounded-full"
                    src="/assets/img/defaultprofile.png"
                    alt="logo"
                    width={200}
                    height={200}
                />
            )}
        </div>
        <div className="h-[2px] bg-[#3d444d] w-full mt-5"></div>
        <h2 className="text-3xl text-start ml-10 mt-3">{userData?.username}</h2>
        <p className="ml-10 break-words">{userData?.bio}</p> {/* Break words used so long words do not go across the boarder */}
        <p className="text-start pl-10 mt-5">Created at - {new Date(userData?.createdAt).toLocaleString()}</p>
        {editProfile ? ( 
            <div className="mt-4 ml-10"> {/* Button for if a user can edit their profile (only on /dashboard) */}
                <a href="/dashboard/editprofile"
                className="bg-[#3d444d] px-10 py-2 rounded-xl border hover:bg-[#2c3036]"
                >Edit Profile</a>
            </div>
        ) : (
            <></>
        )}

        </div>
    </div>
    )
}