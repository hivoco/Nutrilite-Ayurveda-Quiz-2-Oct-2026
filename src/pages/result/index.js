import Layout from "@/components/Layout";
import Image from "next/image";
import { Quantico } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Result() {
  const router = useRouter();
  const score = Number(router.query.score) || 0;
  const total = Number(router.query.total) || 10;
  const session = router.query.session || "";
  const name = router.query.name || "";
  const passThreshold = Math.ceil(total * 0.8);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (score < passThreshold) return;
    setShowCelebration(true);
    const timer = setTimeout(() => setShowCelebration(false), 5 * 1000);
    return () => clearTimeout(timer);
  }, [router.isReady, score, passThreshold]);

  return (
    <Layout bgImage="/bg/bg-2.jpg" bottomImage="/images/quiz/leaves.png">
      <div
        className={` relative  bg-no-repeat bg-cover bg-center  h-svh mx-auto flex flex-col p-7 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {showCelebration && (
          <>
            <img
              src="/images/result/celebration.gif"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full object-contain z-10"
            />

            <img
              src="/images/result/celebration.gif"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -scale-x-100 max-w-full max-h-full object-contain z-10"
            />
          </>
        )}
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 flex-col w-full ">
            {/* Logo - slides from 100px to actual position */}
            <div
              className={`mx-auto w-fit pt-10 transform transition-all duration-1000 ease-out ${
                isLoaded ? "translate-y-0" : "-translate-y-[100px]"
              }`}
            >
              <Image
                src={"/logos/logo-inline.png"}
                alt="Amway Nutrilite Ayurveda logo"
                width={260}
                height={60}
              />
            </div>

            <div className="relative flex justify-center items-center flex-col gap-10 w-full flex-1 ">
              {/* Trophy/Over Image - scales up */}
              <div
                className={` transform transition-all duration-1000 ease-out delay-300 ${
                  isLoaded ? "scale-100" : "scale-75"
                }`}
              >
                <Image
                  priority={true}
                  className="object-contain"
                  src={
                    score >= passThreshold
                      ? "/images/trophy.png"
                      : "/images/result/better-luck-next.png"
                  }
                  alt={
                    score >= passThreshold
                      ? "Trophy for passing the Amway Nutrilite Ayurveda Quiz"
                      : "Better luck next time on the Amway Nutrilite Ayurveda Quiz"
                  }
                  width={score >= passThreshold ? 220 : 190}
                  height={score >= passThreshold ? 240 : 152}
                />

                {/* {
                score < passThreshold &&  <Image
                  className="object-contain absolute -top-5 right-0 "
                  src={"/images/question.png"}
                  alt="Result"
                  width={80}
                  height={80}
                />
               } */}
              </div>

              {/* Result Card - slides up from bottom */}

              <div
                className={`rounded-2xl p-7 w-full  shadow-sm text-center transform transition-all  text-primary duration-1000 ease-out delay-500 bg-primary/20 ${
                  isLoaded ? "translate-y-0" : "translate-y-[100px]"
                }`}
              >
                <h2 className="text-6xl font-bold">
                  {score}/{total}
                </h2>
                <h4 className={`${quantico.className} text-2xl font-bold mt-2`}>
                  {score >= passThreshold
                    ? "CONGRATULATIONS!"
                    : "Almost There!"}
                </h4>
                <p className="text-base mt-1">
                  {score >= passThreshold
                    ? "You passed. You are eligible for your Achievement Certificate."
                    : "You didn’t meet the passing criteria this time. "}
                </p>
              </div>
            </div>
          </div>

          {/* Button - slides up from bottom */}
          <div
            className={`flex  flex-col gap-6 transform transition-all duration-1000 ease-out delay-700 ${
              isLoaded ? "translate-y-0" : "translate-y-[100px]"
            }`}
          >
            {/* {session && (
              <button
                onClick={() => router.push(`/leaderboard?session=${session}&name=${encodeURIComponent(name)}`)}
                className="w-full rounded-lg font-medium text-xl/6 text-white text-center py-3 transition-all bg-primary"
              >
                View Leaderboard
              </button>
            )} */}

            {score < passThreshold ? (
              <button
                onClick={() =>
                  router.push(session ? `/?session=${session}` : "/")
                }
                className="w-full rounded-lg border border-white font-medium text-xl/6 text-white text-center py-3 transition-all backdrop-blur-sm bg-primary"
              >
                Play Again
              </button>
            ) : (
              <a
                href="/docs/certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg border border-white font-medium text-xl/6 text-white text-center py-3 transition-all backdrop-blur-sm bg-primary"
              >
                Download Your Certificate
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Result;
