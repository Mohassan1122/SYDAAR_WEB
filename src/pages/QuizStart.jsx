import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function QuizStart() {
  // Example quiz data
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      question: "Which of the following is NOT a JavaScript framework?",
      options: ["React", "Angular", "Laravel", "Vue.js"],
      answer: "Laravel",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Styled Sections",
        "Colorful Style System",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      options: ["<style>", "<css>", "<script>", "<design>"],
      answer: "<style>",
    },
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Quiz Attempt</h4>
        <Link to="/quiz" className="btn btn-outline-secondary">
          <i className="fas fa-arrow-left me-2"></i> Back to Quizzes
        </Link>
      </div>

      <div className="card shadow-sm p-4 border-0">
        <h5 className="fw-bold mb-3">
          Question {currentQuestion + 1} of {questions.length}
        </h5>
        <p className="fs-5 mb-4">{questions[currentQuestion].question}</p>

        <div className="list-group">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="list-group-item list-group-item-action py-3"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn btn-success">Submit Quiz</button>
          )}
        </div>
      </div>
    </div>
  );
}
