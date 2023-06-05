import StartingPage from "./Components/StartingPage";
import QuizPage from "./Components/QuizPage";
import React from "react";
import { useState } from "react";

export default function App() {
  const [started, setStarted] = useState(false);
  const [data, setData] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");

  function startingQuiz() {
    setStarted(true);
  }

  React.useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((error) => console.log(error));
  }, [difficulty]);

  function newGame() {
    setStarted(false);
  }

  return (
    <main>
      {started ? (
        <div className="main-container">
          <QuizPage data={data} started={newGame} />
        </div>
      ) : (
        <StartingPage
          quizStarted={startingQuiz}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      )}
    </main>
  );
}
