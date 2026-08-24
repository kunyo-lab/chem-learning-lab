let availableElements =
    elements.filter(element => element.number <= 20);

let totalQuestions = 10;
let quizMode = "symbol-to-name";
let quizRange = "1-20";
let periodicTableMode = "disabled";

let questions = [];
let currentQuestion = 0;
let score = 0;


// =========================
// HTML要素の取得
// =========================

const questionElement =
    document.getElementById("question");

const questionNumberElement =
    document.getElementById("question-number");

const answerInput =
    document.getElementById("answer");

const answerButton =
    document.getElementById("answer-button");

const resultElement =
    document.getElementById("result");


const quizArea =
    document.getElementById("quiz-area");

const scoreArea =
    document.getElementById("score-area");

const scoreElement =
    document.getElementById("score");

const retryButton =
    document.getElementById("retry-button");


const settingsArea =
    document.getElementById("settings-area");

const startButton =
    document.getElementById("start-button");

const settingsButton =
    document.getElementById("settings-button");


// =========================
// 周期表関係
// =========================

const periodicTableButtonArea =
    document.getElementById("periodic-table-button-area");

const periodicTableButton =
    document.getElementById("periodic-table-button");

const periodicTableArea =
    document.getElementById("periodic-table-area");

const periodicTable =
    document.getElementById("periodic-table");

const periodicTableCloseButton =
    document.getElementById("periodic-table-close-button");


// =========================
// 配列をシャッフル
// =========================

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}


// =========================
// 出題範囲を設定
// =========================

function setAvailableElements() {

    if (quizRange === "1-20") {

        availableElements =
            elements.filter(
                element => element.number <= 20
            );

    } else if (quizRange === "1-36") {

        availableElements =
            elements.filter(
                element => element.number <= 36
            );

    } else if (quizRange === "important") {

        availableElements =
            elements.filter(
                element =>
                    importantElementNumbers.includes(
                        element.number
                    )
            );

    } else if (quizRange === "all") {

        availableElements =
            [...elements];

    }

}


// =========================
// 問題作成
// =========================

function createQuestions() {

    const shuffledElements =
        shuffle(availableElements);

    const selectedElements =
        shuffledElements.slice(
            0,
            totalQuestions
        );


    questions =
        selectedElements.map(
            (element, index) => {

                if (
                    quizMode ===
                    "symbol-to-name"
                ) {

                    return {
                        type: "symbol-to-name",
                        question:
                            `${element.symbol} の元素名は？`,
                        answer:
                            element.name
                    };

                } else if (
                    quizMode ===
                    "name-to-symbol"
                ) {

                    return {
                        type: "name-to-symbol",
                        question:
                            `${element.name} の元素記号は？`,
                        answer:
                            element.symbol
                    };

                } else {

                    if (
                        index <
                        totalQuestions / 2
                    ) {

                        return {
                            type: "symbol-to-name",
                            question:
                                `${element.symbol} の元素名は？`,
                            answer:
                                element.name
                        };

                    } else {

                        return {
                            type: "name-to-symbol",
                            question:
                                `${element.name} の元素記号は？`,
                            answer:
                                element.symbol
                        };

                    }

                }

            }
        );


    questions =
        shuffle(questions);

}


// =========================
// 元素記号の入力を整える
// =========================

function normalizeSymbol(text) {

    return text
        .trim()
        .normalize("NFKC");

}


// =========================
// 周期表の配置
// =========================

// null は周期表の空白部分

const periodicTableLayout = [

    // 第1周期
    [
        1,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null,
        2
    ],

    // 第2周期
    [
        3, 4,
        null, null, null, null,
        null, null, null, null,
        null, null,
        5, 6, 7, 8, 9, 10
    ],

    // 第3周期
    [
        11, 12,
        null, null, null, null,
        null, null, null, null,
        null, null,
        13, 14, 15, 16, 17, 18
    ],

    // 第4周期
    [
        19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36
    ],

    // 第5周期
    [
        37, 38, 39, 40, 41, 42,
        43, 44, 45, 46, 47, 48,
        49, 50, 51, 52, 53, 54
    ],

    // 第6周期
    [
        55, 56,
        "lanthanide",
        72, 73, 74, 75, 76,
        77, 78, 79, 80, 81,
        82, 83, 84, 85, 86
    ],

    // 第7周期
    [
        87, 88,
        "actinide",
        104, 105, 106, 107, 108,
        109, 110, 111, 112, 113,
        114, 115, 116, 117, 118
    ]

];


