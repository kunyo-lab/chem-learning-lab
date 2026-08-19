const elements = [
    { number: 1, symbol: "H", name: "水素" },
    { number: 2, symbol: "He", name: "ヘリウム" },
    { number: 3, symbol: "Li", name: "リチウム" },
    { number: 4, symbol: "Be", name: "ベリリウム" },
    { number: 5, symbol: "B", name: "ホウ素" },
    { number: 6, symbol: "C", name: "炭素" },
    { number: 7, symbol: "N", name: "窒素" },
    { number: 8, symbol: "O", name: "酸素" },
    { number: 9, symbol: "F", name: "フッ素" },
    { number: 10, symbol: "Ne", name: "ネオン" },
    { number: 11, symbol: "Na", name: "ナトリウム" },
    { number: 12, symbol: "Mg", name: "マグネシウム" },
    { number: 13, symbol: "Al", name: "アルミニウム" },
    { number: 14, symbol: "Si", name: "ケイ素" },
    { number: 15, symbol: "P", name: "リン" },
    { number: 16, symbol: "S", name: "硫黄" },
    { number: 17, symbol: "Cl", name: "塩素" },
    { number: 18, symbol: "Ar", name: "アルゴン" },
    { number: 19, symbol: "K", name: "カリウム" },
    { number: 20, symbol: "Ca", name: "カルシウム" }
];

const totalQuestions = 10;

let questions = [];
let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const questionNumberElement = document.getElementById("question-number");
const answerInput = document.getElementById("answer");
const answerButton = document.getElementById("answer-button");
const resultElement = document.getElementById("result");

const quizArea = document.getElementById("quiz-area");
const scoreArea = document.getElementById("score-area");
const scoreElement = document.getElementById("score");
const retryButton = document.getElementById("retry-button");


function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}


function createQuestions() {

    const shuffledElements = shuffle(elements);

    const selectedElements =
        shuffledElements.slice(0, totalQuestions);

    questions = selectedElements.map((element, index) => {

        if (index < totalQuestions / 2) {

            return {
                type: "symbol-to-name",
                question: `${element.symbol} の元素名は？`,
                answer: element.name
            };

        } else {

            return {
                type: "name-to-symbol",
                question: `${element.name} の元素記号は？`,
                answer: element.symbol
            };

        }

    });

    questions = shuffle(questions);
}


function normalizeSymbol(text) {

    text = text.trim();

    if (text.length === 0) {
        return "";
    }

    return (
        text.charAt(0).toUpperCase()
        +
        text.slice(1).toLowerCase()
    );
}


function showQuestion() {

    const question = questions[currentQuestion];

    questionNumberElement.textContent =
        `第${currentQuestion + 1}問 / ${totalQuestions}問`;

    questionElement.textContent =
        question.question;

    answerInput.value = "";
    resultElement.textContent = "";

    answerInput.focus();
}


function checkAnswer() {

    const question = questions[currentQuestion];

    let userAnswer = answerInput.value.trim();

    if (userAnswer === "") {
        return;
    }

    if (question.type === "name-to-symbol") {
        userAnswer = normalizeSymbol(userAnswer);
    }

    if (userAnswer === question.answer) {

        score++;

        resultElement.textContent =
            "正解！";

    } else {

        resultElement.textContent =
            `不正解　正解は「${question.answer}」`;

    }

    answerButton.disabled = true;

    setTimeout(() => {

        currentQuestion++;

        answerButton.disabled = false;

        if (currentQuestion < totalQuestions) {

            showQuestion();

        } else {

            showScore();

        }

    }, 1000);
}


function showScore() {

    quizArea.classList.add("hidden");
    scoreArea.classList.remove("hidden");

    scoreElement.textContent =
        `${score} / ${totalQuestions} 点`;
}


function startQuiz() {

    currentQuestion = 0;
    score = 0;

    quizArea.classList.remove("hidden");
    scoreArea.classList.add("hidden");

    createQuestions();

    showQuestion();
}


answerButton.addEventListener(
    "click",
    checkAnswer
);


answerInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            checkAnswer();
        }

    }
);


retryButton.addEventListener(
    "click",
    startQuiz
);


startQuiz();