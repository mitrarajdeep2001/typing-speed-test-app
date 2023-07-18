import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import { useTestMode } from "../Context/TextModeContext";
import Stats from "./Stats";
const wordList = generate(150);

const TypingBox = () => {
  const [wordsArray, setWordsArray] = useState(wordList);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  // const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const {
    startTimer,
    setStartTimer,
    testOver,
    setTestOver,
    intervalID,
    testTime,
    correctChars,
    setCorrectChars,
    graphData
  } = useTestMode();

  //Calculate Word per minute
  const WPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  //Calculate accuracy
  const calculateAcc = () => {
    return Math.round((correctWords / currentWordIndex) * 100);
  };

  //Created a reference for the input
  const inputRef = useRef(null);

  //Created references for all the spans of word
  const wordSpanRef = useMemo(() => {
    return Array(wordList.length)
      .fill(0)
      .map((e) => createRef(null));
  }, [wordsArray]);

  //Created a function for setting the input box to focus
  const focusInput = () => inputRef?.current?.focus();
  useEffect(() => {
    focusInput(); //Sets the input box to focus on initial render
    //Added classlist to the initial character to enable the blinking cursor
    wordSpanRef[0].current.children[0].classList = "current";
  }, [wordSpanRef]);

  //Reset the test
  const resetTest = () => {
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setStartTimer(false);
    setTestOver(false);
    clearInterval(intervalID);
    setWordsArray(generate(150));
    resetWordSpanRefClasslist();
    focusInput();
  };

  //Reset the classlist of wordSpanRef characters
  const resetWordSpanRefClasslist = () => {
    wordSpanRef.map((e) =>
      Array.from(e.current.children).map((j) => (j.classList = ""))
    );
    wordSpanRef[0].current.children[0].classList = "current";
  };

  //Reset the test if user changes the time
  useEffect(() => resetTest(), [testTime]);

  //Handles user input
  const handleUserInput = (e) => {
    //Starts the timer when user gives initial input
    if (!startTimer) {
      setStartTimer(true);
    }
    //Create a reference to all the characters in the array of current word
    const allCurrentChar = wordSpanRef[currentWordIndex].current.children;

    //Handles space and moves the word to the next
    if (e.keyCode === 32) {
      const correctCharsInWord =
        wordSpanRef[currentWordIndex].current.querySelectorAll(".correct");
      if (allCurrentChar.length === correctCharsInWord.length) {
        setCorrectWords(correctWords + 1); //Get no. of correct words
      }
      if (allCurrentChar.length <= currentCharIndex) {
        allCurrentChar[currentCharIndex - 1].classList.remove("current-right");
      } else {
        allCurrentChar[currentCharIndex].classList.remove("current");
        setMissedChars(
          missedChars + (allCurrentChar.length - currentCharIndex)
        ); //Get no. of missed characters
      }
      wordSpanRef[currentWordIndex + 1].current.children[0].classList =
        "current";
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(0);
      return;
    }

    //Handles backspace and moves the cursor to the previous character
    if (e.keyCode === 8) {
      if (currentCharIndex !== 0) {
        //Handles backspace when the word ends
        if (allCurrentChar.length === currentCharIndex) {
          //Removes the extra characters (if any) and moves the cursor back
          if (
            allCurrentChar[currentCharIndex - 1].classList.contains("extra")
          ) {
            allCurrentChar[currentCharIndex - 1].remove();
            allCurrentChar[currentCharIndex - 2].classList += " current-right";
          } else {
            //Handles backspace other than extra character
            allCurrentChar[currentCharIndex - 1].classList = "current";
          }
          setCurrentCharIndex(currentCharIndex - 1);
          return;
        }
        //Handles backspace in between the word
        allCurrentChar[currentCharIndex].classList = "";
        allCurrentChar[currentCharIndex - 1].classList = "current";
        setCurrentCharIndex(currentCharIndex - 1);
      }
      return;
    }

    //Handles extra characters other than space
    if (allCurrentChar.length === currentCharIndex) {
      const newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.classList = "incorrect extra current-right";
      allCurrentChar[currentCharIndex - 1].classList.remove("current-right");
      wordSpanRef[currentWordIndex].current.appendChild(newSpan);
      setCurrentCharIndex(currentCharIndex + 1);
      setExtraChars(extraChars + 1); //Get no. of extra characters
      return;
    }

    //Checks for correct and incorrect character
    if (e.key === allCurrentChar[currentCharIndex].innerText) {
      allCurrentChar[currentCharIndex].classList = "correct";
      setCorrectChars(correctChars + 1); //Get no. of correct characters
    } else {
      allCurrentChar[currentCharIndex].classList = "incorrect";
      setIncorrectChars(incorrectChars + 1); //Get no. of incorrect characters
    }

    //Moves the cursor to the next character
    if (currentCharIndex + 1 === allCurrentChar.length) {
      allCurrentChar[currentCharIndex].classList += " current-right";
    } else {
      allCurrentChar[currentCharIndex + 1].classList = "current";
    }
    setCurrentCharIndex(currentCharIndex + 1);
  };
  return (
    <div>
      {/* Attached onClick event listener on TypingBox to set the input box on focus */}
      {testOver ? (
        <Stats
          WPM={WPM()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          extraChars={extraChars}
          missedChars={missedChars}
          graphData={graphData}
        />
      ) : (
        <div className="type-box" onClick={() => focusInput()}>
          <div className="words">
            {wordsArray.map((word, i) => (
              <span className="word" key={i} ref={wordSpanRef[i]}>
                {word.split("").map((char, i) => (
                  <span key={i}>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      {!testOver && <input
        type="text"
        onKeyDown={handleUserInput}
        className="handle-input"
        ref={inputRef}
      />}
    </div>
  );
};

export default TypingBox;
