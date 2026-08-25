// ======================================================
// 高校化学学習ラボ
// 元素記号テスト
// ======================================================


// ======================================================
// 初期設定
// ======================================================

let availableElements =
    elements.filter(
        element => element.number <= 20
    );

let totalQuestions = 10;

let quizMode = "symbol-to-name";

let quizRange = "1-20";

let periodicTableMode = "disabled";


let questions = [];

let currentQuestion = 0;

let score = 0;


// =========================
// 間違えた問題
// =========================

let wrongAnswers = [];


// 解答処理中の二重送信防止

let isAnswering = false;


// 周期表をすでに作ったかどうか

let periodicTableCreated = false;



// ======================================================
// 学習記録 localStorage
// ======================================================

const learningRecordKey =
    "chemLearningLabElementQuizLearningRecord";



// ======================================================
// 初期状態の学習記録を作る
// ======================================================

function createInitialLearningRecord() {

    return {

        totalSessions: 0,

        totalQuestions: 0,

        totalCorrect: 0,

        totalIncorrect: 0,

        lastStudiedAt: null,

        elements: {}

    };

}



// ======================================================
// 学習記録を読み込む
// ======================================================

function loadLearningRecord() {

    const savedRecord =
        localStorage.getItem(
            learningRecordKey
        );


    // 保存記録がまだない場合

    if (
        savedRecord === null
    ) {

        return createInitialLearningRecord();

    }


    try {

        const parsedRecord =
            JSON.parse(
                savedRecord
            );


        return {

            ...createInitialLearningRecord(),

            ...parsedRecord,

            elements:
                parsedRecord.elements || {}

        };

    }


    catch (error) {

        console.error(
            "学習記録の読み込みに失敗しました。",
            error
        );


        return createInitialLearningRecord();

    }

}



// ======================================================
// 学習記録を保存する
// ======================================================

function saveLearningRecord(
    learningRecord
) {

    try {

        localStorage.setItem(

            learningRecordKey,

            JSON.stringify(
                learningRecord
            )

        );

    }


    catch (error) {

        console.error(
            "学習記録の保存に失敗しました。",
            error
        );

    }

}



// ======================================================
// 1問分の学習記録を保存する
// ======================================================

function recordLearningAnswer(
    question,
    isCorrect
) {

    const learningRecord =
        loadLearningRecord();


    // =========================
    // 全体の記録
    // =========================

    learningRecord.totalQuestions++;


    if (
        isCorrect
    ) {

        learningRecord.totalCorrect++;

    }


    else {

        learningRecord.totalIncorrect++;

    }


    learningRecord.lastStudiedAt =
        new Date().toISOString();



    // =========================
    // 元素ごとの記録
    // =========================

    const elementKey =
        String(
            question.element.number
        );


    // その元素の記録が
    // まだ作られていない場合

    if (
        !learningRecord.elements[
            elementKey
        ]
    ) {

        learningRecord.elements[
            elementKey
        ] = {

            number:
                question.element.number,

            symbol:
                question.element.symbol,

            name:
                question.element.name,

            attempts: 0,

            correct: 0,

            incorrect: 0

        };

    }


    const elementRecord =
        learningRecord.elements[
            elementKey
        ];


    elementRecord.attempts++;


    if (
        isCorrect
    ) {

        elementRecord.correct++;

    }


    else {

        elementRecord.incorrect++;

    }


    saveLearningRecord(
        learningRecord
    );

}



// ======================================================
// テストを最後まで終えた記録を保存する
// ======================================================

function recordCompletedSession() {

    const learningRecord =
        loadLearningRecord();


    learningRecord.totalSessions++;


    learningRecord.lastStudiedAt =
        new Date().toISOString();


    saveLearningRecord(
        learningRecord
    );

}



// ======================================================
// HTML要素の取得
// ======================================================


// =========================
// 問題関係
// =========================

const questionElement =
    document.getElementById(
        "question"
    );


const questionNumberElement =
    document.getElementById(
        "question-number"
    );


const answerInput =
    document.getElementById(
        "answer"
    );


const answerButton =
    document.getElementById(
        "answer-button"
    );


