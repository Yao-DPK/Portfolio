import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";
import Loader from "@/components/Loader";
import  Head  from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ThemeProvider>
        {/* <Loader /> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
    
  );
}

export default MyApp;