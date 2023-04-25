import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { useEffect, useRef } from "react";
import Head from "next/head";
import { MainScene } from "@/gl/parts/MainScene";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  const three = useRef<MainScene>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (three.current) return;
    if (!canvas.current) return;

    three.current = new MainScene({
      el: canvas.current,
    });
  }, []);

  return (
    <main>
      <Head>
        <title>Emoji</title>
        <meta name="description" content="emojijijijijiiiiiii" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ClerkProvider {...pageProps}>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </ClerkProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
