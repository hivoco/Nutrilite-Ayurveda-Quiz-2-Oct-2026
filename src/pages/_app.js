import { SessionProvider } from "@/context/SessionContext";
import { MusicProvider } from "@/context/MusicContext";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
});

// Social crawlers (WhatsApp, Facebook, LinkedIn, X) ignore relative image
// paths, so share images must be absolute. Set NEXT_PUBLIC_SITE_URL per deploy.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nfsu-nsts.thefirstimpression.ai";
const shareImage = `${siteUrl}/logos/logo.png`;

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <MusicProvider musicUrl="/music/bg.mp3">
        <Head>
          <title>
            {
              "Introducing Amway Nutrilite Ayurveda Range that includes Shigru, Kalamegha & Garcinia. Every herb has a story. We make sure it's true."
            }
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta
            name="keywords"
            content="Amway, Nutrilite, Nutrilite Ayurveda, Amway Nutrilite Ayurveda Range, Shigru, Kalamegha, Garcinia, Ayurvedic Supplements, Herbal Supplements, Ayurvedic Herbs, Amway Ayurveda"
          />
          <meta name="author" content="Amway Nutrilite" />
          <meta name="robots" content="noindex, nofollow" />
          <meta name="theme-color" content="#007B48" />
          <meta name="application-name" content="Nutrilite Ayurveda Range" />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Introducing Amway Nutrilite Ayurveda Range that includes Shigru, Kalamegha & Garcinia. Every herb has a story. We make sure it's true."
          />
          <meta
            property="og:site_name"
            content="Amway Nutrilite Ayurveda Range"
          />
          <meta property="og:image" content={shareImage} />
          <meta
            property="og:image:alt"
            content="Amway Nutrilite Ayurveda Range logo"
          />
          <meta property="og:locale" content="en_IN" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Introducing Amway Nutrilite Ayurveda Range that includes Shigru, Kalamegha & Garcinia. Every herb has a story. We make sure it's true."
          />
          <meta name="twitter:image" content={shareImage} />
          <meta
            name="twitter:image:alt"
            content="Amway Nutrilite Ayurveda Range logo"
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
