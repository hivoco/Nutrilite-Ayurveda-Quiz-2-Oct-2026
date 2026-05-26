import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import Timer from "@/components/Timer";
import VerifyLoading from "@/components/VerifyLoading";
import { ArrowLeft, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// Answer Popup Component
const AnswerPopup = ({ isVisible, isCorrect }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center z-100">
      {isCorrect ? (
        <div className="flex flex-col gap-2 text-center justify-center items-center">
          <Image
            src="/images/quiz/right.png"
            alt="Correct answer in the Amway Nutrilite Plant Protein Quiz"
            width={150}
            height={120}
            className="w-full object-contain"
            priority
          />
          <h3 className="font-bold text-xl text-white">
            Wohoo! <br /> You got it right.
          </h3>
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-center justify-center items-center">
          <Image
            src="/images/quiz/oops-white.png"
            alt="Wrong answer in the Amway Nutrilite Plant Protein Quiz"
            width={160}
            height={144}
            className="w-full object-contain"
            priority
          />
          <h3 className="font-bold text-2xl text-white">Try the next one.</h3>
        </div>
      )}
    </div>
  );
};

const Quiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctOptionValue, setCorrectOptionValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [animation, setAnimation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupIsCorrect, setPopupIsCorrect] = useState(false);
  const [hasFetchedQuestions, setHasFetchedQuestions] = useState(false);
  const [score, setScore] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const language = searchParams.get("language") || "English";
  const user_id = searchParams.get("user_id") || "";

  useEffect(() => {
    const userName = sessionStorage.getItem("name");
    const storedUserId = sessionStorage.getItem("userId");
    setName(userName);
    setUserId(storedUserId || user_id);

    if (!userName) {
      router.replace("/");
    }
  }, [router, user_id]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setAnimation(true), 500);
    }
  }, [isLoading]);

  useEffect(() => {
    if (
      router.isReady &&
      !isQuizCompleted &&
      name &&
      language &&
      !hasFetchedQuestions
    ) {
      fetchQuestions();
    }
  }, [router.isReady, language, isQuizCompleted, name, hasFetchedQuestions]);

  // Auto-close popup and move to next question
  useEffect(() => {
    if (!showPopup) return;

    const timer = setTimeout(() => {
      setShowPopup(false);

      // Move to next question after popup closes
      // const nextTimer = setTimeout(() => {
      //   if (!selectedOption || isQuizCompleted) return;

      //   if (audio) {
      //     audio.pause();
      //   }
      //   setSeconds(30);

      //   resetState();
      //   if (currentQuestionIndex < questions.length - 1) {
      //     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      //   } else {
      //     if (!isQuizCompleted) {
      //       completeQuiz();
      //     }
      //   }
      // }, 100);

      return () => clearTimeout(nextTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showPopup]);

  const fetchQuestions = async () => {
    if (isQuizCompleted || hasFetchedQuestions) return;

    try {
      const response = await fetch(
        `/api/get_all_question?lang=${language}&type=nfsu`,
      );

      setHasFetchedQuestions(true);

      if (!response.ok) {
        throw new Error("Failed to load questions");
      }

      const data = await response.json();
      if (data?.quiz?.length > 0) {
        setQuestions(data.quiz);
      } else {
        setHasError(true);
        setErrorMessage(
          "Unable to load quiz questions. Please try again later.",
        );
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage("Unable to load quiz questions. Please try again later.");
    }
  };

  const handleSkip = () => {
    if (isQuizCompleted || selectedOption) return;

    if (currentQuestionIndex < questions.length - 1) {
      setSeconds(30);
      resetState();
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (isQuizCompleted || !selectedOption) return;

    setSeconds(30);
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (isQuizCompleted) return;

    resetState();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    if (isQuizCompleted) return;
    setIsQuizCompleted(true);

    const session =
      new URLSearchParams(window.location.search).get("session") || "";

    // Save result to database
    try {
      await fetch("/api/insert_record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          user_id: userId,
          session_id: session,
          score: score,
          total_questions: questions.length,
        }),
      });
    } catch (err) {
      console.error("Error saving result:", err);
    }

    // Navigate to result page with score
    setTimeout(() => {
      router.push(
        `/result?score=${score}&total=${questions.length}&session=${session}&name=${encodeURIComponent(name)}`,
      );
    }, 150);
  };

  const resetState = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setCorrectOptionValue(null);
    setIsImageZoomed(false);
  };

  const verifyAnswer = async (userAnswer) => {
    if (!questions[currentQuestionIndex] || isQuizCompleted) return;
    if (seconds === 2) return;
    if (selectedOption) return;

    const body = {
      lang: language,
      user_answer: userAnswer,
      question_id: questions[currentQuestionIndex].question_id,
      user_id: userId,
      type: "nfsu",
    };

    const startTime = Date.now();
    try {
      setIsLoading(true);
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 800;

      setTimeout(
        () => {
          setIsLoading(false);

          // Update score if answer is correct
          if (data.is_correct) {
            setScore((prevScore) => prevScore + 1);
            new Audio("/music/rightAnswer.mp3").play().catch(() => {});
          } else {
            new Audio("/music/wronganswer.mp3").play().catch(() => {});
          }

          // Show popup
          setPopupIsCorrect(data.is_correct);
          setShowPopup(true);

          setIsAnswerCorrect(data.is_correct);
          setCorrectOptionValue(data.correct_option_value);
          setSelectedOption(userAnswer);
        },
        Math.max(0, minLoadingTime - elapsedTime),
      );
    } catch (error) {
      setIsLoading(false);
      console.error("Error validating answer:", error);
    }
  };

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    verifyAnswer(option);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!name) return null;
  if (!currentQuestion) {
    return <Loading />;
  }

  return (
    <Layout>
      <div
        className={`pt-[3.5vh] pb-[8vh] h-svh max-w-md mx-auto grid grid-rows-[auto_1fr]  overflow-y-auto transition-opacity duration-500 ease-in-out ${
          animation ? "opacity-100" : "opacity-0"
        }`}
      >
        <section className="w-full flex flex-col gap-1.5 px-6 relative z-50 ">
          <nav className="w-full flex items-center justify-between relative ">
            <div
              className={`flex flex-col justify-between transition-all duration-1000 ease-in-out ${
                animation ? "translate-x-0" : "-translate-x-30"
              }`}
            >
              <div className="flex gap-3 self-start">
                <Link className="cursor-pointer" href={"/"}>
                  <ArrowLeft size={24} />
                </Link>

                <span className="text-primary font-semibold text-lg/5.5">
                  {currentQuestionIndex + 1}/{questions.length}
                </span>
              </div>
            </div>

            <div
              className={`flex flex-row-reverse gap-2.5 transition-all duration-1000 ease-in-out ${
                animation ? "translate-x-0" : "translate-x-30"
              }`}
            >
              <span className="w-8.5 h-8.5 flex items-center justify-center rounded-full bg-transparent outline-1 outline-primary bg-white">
                <Link className="cursor-pointer" href={"/"}>
                  <LogOut className="text-primary" size={16} />
                </Link>
              </span>
            </div>
          </nav>

          {/* <ProgressBar
            animation={animation}
            count={currentQuestionIndex + 1}
            totalSteps={questions.length}
          /> */}
        </section>

        <div className="px-3 ">
          <section
            className={`w-full  h-full flex flex-col justify-between ${currentQuestion.image_url ? "gap-3" : "gap-6"} relative z-50 mt-6 pb-6  backdrop-blur-xs border border-text-primary rounded-2xl px-3`}
          >
            <span className="absolute top-4  right-0  -translate-y-1/2 bg-transparent text-primary font-inter font-medium  text-sm  min-w-12">
              {!isLoading && (
                <Timer
                  onTimeout={handleSkip}
                  seconds={seconds}
                  setSeconds={setSeconds}
                  index={currentQuestionIndex}
                  isQuizQuestionLoading={!currentQuestion}
                  autoSubmit={handleSubmit}
                  selectedOption={selectedOption}
                />
              )}
            </span>

            <div
              className={`font-semibold flex flex-col justify-center items-center gap-3 text-lg/5.5
                 tracking-wide text-primary p-3.5 rounded-2xl mt-3 tall:mt-6`}
            >
              <span className="text-left mr-auto ml-0 ">
                {currentQuestion.question}
              </span>

              {currentQuestion.image_url && (
                <Image
                  src={currentQuestion.image_url}
                  alt={`Amway Nutrilite Plant Protein Quiz – question ${currentQuestion.question_id} illustration`}
                  width={320}
                  height={200}
                  onClick={() => setIsImageZoomed(true)}
                  className={`w-full max-w-72 tall:max-w-sm mx-auto h-auto rounded-xl object-contain cursor-zoom-in ${
                    currentQuestion.question_id === 12
                      ? "max-h-20 tall:max-h-none "
                      : ""
                  }`}
                  priority
                />
              )}
            </div>

            <div
              className={`w-full flex flex-col gap-3 space-y-1.5 tall:space-y-4  transition-all duration-700 ease-in-out ${
                animation ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {currentQuestion?.options?.map((option, index) => {
                const optionText = option.text || option;
                const isSelected =
                  selectedOption?.trim().toLowerCase() ===
                  optionText?.trim().toLowerCase();
                const isCorrectOption =
                  correctOptionValue?.trim().toLowerCase() ===
                  optionText?.trim().toLowerCase();
                return (
                  <div key={index} className="relative isolate">
                    <div className="absolute inset-0 bg-primary/10 rounded-xl skew-y-6 -z-10" />

                    <button
                      onClick={() => handleOptionClick(optionText)}
                      disabled={selectedOption !== null}
                      className={` relative z-10
                      flex items-center justify-between
                      p-5 py-3 tall:py-6 rounded-xl
                      capitalize font-normal text-left text-sm text-black  w-full
                      transition-all
                    ${
                      !selectedOption
                        ? "cursor-pointer hover:bg-white"
                        : "cursor-not-allowed"
                    }
                    ${
                      isSelected
                        ? isAnswerCorrect
                          ? "!border-[#066A37] !bg-dark-green !text-white"
                          : "!bg-[#ED0000] !border-[#ED0000] !text-white"
                        : isCorrectOption && selectedOption && !isAnswerCorrect
                          ? "!border-[#066A37] !bg-dark-green !text-white"
                          : "bg-white"
                    }
                `}
                    >
                      {optionText}

                      {isSelected && isAnswerCorrect && (
                        <Image
                          src="/svg/tick-circle-solid.svg"
                          width={24}
                          height={24}
                          alt="Correct answer indicator"
                          priority
                        />
                      )}

                      {!isSelected &&
                        isCorrectOption &&
                        selectedOption &&
                        !isAnswerCorrect && (
                          <Image
                            src="/svg/tick-circle-solid.svg"
                            width={24}
                            height={24}
                            alt="Correct answer indicator"
                            priority
                          />
                        )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              className={`w-full flex items-center justify-between gap-5  relative z-50 mt-4 transition-all duration-[1200ms] ease-in-out ${
                animation ? "translate-y-0" : "translate-y-50"
              }`}
            >
              <button
                onClick={handleSkip}
                disabled={
                  isQuizCompleted ||
                  selectedOption !== null ||
                  currentQuestionIndex + 1 >= questions.length
                }
                style={
                  selectedOption !== null ||
                  currentQuestionIndex + 1 >= questions.length
                    ? {
                        background: "#C0DDE9B2",
                        boxShadow: "0px 2px 2px 0px #C0DDE933",
                      }
                    : undefined
                }
                className={`w-1/2 md:w-[154px] rounded-full font-semibold text-xl/6 text-center py-3 transition-all text-primary  ${
                  selectedOption !== null ||
                  currentQuestionIndex + 1 >= questions.length
                    ? "border border-white cursor-not-allowed  opacity-50"
                    : " bg-primary! text-white  cursor-pointer"
                }`}
              >
                Skip
              </button>

              <button
                onClick={handleSubmit}
                disabled={isQuizCompleted || !selectedOption}
                style={
                  !selectedOption
                    ? {
                        background: "#C0DDE9B2",
                        boxShadow: "0px 2px 2px 0px #C0DDE933",
                      }
                    : undefined
                }
                className={`w-1/2 md:w-[154px] rounded-full font-semibold text-xl/6 text-center py-3 transition-all ${
                  selectedOption
                    ? "text-white bg-primary cursor-pointer"
                    : "text-primary border border-white cursor-not-allowed opacity-50"
                }`}
              >
                {currentQuestionIndex + 1 >= questions.length
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </section>
        </div>

        {isLoading && <VerifyLoading />}

        {/* Answer Popup */}
        <AnswerPopup isVisible={showPopup} isCorrect={popupIsCorrect} />

        {/* Zoomed Image Overlay */}
        {isImageZoomed && currentQuestion.image_url && (
          <div
            onClick={() => setIsImageZoomed(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-110 cursor-zoom-out p-4"
          >
            <Image
              src={currentQuestion.image_url}
              alt={`Question ${currentQuestion.question_id} illustration`}
              width={800}
              height={600}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
              priority
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;
