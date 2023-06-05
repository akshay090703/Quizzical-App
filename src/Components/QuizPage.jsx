import { decode } from "html-entities";
import "../QuizPage.css";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

export default function QuizPage(props) {
  const [selectedOption, setSelectedOption] = useState({});
  const [shuffledData, setShuffledData] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // console.log(Object.keys(selectedOption).length);
  // console.log(props.data);

  useEffect(() => {
    // Shuffle options for each question when the component mounts
    const shuffledData = props.data.map((element) => {
      let optionsArr = element.incorrect_answers.concat(element.correct_answer);
      for (let i = optionsArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsArr[i], optionsArr[j]] = [optionsArr[j], optionsArr[i]];
      }
      return {
        ...element,
        optionsArr,
      };
    });
    setShuffledData(shuffledData);
  }, [props.data]);

  const handleOptionClick = (questionIndex, option) => {
    setSelectedOption((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: option,
    }));
  };

  const handleCheckAnswersBtn = () => {
    let count = 0;
    if (Object.keys(selectedOption).length === 5) {
      for (let i = 0; i < shuffledData.length; i++) {
        if (shuffledData[i].correct_answer === selectedOption[i]) {
          count++;
        }
      }
      setCorrectAnswers(count);
      setCheckAnswer(true);
    } else {
      alert("Please answer all the questions");
    }
  };

  const handleNewGameBtn = () => {
    setSelectedOption({});
    setShuffledData([]);
    setCheckAnswer(false);
    setCheckAnswer(0);
    props.started();
  };

  const quizComponent = shuffledData.map((element, questionIndex) => {
    const isCorrect = selectedOption[questionIndex] === element.correct_answer;
    return (
      <div className="question-container" key={nanoid()}>
        <p className="question">{decode(element.question)}</p>

        {element.optionsArr.map((option) =>
          checkAnswer ? (
            <div
              className={`option-el unselected-options ${
                selectedOption[questionIndex] === option
                  ? isCorrect
                    ? "correct-answer"
                    : "wrong-answer "
                  : ""
              }`}
              key={nanoid()}
            >
              {decode(option)}
            </div>
          ) : (
            <div
              className={`option-el ${
                selectedOption[questionIndex] === option ? "selected" : ""
              }`}
              key={nanoid()}
              onClick={() => handleOptionClick(questionIndex, option)}
            >
              {decode(option)}
            </div>
          )
        )}
      </div>
    );
  });

  return (
    <div>
      <div className="upper-quiz-style"></div>
      <main>{quizComponent}</main>
      <div className="lower-quiz-style"></div>
      <div className="btn">
        {checkAnswer && (
          <p className="results">
            You scored {correctAnswers}/5 correct answers
          </p>
        )}
        {!checkAnswer ? (
          <button className="check-answers" onClick={handleCheckAnswersBtn}>
            Check Answers
          </button>
        ) : (
          <button className="check-answers" onClick={handleNewGameBtn}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