const resultElement =
    document.getElementById(
        "result"
    );



// =========================
// 画面関係
// =========================

const settingsArea =
    document.getElementById(
        "settings-area"
    );


const quizArea =
    document.getElementById(
        "quiz-area"
    );


const scoreArea =
    document.getElementById(
        "score-area"
    );


const scoreElement =
    document.getElementById(
        "score"
    );



// =========================
// 間違えた問題関係
// =========================

const wrongAnswersArea =
    document.getElementById(
        "wrong-answers-area"
    );


const wrongAnswersList =
    document.getElementById(
        "wrong-answers-list"
    );


const perfectScoreArea =
    document.getElementById(
        "perfect-score-area"
    );



// =========================
// 間違えた元素だけ再挑戦
// =========================

const wrongRetryArea =
    document.getElementById(
        "wrong-retry-area"
    );


const wrongRetryButton =
    document.getElementById(
        "wrong-retry-button"
    );



// =========================
// ボタン関係
// =========================

const startButton =
    document.getElementById(
        "start-button"
    );


const retryButton =
    document.getElementById(
        "retry-button"
    );


const settingsButton =
    document.getElementById(
        "settings-button"
    );



// ======================================================
// 学習記録画面関係
// ======================================================

const learningRecordButton =
    document.getElementById(
        "learning-record-button"
    );


const resultLearningRecordButton =
    document.getElementById(
        "result-learning-record-button"
    );


const learningRecordArea =
    document.getElementById(
        "learning-record-area"
    );


const learningRecordEmpty =
    document.getElementById(
        "learning-record-empty"
    );


const learningRecordContent =
    document.getElementById(
        "learning-record-content"
    );


const learningTotalSessions =
    document.getElementById(
        "learning-total-sessions"
    );


const learningTotalQuestions =
    document.getElementById(
        "learning-total-questions"
    );


const learningTotalCorrect =
    document.getElementById(
        "learning-total-correct"
    );


const learningTotalIncorrect =
    document.getElementById(
        "learning-total-incorrect"
    );


const learningCorrectRate =
    document.getElementById(
        "learning-correct-rate"
    );


const learningLastStudied =
    document.getElementById(
        "learning-last-studied"
    );


const learningElementsList =
    document.getElementById(
        "learning-elements-list"
    );


const learningRecordBackButton =
    document.getElementById(
        "learning-record-back-button"
    );



// ======================================================
// 周期表関係
// ======================================================

const periodicTableButtonArea =
    document.getElementById(
        "periodic-table-button-area"
    );


const periodicTableButton =
    document.getElementById(
        "periodic-table-button"
    );


const periodicTableModal =
    document.getElementById(
        "periodic-table-modal"
    );


const periodicTable =
    document.getElementById(
        "periodic-table"
    );


const periodicTableCloseButton =
    document.getElementById(
        "periodic-table-close-button"
    );


const periodicTableBottomCloseButton =
    document.getElementById(
        "periodic-table-bottom-close-button"
    );



// ======================================================
// 配列をシャッフル
// ======================================================

function shuffle(array) {

    const shuffled =
        [...array];


    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];

    }


    return shuffled;

}



// ======================================================
// 出題範囲を設定
// ======================================================

function setAvailableElements() {


    // 原子番号1〜20

    if (
        quizRange === "1-20"
    ) {

        availableElements =
            elements.filter(
                element =>
                    element.number <= 20
            );

    }


    // 原子番号1〜36

    else if (
        quizRange === "1-36"
    ) {

        availableElements =
            elements.filter(
                element =>
                    element.number <= 36
            );

    }


    // 高校化学重要元素

    else if (
        quizRange === "important"
    ) {

        availableElements =
            elements.filter(
                element =>
                    importantElementNumbers.includes(
                        element.number
                    )
            );

    }


    // 原子番号1〜118

    else if (
        quizRange === "all"
    ) {

        availableElements =
            [...elements];

    }

}



// ======================================================
// 通常の問題を作る
// ======================================================

