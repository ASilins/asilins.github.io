const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    //Question one
    question:
      "As the disease became more ____ in the region, a medical emergency was announced. (Spread)",
    choice1: "spreaded",
    choice2: "widespread",
    choice3: "unspreaded",
    choice4: "widespred",
    answer: 2,
  },
  {
    //Question two
    question:
      "The wren's Latin name, which means 'cave dweller', comes from its ____ to seek out dark places. (Tend)",
    choice1: "tendency",
    choice2: "tended",
    choice3: "tending",
    choice4: "tendencie",
    answer: 1,
  },
  {
    //Question three
    question:
      "The earthquake was so destructive that local maps needed to be ____. (Date)",
    choice1: "redate",
    choice2: "updateing",
    choice3: "updating",
    choice4: "updated",
    answer: 4,
  },
  {
    //Question four
    question:
      "Once the scientists were sure the islands were ____, they disembarked and began their studies. (Inhabit)",
    choice1: "habited",
    choice2: "inhabited",
    choice3: "uninhabited",
    choice4: "unhabited",
    answer: 3,
  },
  {
    //Question five
    question:
      "You can pay funds into this account but that money will not be ____ for at least a year. (Draw)",
    choice1: "drawed",
    choice2: "withdrawable",
    choice3: "withdrawn",
    choice4: "withdrawabl",
    answer: 2,
  },
  {
    //Question six
    question:
      "Your father is ____ worried about the scores you've been getting at school. (Increase)",
    choice1: "increasingly",
    choice2: "increasinglie",
    choice3: "increasable",
    choice4: "increased",
    answer: 1,
  },
  {
    //Question seven
    question:
      "After a difficult ____, Michael went on to be a successful lawyer. (Bring)",
    choice1: "upbring",
    choice2: "bringing",
    choice3: "upbringing",
    choice4: "upbrought",
    answer: 3,
  },
  {
    //Question eight
    question:
      "Don't use paper to clear up the water. A sponge will give you much better ____. (Absorb)",
    choice1: "absorption",
    choice2: "absorbance",
    choice3: "absorbing",
    choice4: "absorbent",
    answer: 1,
  },
  {
    //Question nine
    question:
      "Do you understand the ____ of the bear on this coat of arms? (Significant)",
    choice1: "significence",
    choice2: "insignificance",
    choice3: "unsignificance",
    choice4: "significance",
    answer: 4,
  },
  {
    //Question ten
    question:
      "Jacklyn came up with ____ excuses as to why she was always so late. (Vary)",
    choice1: "unvarious",
    choice2: "varied",
    choice3: "varying",
    choice4: "various",
    answer: 4,
  }
];

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
