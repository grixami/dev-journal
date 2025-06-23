import LoginNav from "@/components/loginnav"
import Head from "next/head"
import AdminManageUserProfile from "@/components/admin/userprofile"

export default function AdminDashboard() {
    const testNum = 16;

    return(
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <LoginNav/>
                <form>
                    <input>
                    </input>
                </form>

                <div className="grid grid-cols-3 gap-15 mx-30">
                    {Array.from({ length: testNum}).map((_, index) => (
                        <AdminManageUserProfile key={index} userId="1234" username="example_username" bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque libero, ultricies eget arcu sit amet, euismod pharetra quam. Donec aliquet nec mi consequat sagittis. Cras vestibulum, quam vel rhoncus scelerisque, eros erat aliquet odio,"/>
                    ))}
                </div>
            </div>
        </>
    )
}