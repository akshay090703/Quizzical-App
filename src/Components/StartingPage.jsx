import { useEffect, useState } from "react";
import "../StartingPage.css";

export default function StartingPage(props) {
  function handleChange(event) {
    console.log(event.target.value);
    props.setDifficulty(event.target.value);
  }

  return (
    <main className="container">
      <div className="upper-style"></div>
      <div className="content">
        <h1 className="title">Quizzical</h1>
        <p className="sub-text">Making Quizzes fun and interesting</p>
        <select
          id="difficulty"
          value={props.difficulty}
          onChange={handleChange}
          name="difficulty"
          className="difficulty"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="start-btn" onClick={props.quizStarted}>
          Start Quiz
        </button>
      </div>
      <div className="lower-style"></div>
    </main>
  );
}