function createQuestions() {

    const shuffledElements =
        shuffle(
            availableElements
        );


    const selectedElements =
        shuffledElements.slice(
            0,
            totalQuestions
        );


    questions =
        selectedElements.map(
            (element, index) => {


                // =========================
                // 元素記号 → 元素名
                // =========================

                if (
                    quizMode ===
                    "symbol-to-name"
                ) {

                    return {

                        type:
                            "symbol-to-name",

                        question:
                            `${element.symbol} の元素名は？`,

                        answer:
                            element.name,

                        element:
                            element

                    };

                }



                // =========================
                // 元素名 → 元素記号
                // =========================

                if (
                    quizMode ===
                    "name-to-symbol"
                ) {

                    return {

                        type:
                            "name-to-symbol",

                        question:
                            `${element.name} の元素記号は？`,

                        answer:
                            element.symbol,

                        element:
                            element

                    };

                }



                // =========================
                // ミックス
                // =========================

                if (
                    index <
                    totalQuestions / 2
                ) {

                    return {

                        type:
                            "symbol-to-name",

                        question:
                            `${element.symbol} の元素名は？`,

                        answer:
                            element.name,

                        element:
                            element

                    };

                }


                return {

                    type:
                        "name-to-symbol",

                    question:
                        `${element.name} の元素記号は？`,

                    answer:
                        element.symbol,

                    element:
                        element

                };

            }
        );


    questions =
        shuffle(
            questions
        );

}



// ======================================================
// 間違えた問題から再挑戦用の問題を作る
// ======================================================

function createWrongRetryQuestions() {

    const retryQuestions =
        wrongAnswers.map(
            wrongAnswer => {

                return {

                    type:
                        wrongAnswer.type,

                    question:
                        wrongAnswer.question,

                    answer:
                        wrongAnswer.correctAnswer,

                    element:
                        wrongAnswer.element

                };

            }
        );


    return shuffle(
        retryQuestions
    );

}



// ======================================================
// 元素記号の入力を整える
// ======================================================

function normalizeSymbol(text) {

    return text
        .trim()
        .normalize(
            "NFKC"
        );

}



// ======================================================
// 周期表の配置
// ======================================================


// null は周期表の空白部分

const periodicTableLayout = [


    // =========================
    // 第1周期
    // =========================

    [
        1,

        null, null, null,
        null, null, null,
        null, null, null,
        null, null, null,
        null, null, null,
        null,

        2
    ],



    // =========================
    // 第2周期
    // =========================

    [
        3, 4,

        null, null, null,
        null, null, null,
        null, null, null,
        null,

        5, 6, 7, 8, 9, 10
    ],



    // =========================
    // 第3周期
    // =========================

    [
        11, 12,

        null, null, null,
        null, null, null,
        null, null, null,
        null,

        13, 14, 15,
        16, 17, 18
    ],



    // =========================
    // 第4周期
    // =========================

    [
        19, 20, 21,
        22, 23, 24,
        25, 26, 27,
        28, 29, 30,
        31, 32, 33,
        34, 35, 36
    ],



    // =========================
    // 第5周期
    // =========================

    [
        37, 38, 39,
        40, 41, 42,
        43, 44, 45,
        46, 47, 48,
        49, 50, 51,
        52, 53, 54
    ],



    // =========================
    // 第6周期
    // =========================

    [
        55,
        56,

        "lanthanide",

        72, 73, 74,
        75, 76, 77,
        78, 79, 80,
        81, 82, 83,
        84, 85, 86
    ],



    // =========================
    // 第7周期
    // =========================

    [
        87,
        88,

        "actinide",

        104, 105, 106,
        107, 108, 109,
        110, 111, 112,
        113, 114, 115,
        116, 117, 118
    ]

];



// =========================
// ランタノイド
// =========================

const lanthanides = [

    57, 58, 59,
    60, 61, 62,
    63, 64, 65,
    66, 67, 68,
    69, 70, 71

];



// =========================
// アクチノイド
// =========================

const actinides = [

    89, 90, 91,
    92, 93, 94,
    95, 96, 97,
    98, 99, 100,
    101, 102, 103

];



// ======================================================
// 元素ボタンを作る
// ======================================================

