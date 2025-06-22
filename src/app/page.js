import Head from "next/head";
import NotLoginNav from "../../components/NotLoginNav";

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
        <div className="flex flex-col justify-center items-center py-10">
          <h1 className="text-6xl mb-3">Dev Journal</h1>
          <p>A place to blog about tech</p>
        </div>
      </div>
    </>
  );
}
