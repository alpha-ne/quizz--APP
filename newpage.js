"use client";
import React from "react";

function MainComponent() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const themes = {
    light: {
      background: "#f0f2f5",
      backgroundImage:
        "url('https://img.freepik.com/free-vector/abstract-paper-style-white-background_23-2148982620.jpg')",
      card: "#ffffff",
      text: "#333333",
      border: "#dddddd",
      questionColors: ["#e6f3ff", "#fff2e6", "#e6ffe6", "#ffe6e6"],
      results: {
        high: { color: "#1a5f1a", background: "#e6ffe6" },
        medium: { color: "#8b5e00", background: "#fff2e6" },
        low: { color: "#8b0000", background: "#ffe6e6" },
      },
    },
    dark: {
      background: "#1a1a1a",
      backgroundImage:
        "url('https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg')",
      card: "#2d2d2d",
      text: "#ffffff",
      border: "#404040",
      questionColors: ["#1a2733", "#332b1a", "#1a331a", "#331a1a"],
      results: {
        high: { color: "#90EE90", background: "#1a331a" },
        medium: { color: "#FFB347", background: "#332b1a" },
        low: { color: "#FF6B6B", background: "#331a1a" },
      },
    },
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Madrid", "Paris"],
      correctAnswer: "Paris",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
      correctAnswer: "Da Vinci",
    },
  ];

  const getResultData = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) {
      return {
        color: currentTheme.results.high.color,
        background: currentTheme.results.high.background,
        message: "Perfect Score! You're Amazing! 🎉",
        showCelebration: true,
      };
    }
    if (percentage >= 75) {
      return {
        color: currentTheme.results.high.color,
        background: currentTheme.results.high.background,
        message: "Excellent! You're a genius!",
        showCelebration: false,
      };
    }
    if (percentage >= 50) {
      return {
        color: currentTheme.results.medium.color,
        background: currentTheme.results.medium.background,
        message: "Good job! Keep practicing!",
        showCelebration: false,
      };
    }
    return {
      color: currentTheme.results.low.color,
      background: currentTheme.results.low.background,
      message: "Keep trying, you can do better!",
      showCelebration: false,
    };
  };

  const [backgroundColor, setBackgroundColor] = React.useState(
    currentTheme.background
  );

  React.useEffect(() => {
    if (showScore) {
      setBackgroundColor(getResultData(score, questions.length).background);
    } else {
      setBackgroundColor(
        currentTheme.questionColors[
          currentQuestion % currentTheme.questionColors.length
        ]
      );
    }
  }, [currentQuestion, showScore, score, isDarkMode]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setBackgroundColor(currentTheme.questionColors[0]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(74, 222, 128, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(74, 222, 128, 0.6);
          }
          100% {
            box-shadow: 0 0 5px rgba(74, 222, 128, 0.2);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: backgroundColor,
          backgroundImage: currentTheme.backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "all 0.5s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: isDarkMode ? "#ffffff" : "#333333",
              color: isDarkMode ? "#333333" : "#ffffff",
              cursor: "pointer",
              transition: "all 0.3s ease",
              animation: "pulse 2s infinite",
            }}
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            backgroundColor: currentTheme.card,
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: currentTheme.text,
              marginBottom: "20px",
              fontSize: "2.5rem",
              fontWeight: "bold",
              animation: "bounce 2s infinite",
            }}
          >
            Quiz
          </h1>

          {showScore ? (
            <div
              style={{
                textAlign: "center",
                animation: "fadeIn 1s ease-out",
              }}
            >
              <h2
                style={{
                  color: getResultData(score, questions.length).color,
                  marginBottom: "20px",
                  animation:
                    score === questions.length ? "bounce 1s infinite" : "none",
                }}
              >
                {getResultData(score, questions.length).message}
              </h2>
              {getResultData(score, questions.length).showCelebration && (
                <div
                  style={{
                    marginBottom: "20px",
                    animation: "bounce 1s infinite",
                  }}
                >
                  <img
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY1YjMyZGQyYmQ5MjBkYzY4YjY5YzM5ZDM4NzE2ZmM1ZTM1ZjM5YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7TKzEQJVWX1yXYiY/giphy.gif"
                    alt="Celebration"
                    style={{
                      width: "200px",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}
              <p
                style={{
                  fontSize: "20px",
                  margin: "20px 0",
                  color: currentTheme.text,
                  animation: "fadeIn 1s ease-out",
                }}
              >
                Your score: {score} out of {questions.length}
              </p>
              <button
                onClick={resetQuiz}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  animation: "pulse 2s infinite",
                }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div
                style={{
                  marginBottom: "20px",
                  animation: "slideIn 0.5s ease-out",
                }}
              >
                <h2
                  style={{
                    marginBottom: "10px",
                    color: currentTheme.text,
                  }}
                >
                  Question {currentQuestion + 1}/{questions.length}
                </h2>
                <p
                  style={{
                    fontSize: "18px",
                    color: currentTheme.text,
                  }}
                >
                  {questions[currentQuestion].question}
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "10px",
                }}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    style={{
                      padding: "10px",
                      border: `2px solid ${currentTheme.border}`,
                      borderRadius: "5px",
                      backgroundColor:
                        selectedAnswer === option
                          ? option === questions[currentQuestion].correctAnswer
                            ? "#4CAF50"
                            : "#ff4444"
                          : currentTheme.card,
                      color:
                        selectedAnswer === option ? "white" : currentTheme.text,
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        animation: `${
                        selectedAnswer === option &&
                        option === questions[currentQuestion].correctAnswer
                          ? "glow 1s infinite"
                          : "fadeIn 0.5s ease-out"
                      }`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  color: currentTheme.text,
                  animation: "fadeIn 0.5s ease-out",
                }}
              >
                <p>Score: {score}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MainComponent;