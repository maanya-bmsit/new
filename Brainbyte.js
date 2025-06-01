const questions = {
  HTML: [
    {
      q: "What does HTML stand for?",
      a: "HyperText Markup Language",
      options: [
        "HyperText Machine Language",
        "HyperText Markup Language",
        "HyperTransfer Markup Language",
        "None of the above",
      ],
    },
    {
      q: "Choose the correct HTML tag for the largest heading.",
      a: "<h1>",
      options: ["<h6>", "<h1>", "<heading>", "<head>"],
    },
    {
      q: "What is the correct HTML element for inserting a line break?",
      a: "<br>",
      options: ["<break>", "<lb>", "<br>", "<line>"],
    },
    {
      q: "Which of the following HTML elements is used to define an unordered list?",
      a: "<ul>",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
    },
    {
      q: "Which attribute is used to specify an image's alternate text?",
      a: "alt",
      options: ["alt", "title", "src", "text"],
    },
  ],
  CSS: [
    {
      q: "What does CSS stand for?",
      a: "Cascading Style Sheets",
      options: [
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets",
      ],
    },
    {
      q: "Which property is used to change the background color of an element?",
      a: "background-color",
      options: ["background-color", "color", "bg-color", "background"],
    },
    {
      q: "Which CSS property controls the text size?",
      a: "font-size",
      options: ["text-size", "font-size", "size", "text-style"],
    },
    {
      q: "How do you select an element with the class 'example' in CSS?",
      a: ".example",
      options: [".example", "#example", "example", "class: example"],
    },
    {
      q: "What is the default value of the position property in CSS?",
      a: "static",
      options: ["static", "relative", "absolute", "fixed"],
    },
  ],
  JavaScript: [
    {
      q: "What does the 'var' keyword declare in JavaScript?",
      a: "A variable",
      options: ["A constant", "A function", "A variable", "An object"],
    },
    {
      q: "How do you create a function in JavaScript?",
      a: "function myFunction()",
      options: [
        "create function myFunction()",
        "function myFunction()",
        "function: myFunction()",
        "function = myFunction()",
      ],
    },
    {
      q: "Which of the following is the correct syntax for an if statement in JavaScript?",
      a: "if (condition) {}",
      options: [
        "if (condition) {}",
        "if condition {}",
        "if {condition}",
        "if (condition):",
      ],
    },
    {
      q: "How can you add a comment in JavaScript?",
      a: "// This is a comment",
      options: [
        "# This is a comment",
        "<!-- This is a comment -->",
        "// This is a comment",
        "' This is a comment",
      ],
    },
    {
      q: "Which operator is used for comparison in JavaScript?",
      a: "==",
      options: ["=", "==", "===", ":="],
    },
  ],
  PHP: [
    {
      q: "What does PHP stand for?",
      a: "Hypertext Preprocessor",
      options: [
        "Personal Home Page",
        "Hypertext Preprocessor",
        "HyperText Markup Language",
        "PreHyper Processor",
      ],
    },
    {
      q: "Which of the following is the correct way to declare a variable in PHP?",
      a: "$variable",
      options: ["$variable", "variable$", "var variable", "#variable"],
    },
    {
      q: "How do you connect to a MySQL database in PHP?",
      a: "mysqli_connect()",
      options: [
        "connect_mysql()",
        "mysqli_connect()",
        "db_connect()",
        "connect_database()",
      ],
    },
    {
      q: "Which PHP function is used to get the length of a string?",
      a: "strlen()",
      options: ["length()", "strlen()", "strlength()", "size()"],
    },
    {
      q: "How do you start a PHP block of code?",
      a: "<?php",
      options: ["<?php", "<php>", "<script>", "<phpblock>"],
    },
  ],
};

const category = localStorage.getItem("selectedCategory");
let questionIndex = parseInt(localStorage.getItem("questionIndex")) || 0;
let score = parseInt(localStorage.getItem("score")) || 0;

// Timer for 30 seconds
let timer;

function startTimer() {
  let timeLeft = 30;
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time is up! Moving to the next question.");
      nextQuestion();
    }
  }, 1000);
}

// Function to load a question
function loadQuestion() {
  const questionData = questions[category][questionIndex];
  document.getElementById("question").textContent = questionData.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  // Create options as buttons
  questionData.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("btn", "btn-light", "d-block", "mb-2");

    btn.onclick = () => {
      clearInterval(timer); // Stop the timer when an answer is clicked

      // Disable all buttons after selection
      const buttons = document.querySelectorAll("#options button");
      buttons.forEach((button) => (button.disabled = true));

      // Check the answer and update button color
      if (opt === questionData.a) {
        btn.style.backgroundColor = "green"; // Correct answer
        score++;
        alert("Correct Answer!");
      } else {
        btn.style.backgroundColor = "red"; // Wrong answer
        // Highlight correct answer
        buttons.forEach((button) => {
          if (button.textContent === questionData.a) {
            button.style.backgroundColor = "green"; // Correct answer
          }
        });
        alert("Wrong Answer!");
      }

      // Save score and move to next question
      questionIndex++;
      localStorage.setItem("questionIndex", questionIndex);
      localStorage.setItem("score", score);

      if (questionIndex < questions[category].length) {
        setTimeout(loadQuestion, 1000); // Wait for 1 second before loading the next question
      } else {
        setTimeout(showResult, 1000); // Wait for 1 second before showing the result
      }
    };

    optionsDiv.appendChild(btn);
  });

  startTimer(); // Start the timer when the question is loaded
}

// Function to display the result
function showResult() {
  document.getElementById(
    "quiz-container"
  ).innerHTML = `<h3 id="result">You scored ${score}/${questions[category].length}</h3>`;
  localStorage.removeItem("questionIndex");
  localStorage.removeItem("score");
}

// Function to go to the next question
function nextQuestion() {
  questionIndex++;
  localStorage.setItem("questionIndex", questionIndex);
  if (questionIndex < questions[category].length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Load the first question when the page is ready
document.addEventListener("DOMContentLoaded", loadQuestion);