// ランタノイド

const lanthanides = [
    57, 58, 59, 60, 61,
    62, 63, 64, 65, 66,
    67, 68, 69, 70, 71
];


// アクチノイド

const actinides = [
    89, 90, 91, 92, 93,
    94, 95, 96, 97, 98,
    99, 100, 101, 102, 103
];


// =========================
// 元素ボタンを作る
// =========================

function createElementButton(atomicNumber) {

    const element =
        elements.find(
            element =>
                element.number === atomicNumber
        );


    const button =
        document.createElement("button");


    button.type = "button";

    button.classList.add(
        "element-button"
    );


    button.innerHTML = `
        <span class="atomic-number">
            ${element.number}
        </span>

        <span class="element-symbol">
            ${element.symbol}
        </span>

        <span class="element-name">
            ${element.name}
        </span>
    `;


    button.addEventListener(
        "click",
        function() {

            selectElementFromPeriodicTable(
                element
            );

        }
    );


    return button;

}


// =========================
// 周期表を作る
// =========================

function createPeriodicTable() {

    periodicTable.innerHTML = "";


    // メイン周期表
    const mainTable =
        document.createElement("div");

    mainTable.classList.add(
        "periodic-table-grid"
    );


    periodicTableLayout.forEach(
        row => {

            row.forEach(
                item => {

                    // 空白
                    if (item === null) {

                        const emptyCell =
                            document.createElement(
                                "div"
                            );

                        emptyCell.classList.add(
                            "periodic-table-empty"
                        );

                        mainTable.appendChild(
                            emptyCell
                        );

                    }

                    // ランタノイドの位置
                    else if (
                        item === "lanthanide"
                    ) {

                        const marker =
                            document.createElement(
                                "div"
                            );

                        marker.classList.add(
                            "periodic-table-marker"
                        );

                        marker.textContent =
                            "57-71";

                        mainTable.appendChild(
                            marker
                        );

                    }

                    // アクチノイドの位置
                    else if (
                        item === "actinide"
                    ) {

                        const marker =
                            document.createElement(
                                "div"
                            );

                        marker.classList.add(
                            "periodic-table-marker"
                        );

                        marker.textContent =
                            "89-103";

                        mainTable.appendChild(
                            marker
                        );

                    }

                    // 通常の元素
                    else {

                        mainTable.appendChild(
                            createElementButton(
                                item
                            )
                        );

                    }

                }
            );

        }
    );


    periodicTable.appendChild(
        mainTable
    );


    // =========================
    // ランタノイド
    // =========================

    const lanthanideArea =
        document.createElement("div");

    lanthanideArea.classList.add(
        "sub-periodic-table"
    );


    const lanthanideLabel =
        document.createElement("div");

    lanthanideLabel.classList.add(
        "sub-table-label"
    );

    lanthanideLabel.textContent =
        "ランタノイド";


    lanthanideArea.appendChild(
        lanthanideLabel
    );


    lanthanides.forEach(
        atomicNumber => {

            lanthanideArea.appendChild(
                createElementButton(
                    atomicNumber
                )
            );

        }
    );


    periodicTable.appendChild(
        lanthanideArea
    );


    // =========================
    // アクチノイド
    // =========================

    const actinideArea =
        document.createElement("div");

    actinideArea.classList.add(
        "sub-periodic-table"
    );


    const actinideLabel =
        document.createElement("div");

    actinideLabel.classList.add(
        "sub-table-label"
    );

    actinideLabel.textContent =
        "アクチノイド";


    actinideArea.appendChild(
        actinideLabel
    );


    actinides.forEach(
        atomicNumber => {

            actinideArea.appendChild(
                createElementButton(
                    atomicNumber
                )
            );

        }
    );


    periodicTable.appendChild(
        actinideArea
    );

}


// =========================
// 周期表から元素を選択
// =========================

