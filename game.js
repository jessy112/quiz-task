const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const button = document.getElementById("btn");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
  {
    question: "what year was Javascript created?",
    choice1: "1883",
    choice2: "1998",
    choice3: "1989",
    choice4: "1995",
    answer: 4,
  },
  {
    question: "which HTML tag holds the JavaScript?",
    choice1: "<p>",
    choice2: "<h1>",
    choice3: "<script>",
    choice4: "<button>",
    answer: 3,
  },

  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "alert('Hello World');",
    choice2: "msgBox('Hello World');",
    choice3: "alertBox('Hello World');",
    choice4: "msg('Hello World');",
    answer: 1,
  },

  {
    question: "who created JavaScript?",
    choice1: "M.K.O Abiola",
    choice2: "Brendan Eich",
    choice3: "Aldolpus Hitler",
    choice4: "Napoleon",
    answer: 2,
  },

  {
    question:
      "what is the correct syntax of referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script src='xxx.js'>",
    choice3: "<script name='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 2,
  },
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

const startGame = () => {
  (questionCounter = 0), (score = 0);
  availableQuestion = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS) {localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestion.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  const number = choice.dataset["number"];
  const val = choice.parentElement;

  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);
    button.addEventListener("click", () => {
      selectedChoice.parentElement.classList.remove(classToApply);
    });
     if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();