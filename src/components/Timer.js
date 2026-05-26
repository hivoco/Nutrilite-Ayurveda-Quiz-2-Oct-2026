import { useState, useEffect } from "react";

const Timer = ({
  onTimeout,
  seconds,
  setSeconds,
  index,
  isQuizQuestionLoading,
  autoSubmit,
  selectedOption
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0.0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // NOTE: 11 = last question index (questions.length - 1). Update if quiz length changes.
  // useEffect(() => {
  //   if (seconds === 0 && index < 11 && !isQuizQuestionLoading) {
  //     onTimeout();
  //   }
  //   else if (seconds === 0 && index === 11) {
  //     autoSubmit();
  //   }
  // }, [seconds, isQuizQuestionLoading]);

  useEffect(() => {
    if (seconds === 0 && !isQuizQuestionLoading) {
      if (selectedOption) autoSubmit();
      else onTimeout();
    }
  }, [seconds, isQuizQuestionLoading]);

  return `00:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default Timer;
