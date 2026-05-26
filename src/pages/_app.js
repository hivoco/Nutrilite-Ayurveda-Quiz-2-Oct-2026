import { SessionProvider } from "@/context/SessionContext";
import { MusicProvider } from "@/context/MusicContext";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <MusicProvider musicUrl="/music/bg.mp3">
        <Head>
          <title>
            Amway Nutrilite delicious shake mix
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta
            name="description"
            content="Discover Amway Nutrilite Delicious Shake Mix - a tasty, nutritious shake packed with plant-based protein and essential nutrients to support your wellness journey."
          />
          <meta
            name="keywords"
            content="Amway, Nutrilite, Delicious Shake Mix, Nutrilite Shake Mix, Protein Shake, Amway Shake, Nutrition Shake, Plant Based Shake, Wellness Shake, Amway Nutrilite Shake"
          />
          <meta name="author" content="Amway Nutrilite" />
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#007B48" />
          <meta
            name="application-name"
            content="Nutrilite Delicious Shake Mix"
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Amway Nutrilite Delicious Shake Mix | Tasty Nutrition in Every Sip"
          />
          <meta
            property="og:description"
            content="Discover Amway Nutrilite Delicious Shake Mix - a tasty, nutritious shake packed with plant-based protein and essential nutrients to support your wellness journey."
          />
          <meta
            property="og:site_name"
            content="Amway Nutrilite Delicious Shake Mix"
          />
          <meta property="og:image" content="/logos/logo.png" />
          <meta
            property="og:image:alt"
            content="Amway Nutrilite Delicious Shake Mix logo"
          />
          <meta property="og:locale" content="en_IN" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Amway Nutrilite Delicious Shake Mix | Tasty Nutrition in Every Sip"
          />
          <meta
            name="twitter:description"
            content="Discover Amway Nutrilite Delicious Shake Mix - a tasty, nutritious shake packed with plant-based protein and essential nutrients to support your wellness journey."
          />
          <meta name="twitter:image" content="/logos/logo.png" />
          <meta
            name="twitter:image:alt"
            content="Amway Nutrilite Delicious Shake Mix logo"
          />
        </Head>
        <main
          className={`${inter.className} min-h-svh max-w-md mx-auto bg-white`}
        >
          <Component {...pageProps} />
        </main>
      </MusicProvider>
    </SessionProvider>
  );
}
