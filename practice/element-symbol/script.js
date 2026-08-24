const availableElements =
    elements.filter(element => element.number <= 20);


let totalQuestions = 10;
let quizMode = "symbol-to-name";

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

    const shuffledElements = shuffle(availableElements);

    const selectedElements =
        shuffledElements.slice(0, totalQuestions);

    questions = selectedElements.map((element, index) => {

        if (quizMode === "symbol-to-name") {

            return {
                type: "symbol-to-name",
                question: `${element.symbol} の元素名は？`,
                answer: element.name
            };

        } else if (quizMode === "name-to-symbol") {

            return {
                type: "name-to-symbol",
                question: `${element.name} の元素記号は？`,
                answer: element.symbol
            };

        } else {

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

        }

    });

    questions = shuffle(questions);
}


function normalizeSymbol(text) {
    return text.trim().normalize("NFKC");
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

    const selectedCount =
        document.querySelector(
            'input[name="questionCount"]:checked'
        );

    const selectedMode =
        document.querySelector(
            'input[name="quizMode"]:checked'
        );

    totalQuestions = Number(selectedCount.value);

    quizMode = selectedMode.value;


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


const questionCountInputs =
    document.querySelectorAll(
        'input[name="questionCount"]'
    );

questionCountInputs.forEach(function(input) {

    input.addEventListener(
        "change",
        startQuiz
    );

});


const quizModeInputs =
    document.querySelectorAll(
        'input[name="quizMode"]'
    );

quizModeInputs.forEach(function(input) {

    input.addEventListener(
        "change",
        startQuiz
    );

});


startQuiz();