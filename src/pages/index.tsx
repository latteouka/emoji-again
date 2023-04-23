import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "@/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main className="absolute left-0 top-0 z-20 flex h-screen w-full items-center justify-center text-red-500">
        t3 + three
      </main>
    </>
  );
};

export default Home;
