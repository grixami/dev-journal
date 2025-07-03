import Image from "next/image"

export default function FollowerLbUser({ user }) {
    return (
        <a href={`/user/${user.id}/profile`} className="flex border-2 rounded-3xl p-3 space-x-5 w-11/12 md:w-3/5 items-center hover:bg-[#35383d] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="shrink-0">
                {user.profilepic ? (
                <Image
                className="rounded-full border-2 border-white"
                src={`data:image/jpeg;base64, ${user?.profilepic}`}
                alt="avatar"
                width={100}
                height={100}
                />
                ) : (
                <Image
                className="rounded-full border-2 border-white"
                src="/assets/img/defaultprofile.png"
                alt="avatar"
                width={100}
                height={100}
                />
                )}

            </div>
            <div className="flex-col space-y-2">
                <h2 className="sm:text-4xl text-2xl">{user?.username}</h2>
                {user.bio && ( //only draws one line if the user doesnt have a bio
                <div>
                    <hr></hr>
                    <p className="text-base sm:text-lg">{user?.bio}</p>   
                </div>
                )}

                <hr></hr>
                <p>Followers: {user?._count.followers}</p>
            </div>
        </a>
    )
}