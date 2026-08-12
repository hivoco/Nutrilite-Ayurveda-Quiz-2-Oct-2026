import Layout from "@/components/Layout";
import ProductImageSlider from "@/components/ProductImageSlider";
import SplashScreen from "@/components/SplashScreen";
import { useMusic } from "@/context/MusicContext";
import { ArrowRight, CircleCheck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const App = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enableMusic } = useMusic();
  const [displaySplash, setDisplaySplash] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [Name, setName] = useState("");

  // Name uniqueness (only used when session exists)
  const [isExit, setIsExit] = useState(null);
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [debouncedName, setDebouncedName] = useState("");

  const sessionId = searchParams.get("session") || "";
  const hasSession = !!sessionId;

  useEffect(() => {
    if (sessionId) {
      sessionStorage.setItem("session", sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    setTimeout(() => setDisplaySplash(false), 3000);
  }, []);

  useEffect(() => {
    if (!displaySplash) {
      setTimeout(() => setAnimation(true), 100);
    }
  }, [displaySplash]);

  // Debounce name input for uniqueness check
  useEffect(() => {
    if (!hasSession) return;
    const handler = setTimeout(() => setDebouncedName(Name), 500);
    return () => clearTimeout(handler);
  }, [Name, hasSession]);

  // Check name uniqueness within session
  useEffect(() => {
    if (!hasSession) return;
    if (!debouncedName.trim()) {
      setIsExit(null);
      return;
    }
    setIsCheckingName(true);
    fetch(
      `/api/is_user_exit?name=${encodeURIComponent(debouncedName.trim())}&session_id=${encodeURIComponent(sessionId)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setIsExit(data.is_user_exist);
        setIsCheckingName(false);
      })
      .catch(() => {
        setIsCheckingName(false);
        setIsExit(null);
      });
  }, [debouncedName, hasSession, sessionId]);

  const generateUserId = () => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Can continue: if session, name must be available; if no session, just need a name
  const canContinue = hasSession
    ? Name.trim() && isExit === false
    : !!Name.trim();

  const goForward = () => {
    if (!canContinue) return;
    sessionStorage.setItem("name", Name.trim());
    const newUserId = generateUserId();
    sessionStorage.setItem("userId", newUserId);
    router.push(
      `/quiz?language=english&user_id=${newUserId}&session=${sessionId}`,
    );
  };

  const handleArrowClick = () => {
    enableMusic();
    setShowRegister(true);
  };

  const getStatusIcon = () => {
    if (!Name.trim() || !hasSession) return null;
    if (isCheckingName)
      return <span className="text-primary animate-pulse">...</span>;
    if (isExit === true)
      return <X size={20} className="text-red-500" strokeWidth={1.5} />;
    if (isExit === false)
      return (
        <CircleCheck
          size={20}
          className="text-white fill-primary"
          strokeWidth={1.5}
        />
      );
    return null;
  };

  if (displaySplash) {
    return (
      <Layout diffTopImage={true} animation={false}>
        <SplashScreen />
      </Layout>
    );
  }

  return (
    <Layout
      // className="bg-black"
      bgImage={showRegister ? "/bg/bg-2.jpg" : "/bg/bg.png"}
      bottomImage={showRegister ? "/images/quiz/leaves.png" : undefined}
      animation={animation}
    >
      <div className="relative h-full w-full z-50 overflow-hidden flex flex-col">
        <div
          className={`flex items-center justify-center gap-3 overflow-hidden ${
            showRegister ? "pt-[5vh] pb-[2vh]" : "pt-[8vh] pb-[5vh]"
          }
            transition-all duration-1000 ease-in-out ${
              animation
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0"
            }
          `}
        >
          <Image
            src={showRegister ? "/logos/logo-inline.png" : "/logos/logo.png"}
            width={260}
            height={60}
            alt="Amway Nutrilite Plant Protein logo"
            priority={true}
          />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div
            className={`relative  mx-auto w-fit transition-all duration-700 ease-in-out ${
              showRegister ? "h-0" : "h-[45vh] tall:h-[50vh]"
            } ${animation ? "translate-y-0 opacity-100" : "translate-y-30 opacity-0"}`}
          >
            {/* {showRegister && <ProductImageSlider />} */}
          </div>

          {!showRegister && (
            <button
              onClick={handleArrowClick}
              className={`  flex w-full justify-center transition-all duration-1000 ease-in-out ${
                animation
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <span className="w-16 h-16 flex items-center justify-center border-2 bg-white/20 backdrop-blur-xs border-white rounded-full text-white mt-[4vh] cursor-pointer hover:bg-white hover:text-primary transition-colors">
                <ArrowRight size={32} strokeWidth={2} />
              </span>
            </button>
          )}

          {showRegister && (
            <section
              className={`flex flex-1 min-h-0 w-4/5 mx-auto flex-col gap-[2.5vh] mt-2 transition-all duration-700 delay-200 ease-in-out   ${
                showRegister
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >

              <Image
                className="h-[36vh] max-h-[330px] w-auto object-contain shrink-0 mx-auto"
                src="/images/products/image.png"
                width={300}
                height={250}
                alt="nutrilite ayurveda product"
                priority={true}
                quality={100}
              />

              <div className="flex flex-col gap-2 items-center">
                <h1 className="font-bold text-2xl/7 uppercase tracking-wide text-primary text-center">
                  User Registration
                </h1>
              </div>

              <div className="w-full flex flex-col gap-2 justify-center">
                <input
                  type="text"
                  enterKeyHint="enter"
                  inputMode="text"
                  placeholder="Your Name"
                  className="font-light text-lg/6 text-center align-middle text-primary uppercase tracking-wide py-4 px-5 rounded-xl border border-primary placeholder:text-primary/70 bg-primary/5"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && canContinue && goForward()
                  }
                />
                <label
                  className={`font-medium flex items-center justify-center gap-1 text-sm/4 uppercase tracking-wide text-center ${
                    !hasSession || !Name.trim() || isExit === null
                      ? "text-primary/70"
                      : isExit === false
                        ? "text-primary"
                        : "text-red-500"
                  }`}
                >
                  {!hasSession || !Name.trim()
                    ? "Unique ID"
                    : isExit === false
                      ? "Username available"
                      : isExit === true
                        ? "Username already taken in this session"
                        : "Checking availability..."}
                  {getStatusIcon()}
                </label>
              </div>

              <button
                onClick={goForward}
                disabled={!canContinue}
                className={` flex mx-auto mt-auto mb-[calc(min(13.4vw,100px)_+_54px)] shrink-0 transition-all ${canContinue ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                <span
                  className={`w-16 h-16 flex items-center justify-center border rounded-full transition-colors border-primary  ${
                    canContinue
                      ? "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                      : " text-primary/50"
                  }`}
                >
                  <ArrowRight size={32} strokeWidth={2} />
                </span>
              </button>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
