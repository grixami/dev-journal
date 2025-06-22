import Head from "next/head";
import NotLoginNav from "@/components/NotLoginNav";
import MainFooter from "@/components/MainFooter";

export default function Home() {
  return (
    <>
      <Head>
        <title>dev-jornal</title>
        <meta name="description" content="A Blogging Site For Devs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NotLoginNav/>
      <div>
        <div className="flex flex-col justify-center items-center py-20">
          <h1 className="text-6xl mb-3">Dev Journal</h1>
          <p>A place to blog about tech</p>
        </div>
        <div className="pt-10 flex flex-row items-center justify-center">
          <div className="border-2 px-10 py-10 mx-35 rounded-2xl w-96 bg-[#1d2222]" style={{ boxShadow: "0 0 10px 3px rgba(255,255,255,0.8)" }}>
            <h1 className="text-2xl text-center">What is dev journal?</h1>
            <div className="h-[2px] bg-[#3d444d] w-full my-3"></div>    
            <p className="text-center">Dev Journal is a place for you to blog about your creations or discoveries, it is a place for you to connect with other developers and to share ideas</p>
          </div>
          <div className="border-2 px-10 py-10 mx-35 rounded-2xl w-96 bg-[#1d2222]" style={{ boxShadow: "0 0 10px 3px rgba(255,255,255,0.8)" }}>
            <h1 className="text-2xl text-center">Why blog?</h1>
            <div className="h-[2px] bg-[#3d444d] w-full my-3"></div>    
            <p className="text-center">Blogging will help you reflect on your projects, writing about them is a great way to review what you have done, usually when people review projects, they find mistakes that they can later correct</p>
          </div>
        </div>
      </div>
      <MainFooter/>
    </>
  );
}
