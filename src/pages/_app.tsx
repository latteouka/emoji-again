import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Head from "next/head";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
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
