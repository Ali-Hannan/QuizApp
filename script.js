const questions = [
    {
        question: "Which is the largest animal in the world?",
        anwsers:[
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is the capital of France?",
        anwsers:[
            {text: "Berlin", correct: false},
            {text: "Madrid", correct: false},
            {text: "Paris", correct: true},
            {text: "Rome", correct: false},
        ]
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        anwsers:[
            {text: "Mark Twain", correct: false},
            {text: " Leo Tolstoy", correct: false},
            {text: "William Shakespeare ", correct: true},
            {text: "Charles Dickens", correct: false},
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        anwsers:[
            {text: "Jupiter", correct: true},
            {text: "Saturn", correct: false},
            {text: " Mars", correct: false},
            {text: "Earth", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        anwsers:[
            {text: "H2", correct: false},
            {text: "O2", correct: false},
            {text: "CO2", correct: false},
            {text: "H2O", correct: true},
        ]
    },
    {
        question: "What is the square root of 81?",
        anwsers:[
            {text: "8", correct: false},
            {text: "9", correct: true},
            {text: "7", correct: false},
            {text: "10", correct: false},
        ]
    },
    {
        question: "Which of these is the largest ocean on Earth?",
        anwsers:[
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
        ]
    },
    {
        question: "In which country did the Olympic Games originate?",
        anwsers:[
            {text: "United States", correct: false},
            {text: "Germany", correct: false},
            {text: "Greece", correct: true},
            {text: "Italy", correct: false},
        ]
    },
    {
        question: "Which programming language is primarily used for web development?",
        anwsers:[
            {text: "JavaScript ", correct: true},
            {text: "C++", correct: false},
            {text: "Python", correct: false},
            {text: "Java", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        anwsers:[
            {text: "Asia", correct: false},
            {text: "Arctic", correct: false},
            {text: "Australia", correct: true},
            {text: "Africa", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    // Update the progress indicator
    const totalQuestions = questions.length;
    const progressText = document.getElementById('question-number');
    progressText.innerHTML = `Question ${questionNo} of ${totalQuestions}`;

    // Update the question text
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    // Create answer buttons
    currentQuestion.anwsers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore (){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextbutton (){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }else {
        startQuiz();
    }
});
startQuiz();