function createElementButton(
    atomicNumber
) {

    const element =
        elements.find(
            element =>
                element.number ===
                atomicNumber
        );


    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


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

        function () {

            selectElementFromPeriodicTable(
                element
            );

        }

    );


    return button;

}



// ======================================================
// 周期表を作る
// ======================================================

function createPeriodicTable() {

    periodicTable.innerHTML =
        "";


    // =========================
    // メイン周期表
    // =========================

    const mainTable =
        document.createElement(
            "div"
        );


    mainTable.classList.add(
        "periodic-table-grid"
    );


    periodicTableLayout.forEach(
        row => {

            row.forEach(
                item => {


                    // =========================
                    // 空白
                    // =========================

                    if (
                        item === null
                    ) {

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



                    // =========================
                    // ランタノイド位置
                    // =========================

                    else if (
                        item ===
                        "lanthanide"
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



                    // =========================
                    // アクチノイド位置
                    // =========================

                    else if (
                        item ===
                        "actinide"
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



                    // =========================
                    // 通常の元素
                    // =========================

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



    // ==================================================
    // ランタノイド
    // ==================================================

    const lanthanideArea =
        document.createElement(
            "div"
        );


    lanthanideArea.classList.add(
        "sub-periodic-table"
    );


    const lanthanideLabel =
        document.createElement(
            "div"
        );


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



    // ==================================================
    // アクチノイド
    // ==================================================

    const actinideArea =
        document.createElement(
            "div"
        );


    actinideArea.classList.add(
        "sub-periodic-table"
    );


    const actinideLabel =
        document.createElement(
            "div"
        );


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


    periodicTableCreated =
        true;

}



// ======================================================
// 周期表モーダルを開く
// ======================================================

function openPeriodicTable() {

    if (
        periodicTableMode !==
        "enabled"
    ) {

        return;

    }


    if (
        !periodicTableCreated
    ) {

        createPeriodicTable();

    }


    periodicTableModal
        .classList
        .remove(
            "hidden"
        );


    document.body
        .classList
        .add(
            "modal-open"
        );


    periodicTableCloseButton
        .focus();

}



// ======================================================
// 周期表モーダルを閉じる
// ======================================================

function closePeriodicTable(
    restoreFocus = false
) {

    periodicTableModal
        .classList
        .add(
            "hidden"
        );


    document.body
        .classList
        .remove(
            "modal-open"
        );


    if (
        restoreFocus
    ) {

        periodicTableButton
            .focus();

    }

}



// ======================================================
// 周期表から元素を選択
// ======================================================

function selectElementFromPeriodicTable(
    element
) {

    const question =
        questions[
            currentQuestion
        ];


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


    closePeriodicTable();


    answerInput.focus();

}



// ======================================================
// 正解率を表示用の文字列にする
// ======================================================

function formatCorrectRate(
    correct,
    attempts
) {

    if (
        attempts === 0
    ) {

        return "0%";

    }


    const rate =
        correct / attempts * 100;


    const rateText =
        rate
            .toFixed(1)
            .replace(
                ".0",
                ""
            );


    return `${rateText}%`;

}



// ======================================================
// 最終学習日時を見やすい形にする
// ======================================================

function formatLastStudiedAt(
    isoString
) {

    if (
        !isoString
    ) {

        return "-";

    }


    const date =
        new Date(
            isoString
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "-";

    }


    return new Intl.DateTimeFormat(

        "ja-JP",

        {

            year:
                "numeric",

            month:
                "long",

            day:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"

        }

    ).format(
        date
    );

}



// ======================================================
// 元素ごとの学習記録カードを作る
// ======================================================

function createLearningElementItem(
    elementRecord
) {

    const item =
        document.createElement(
            "div"
        );


    item.classList.add(
        "learning-element-item"
    );



    // =========================
    // カード上部
    // =========================

    const header =
        document.createElement(
            "div"
        );


    header.classList.add(
        "learning-element-header"
    );



    // 原子番号

    const number =
        document.createElement(
            "span"
        );


    number.classList.add(
        "learning-element-number"
    );


    number.textContent =
        `No.${elementRecord.number}`;



    // 元素記号

    const symbol =
        document.createElement(
            "span"
        );


    symbol.classList.add(
        "learning-element-symbol"
    );


    symbol.textContent =
        elementRecord.symbol;



    // 元素名

    const name =
        document.createElement(
            "span"
        );


    name.classList.add(
        "learning-element-name"
    );


    name.textContent =
        elementRecord.name;



    header.appendChild(
        number
    );


    header.appendChild(
        symbol
    );


    header.appendChild(
        name
    );


    item.appendChild(
        header
    );



    // =========================
    // 成績部分
    // =========================

    const stats =
        document.createElement(
            "div"
        );


    stats.classList.add(
        "learning-element-stats"
    );



    // 出題回数

    const attempts =
        document.createElement(
            "p"
        );


    attempts.classList.add(
        "learning-element-stat"
    );


    attempts.textContent =
        `出題：${elementRecord.attempts}回`;



    // 正解回数

    const correct =
        document.createElement(
            "p"
        );


    correct.classList.add(
        "learning-element-stat"
    );


    correct.textContent =
        `正解：${elementRecord.correct}回`;



    // 不正解回数

    const incorrect =
        document.createElement(
            "p"
        );


    incorrect.classList.add(
        "learning-element-stat"
    );


    incorrect.textContent =
        `不正解：${elementRecord.incorrect}回`;



    // 正解率

    const rate =
        document.createElement(
            "p"
        );


    rate.classList.add(
        "learning-element-rate"
    );


    rate.textContent =

        `正解率：${

            formatCorrectRate(
                elementRecord.correct,
                elementRecord.attempts
            )

        }`;



    stats.appendChild(
        attempts
    );


    stats.appendChild(
        correct
    );


    stats.appendChild(
        incorrect
    );


    stats.appendChild(
        rate
    );


    item.appendChild(
        stats
    );


    return item;

}



// ======================================================
// 学習記録を画面に表示する
// ======================================================

function displayLearningRecord() {

    const learningRecord =
        loadLearningRecord();


    learningElementsList.innerHTML =
        "";



    // =========================
    // 学習記録がまだない
    // =========================

    if (
        learningRecord.totalQuestions === 0
    ) {

        learningRecordEmpty
            .classList
            .remove(
                "hidden"
            );


        learningRecordContent
            .classList
            .add(
                "hidden"
            );


        return;

    }



    // =========================
    // 学習記録あり
    // =========================

    learningRecordEmpty
        .classList
        .add(
            "hidden"
        );


    learningRecordContent
        .classList
        .remove(
            "hidden"
        );



    // =========================
    // 全体の成績
    // =========================

    learningTotalSessions.textContent =
        `${learningRecord.totalSessions}回`;


    learningTotalQuestions.textContent =
        `${learningRecord.totalQuestions}問`;


    learningTotalCorrect.textContent =
        `${learningRecord.totalCorrect}問`;


    learningTotalIncorrect.textContent =
        `${learningRecord.totalIncorrect}問`;


    learningCorrectRate.textContent =

        formatCorrectRate(

            learningRecord.totalCorrect,

            learningRecord.totalQuestions

        );


    learningLastStudied.textContent =

        formatLastStudiedAt(

            learningRecord.lastStudiedAt

        );



    // =========================
    // 元素ごとの成績
    // 原子番号順に並べる
    // =========================

    const elementRecords =

        Object.values(
            learningRecord.elements
        )
        .sort(
            (a, b) =>
                a.number - b.number
        );


    elementRecords.forEach(

        elementRecord => {

            learningElementsList
                .appendChild(

                    createLearningElementItem(
                        elementRecord
                    )

                );

        }

    );

}



// ======================================================
// 学習記録画面を表示する
// ======================================================

function showLearningRecord() {

    closePeriodicTable();


    settingsArea
        .classList
        .add(
            "hidden"
        );


    quizArea
        .classList
        .add(
            "hidden"
        );


    scoreArea
        .classList
        .add(
            "hidden"
        );


    learningRecordArea
        .classList
        .remove(
            "hidden"
        );


    displayLearningRecord();


    learningRecordArea.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}



// ======================================================
// 問題を表示
// ======================================================

function showQuestion() {

    const question =
        questions[
            currentQuestion
        ];


    questionNumberElement
        .textContent =

        `第${currentQuestion + 1}問 / ${totalQuestions}問`;


    questionElement
        .textContent =

        question.question;


    answerInput.value =
        "";


    resultElement.textContent =
        "";


    isAnswering =
        false;


    answerButton.disabled =
        false;


    answerInput.disabled =
        false;


    periodicTableButton.disabled =
        false;


    closePeriodicTable();


    answerInput.focus();

}



// ======================================================
// 解答を判定
// ======================================================

function checkAnswer() {


    // 二重送信防止

    if (
        isAnswering
    ) {

        return;

    }


    const question =
        questions[
            currentQuestion
        ];


    let userAnswer =
        answerInput
            .value
            .trim();



    // 空欄なら何もしない

    if (
        userAnswer === ""
    ) {

        return;

    }



    // =========================
    // 元素記号の場合
    // 全角英字を半角へ
    // =========================

    if (
        question.type ===
        "name-to-symbol"
    ) {

        userAnswer =
            normalizeSymbol(
                userAnswer
            );

    }


    isAnswering =
        true;


    answerButton.disabled =
        true;


    answerInput.disabled =
        true;


    periodicTableButton.disabled =
        true;



    // =========================
    // 正解かどうか
    // =========================

    const isCorrect =

        userAnswer ===
        question.answer;



    // =========================
    // 正解
    // =========================

    if (
        isCorrect
    ) {

        score++;


        resultElement.textContent =
            "正解！";

    }



    // =========================
    // 不正解
    // =========================

    else {

        resultElement.textContent =

            `不正解　正解は「${question.answer}」`;


        wrongAnswers.push({

            questionNumber:
                currentQuestion + 1,

            question:
                question.question,

            userAnswer:
                userAnswer,

            correctAnswer:
                question.answer,

            type:
                question.type,

            element:
                question.element

        });

    }



    // ==================================================
    // localStorageへ1問分の学習記録を保存
    // ==================================================

    recordLearningAnswer(
        question,
        isCorrect
    );


    closePeriodicTable();



    // =========================
    // 1秒後に次へ
    // =========================

    setTimeout(

        () => {

            currentQuestion++;


            if (
                currentQuestion <
                totalQuestions
            ) {

                showQuestion();

            }


            else {

                showScore();

            }

        },

        1000

    );

}



// ======================================================
// 間違えた問題を表示
// ======================================================

function displayWrongAnswers() {

    wrongAnswersList.innerHTML =
        "";



    // =========================
    // 全問正解
    // =========================

    if (
        wrongAnswers.length === 0
    ) {

        wrongAnswersArea
            .classList
            .add(
                "hidden"
            );


        wrongRetryArea
            .classList
            .add(
                "hidden"
            );


        perfectScoreArea
            .classList
            .remove(
                "hidden"
            );


        return;

    }



    // =========================
    // 間違いあり
    // =========================

    perfectScoreArea
        .classList
        .add(
            "hidden"
        );


    wrongAnswersArea
        .classList
        .remove(
            "hidden"
        );


    wrongRetryArea
        .classList
        .remove(
            "hidden"
        );


    wrongAnswers.forEach(

        wrongAnswer => {


            // カード

            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "wrong-answer-item"
            );



            // 問題番号

            const number =
                document.createElement(
                    "p"
                );


            number.classList.add(
                "wrong-answer-number"
            );


            number.textContent =

                `第${wrongAnswer.questionNumber}問`;


            item.appendChild(
                number
            );



            // 問題文

            const question =
                document.createElement(
                    "p"
                );


            question.classList.add(
                "wrong-answer-question"
            );


            question.textContent =
                wrongAnswer.question;


            item.appendChild(
                question
            );



            // 自分の答え

            const userAnswer =
                document.createElement(
                    "p"
                );


            userAnswer.classList.add(
                "wrong-answer-detail"
            );


            userAnswer.innerHTML = `

                <span class="wrong-answer-label">
                    あなたの答え：
                </span>

                ${wrongAnswer.userAnswer}

            `;


            item.appendChild(
                userAnswer
            );



            // 正解

            const correctAnswer =
                document.createElement(
                    "p"
                );


            correctAnswer.classList.add(
                "wrong-answer-detail"
            );


            correctAnswer.innerHTML = `

                <span class="wrong-answer-label">
                    正解：
                </span>

                ${wrongAnswer.correctAnswer}

            `;


            item.appendChild(
                correctAnswer
            );



            // 元素情報

            const elementInfo =
                document.createElement(
                    "p"
                );


            elementInfo.classList.add(
                "wrong-answer-detail"
            );


            elementInfo.innerHTML = `

                <span class="wrong-answer-label">
                    元素：
                </span>

                原子番号
                ${wrongAnswer.element.number}

                ／
                ${wrongAnswer.element.symbol}

                ／
                ${wrongAnswer.element.name}

            `;


            item.appendChild(
                elementInfo
            );


            wrongAnswersList
                .appendChild(
                    item
                );

        }

    );

}



// ======================================================
// 結果を表示
// ======================================================

function showScore() {


    // ==================================================
    // テスト完了回数を保存
    // ==================================================

    recordCompletedSession();


    closePeriodicTable();


    quizArea
        .classList
        .add(
            "hidden"
        );


    learningRecordArea
        .classList
        .add(
            "hidden"
        );


    scoreArea
        .classList
        .remove(
            "hidden"
        );


    scoreElement.textContent =

        `${score} / ${totalQuestions} 点`;


    displayWrongAnswers();


    scoreArea.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}



// ======================================================
// 結果表示部分を初期化
// ======================================================

function resetResultDisplay() {

    wrongAnswersList.innerHTML =
        "";


    wrongAnswersArea
        .classList
        .add(
            "hidden"
        );


    perfectScoreArea
        .classList
        .add(
            "hidden"
        );


    wrongRetryArea
        .classList
        .add(
            "hidden"
        );

}



// ======================================================
// 通常テスト開始
// ======================================================

function startQuiz() {


    // =========================
    // 問題数
    // =========================

    const selectedCount =
        document.querySelector(

            'input[name="questionCount"]:checked'

        );



    // =========================
    // 問題形式
    // =========================

    const selectedMode =
        document.querySelector(

            'input[name="quizMode"]:checked'

        );



    // =========================
    // 出題範囲
    // =========================

    const selectedRange =
        document.querySelector(

            'input[name="quizRange"]:checked'

        );



    // =========================
    // 周期表使用設定
    // =========================

    const selectedPeriodicTableMode =
        document.querySelector(

            'input[name="periodicTableMode"]:checked'

        );



    // =========================
    // 選択内容を反映
    // =========================

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



    // =========================
    // 出題範囲を反映
    // =========================

    setAvailableElements();



    // =========================
    // テスト初期化
    // =========================

    currentQuestion =
        0;


    score =
        0;


    wrongAnswers =
        [];


    isAnswering =
        false;


    resetResultDisplay();



    // =========================
    // 画面切り替え
    // =========================

    settingsArea
        .classList
        .add(
            "hidden"
        );


    scoreArea
        .classList
        .add(
            "hidden"
        );


    learningRecordArea
        .classList
        .add(
            "hidden"
        );


    quizArea
        .classList
        .remove(
            "hidden"
        );



    // =========================
    // 周期表ボタン
    // =========================

    if (
        periodicTableMode ===
        "enabled"
    ) {

        periodicTableButtonArea
            .classList
            .remove(
                "hidden"
            );

    }


    else {

        periodicTableButtonArea
            .classList
            .add(
                "hidden"
            );


        closePeriodicTable();

    }



    // =========================
    // 問題作成
    // =========================

    createQuestions();



    // =========================
    // 第1問を表示
    // =========================

    showQuestion();


    quizArea.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}



// ======================================================
// 間違えた元素だけ再挑戦
// ======================================================

function startWrongRetry() {


    if (
        wrongAnswers.length === 0
    ) {

        return;

    }



    // =========================
    // wrongAnswersを消す前に
    // 再挑戦問題を作る
    // =========================

    const retryQuestions =
        createWrongRetryQuestions();


    totalQuestions =
        retryQuestions.length;


    questions =
        retryQuestions;



    // =========================
    // 再挑戦を初期化
    // =========================

    currentQuestion =
        0;


    score =
        0;


    wrongAnswers =
        [];


    isAnswering =
        false;


    resetResultDisplay();



    // =========================
    // 画面切り替え
    // =========================

    settingsArea
        .classList
        .add(
            "hidden"
        );


    scoreArea
        .classList
        .add(
            "hidden"
        );


    learningRecordArea
        .classList
        .add(
            "hidden"
        );


    quizArea
        .classList
        .remove(
            "hidden"
        );



    // =========================
    // 周期表ボタン
    // =========================

    if (
        periodicTableMode ===
        "enabled"
    ) {

        periodicTableButtonArea
            .classList
            .remove(
                "hidden"
            );

    }


    else {

        periodicTableButtonArea
            .classList
            .add(
                "hidden"
            );


        closePeriodicTable();

    }



    // =========================
    // 第1問を表示
    // =========================

    showQuestion();


    quizArea.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}



// ======================================================
// 設定画面へ戻る
// ======================================================

function showSettings() {

    closePeriodicTable();


    quizArea
        .classList
        .add(
            "hidden"
        );


    scoreArea
        .classList
        .add(
            "hidden"
        );


    learningRecordArea
        .classList
        .add(
            "hidden"
        );


    settingsArea
        .classList
        .remove(
            "hidden"
        );


    answerInput.value =
        "";


    resultElement.textContent =
        "";


    answerButton.disabled =
        false;


    answerInput.disabled =
        false;


    isAnswering =
        false;


    resetResultDisplay();


    settingsArea.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}



// ======================================================
// イベント
// ======================================================


// =========================
// 答える
// =========================

answerButton.addEventListener(

    "click",

    checkAnswer

);



// =========================
// Enterキー
// =========================

answerInput.addEventListener(

    "keydown",

    function (event) {

        if (
            event.key ===
            "Enter"
        ) {

            checkAnswer();

        }

    }

);



// =========================
// テスト開始
// =========================

startButton.addEventListener(

    "click",

    startQuiz

);



// =========================
// 間違えた元素だけ再挑戦
// =========================

wrongRetryButton.addEventListener(

    "click",

    startWrongRetry

);



// =========================
// もう一度同じ条件で挑戦
// =========================

retryButton.addEventListener(

    "click",

    startQuiz

);



// =========================
// 設定を変える
// =========================

settingsButton.addEventListener(

    "click",

    showSettings

);



// =========================
// 学習記録を見る
// 設定画面から
// =========================

learningRecordButton.addEventListener(

    "click",

    showLearningRecord

);



// =========================
// 学習記録を見る
// 結果画面から
// =========================

resultLearningRecordButton.addEventListener(

    "click",

    showLearningRecord

);



// =========================
// 学習記録から設定画面へ戻る
// =========================

learningRecordBackButton.addEventListener(

    "click",

    showSettings

);



// ======================================================
// 周期表を開く
// ======================================================

periodicTableButton.addEventListener(

    "click",

    openPeriodicTable

);



// ======================================================
// 右上の × で閉じる
// ======================================================

periodicTableCloseButton.addEventListener(

    "click",

    function () {

        closePeriodicTable(
            true
        );

    }

);



// ======================================================
// 下のボタンで閉じる
// ======================================================

periodicTableBottomCloseButton.addEventListener(

    "click",

    function () {

        closePeriodicTable(
            true
        );

    }

);



// ======================================================
// 暗い背景部分をクリックして閉じる
// ======================================================

periodicTableModal.addEventListener(

    "click",

    function (event) {

        if (
            event.target ===
            periodicTableModal
        ) {

            closePeriodicTable(
                true
            );

        }

    }

);



// ======================================================
// Escキーで閉じる
// ======================================================

document.addEventListener(

    "keydown",

    function (event) {

        if (
            event.key ===
            "Escape"
            &&
            !periodicTableModal
                .classList
                .contains(
                    "hidden"
                )
        ) {

            closePeriodicTable(
                true
            );

        }

    }

);