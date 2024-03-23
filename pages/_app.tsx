import "../styles/globals.css";
import "../styles/generate_page.css";
import type { AppProps } from "next/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  //your other metadata
};

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
