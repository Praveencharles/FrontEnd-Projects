const questions = [
    {
        question:"Which is the structure of FrontEnd Development ?",
        answers:[
            { text: "HTML", correct: true},
            { text: "CSS", correct: false},
            { text: "Java Script", correct: false},
            { text: "React JS", correct: false}
        ]
    },
     {
        question:"Which one makes FrontEnd Development Ineractive ?",
        answers:[
            { text: "HTML", correct: false},
            { text: "CSS", correct: false},
            { text: "Java Script", correct: true},
            { text: "React JS", correct: false}
        ]
    },
     {
        question:"Which is the styling element of FrontEnd Development ?",
        answers:[
            { text: "HTML", correct: false},
            { text: "CSS", correct:true },
            { text: "Java Script", correct: false},
            { text: "React JS", correct: false}
        ]
    },
     {
        question:"Which one is used to make e-commerce websites?",
        answers:[
            { text: "HTML", correct: false},
            { text: "CSS", correct: false},
            { text: "Java Script", correct: false},
            { text: "React JS", correct: true}
        ]
    },
];

const questionElement =  document.getElementById("question");
const answerElement =  document.getElementById("answer-btn");
const nextButton =  document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestions();
}

function showQuestions(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
            
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}



nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();