function selectElementFromPeriodicTable(
    element
) {

    const question =
        questions[currentQuestion];


    // 元素記号 → 元素名
    if (
        question.type ===
        "symbol-to-name"
    ) {

        answerInput.value =
            element.name;

    }

    // 元素名 → 元素記号
    else if (
        question.type ===
        "name-to-symbol"
    ) {

        answerInput.value =
            element.symbol;

    }


    // 選択しただけでは
    // 正誤判定しない

    periodicTableArea.classList.add(
        "hidden"
    );


    answerInput.focus();

}


// =========================
// 問題表示
// =========================

function showQuestion() {

    const question =
        questions[currentQuestion];


    questionNumberElement.textContent =
        `第${currentQuestion + 1}問 / ${totalQuestions}問`;


    questionElement.textContent =
        question.question;


    answerInput.value = "";

    resultElement.textContent = "";


    // 新しい問題では
    // 周期表を閉じる
    periodicTableArea.classList.add(
        "hidden"
    );


    answerInput.focus();

}


// =========================
// 解答判定
// =========================

function checkAnswer() {

    const question =
        questions[currentQuestion];


    let userAnswer =
        answerInput.value.trim();


    if (userAnswer === "") {

        return;

    }


    if (
        question.type ===
        "name-to-symbol"
    ) {

        userAnswer =
            normalizeSymbol(
                userAnswer
            );

    }


    if (
        userAnswer ===
        question.answer
    ) {

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


        if (
            currentQuestion <
            totalQuestions
        ) {

            showQuestion();

        } else {

            showScore();

        }

    }, 1000);

}


// =========================
// 結果表示
// =========================

function showScore() {

    quizArea.classList.add(
        "hidden"
    );

    scoreArea.classList.remove(
        "hidden"
    );


    periodicTableArea.classList.add(
        "hidden"
    );


    scoreElement.textContent =
        `${score} / ${totalQuestions} 点`;

}


// =========================
// テスト開始
// =========================

function startQuiz() {

    const selectedCount =
        document.querySelector(
            'input[name="questionCount"]:checked'
        );


    const selectedMode =
        document.querySelector(
            'input[name="quizMode"]:checked'
        );


    const selectedRange =
        document.querySelector(
            'input[name="quizRange"]:checked'
        );


    const selectedPeriodicTableMode =
        document.querySelector(
            'input[name="periodicTableMode"]:checked'
        );


    totalQuestions =
        Number(
            selectedCount.value
        );


    quizMode =
        selectedMode.value;


    quizRange =
        selectedRange.value;


    periodicTableMode =
        selectedPeriodicTableMode.value;


    setAvailableElements();


    currentQuestion = 0;

    score = 0;


    settingsArea.classList.add(
        "hidden"
    );

    quizArea.classList.remove(
        "hidden"
    );

    scoreArea.classList.add(
        "hidden"
    );


    // 周期表使用設定
    if (
        periodicTableMode ===
        "enabled"
    ) {

        periodicTableButtonArea
            .classList
            .remove("hidden");

    } else {

        periodicTableButtonArea
            .classList
            .add("hidden");

        periodicTableArea
            .classList
            .add("hidden");

    }


    createQuestions();

    showQuestion();


    quizArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================
// 設定画面へ戻る
// =========================

function showSettings() {

    quizArea.classList.add(
        "hidden"
    );

    scoreArea.classList.add(
        "hidden"
    );

    settingsArea.classList.remove(
        "hidden"
    );


    periodicTableArea.classList.add(
        "hidden"
    );


    answerInput.value = "";

    resultElement.textContent = "";

    answerButton.disabled = false;


    settingsArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================
// イベント
// =========================

answerButton.addEventListener(
    "click",
    checkAnswer
);


answerInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Enter"
        ) {

            checkAnswer();

        }

    }
);


retryButton.addEventListener(
    "click",
    startQuiz
);


startButton.addEventListener(
    "click",
    startQuiz
);


settingsButton.addEventListener(
    "click",
    showSettings
);


// =========================
// 周期表を開く
// =========================

periodicTableButton.addEventListener(
    "click",
    function() {

        createPeriodicTable();

        periodicTableArea.classList.remove(
            "hidden"
        );

    }
);


// =========================
// 周期表を閉じる
// =========================

periodicTableCloseButton.addEventListener(
    "click",
    function() {

        periodicTableArea.classList.add(
            "hidden"
        );

    }
);