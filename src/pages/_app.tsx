import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";
import Loader from "@/components/Loader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>

      {/* <Loader /> */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;