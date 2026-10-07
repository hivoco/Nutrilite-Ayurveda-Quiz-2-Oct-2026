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

const title =
  "Introducing Amway Nutrilite Ayurveda Range that includes Tulsi, Brahmi & Ashwagandha. Every herb has a story. We make sure it's true.";
const description =
  "Take the Nutrilite Ayurveda Quiz on Tulsi, Brahmi & Ashwagandha. Answer 10 questions, score 8 to pass, and see where you rank on the leaderboard.";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <MusicProvider musicUrl="/music/bg.mp3">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta
            name="keywords"
            content="Amway, Nutrilite, Nutrilite Ayurveda, Amway Nutrilite Ayurveda Range, Tulsi, Brahmi, Ashwagandha, Nutrilite Ayurveda Quiz, Ayurvedic Supplements, Herbal Supplements, Ayurvedic Herbs, Amway Ayurveda"
          />
          <meta name="author" content="Amway Nutrilite" />
          <meta name="robots" content="noindex, nofollow" />
          <meta name="theme-color" content="#007B48" />
          <meta name="application-name" content="Nutrilite Ayurveda Quiz" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={siteUrl} />
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
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
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
