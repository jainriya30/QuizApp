const ques = document.getElementById("ques");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const queCounterText = document.getElementById("queCounter");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progress-bar-full");

let currentQue = [];
let acceptAns = true;
let score = 0;
let queCounter =0;
let availableQue = [];

let questions = [];

fetch('questions.json')
.then( res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions);
    questions=loadedQuestions;
    startGame();
})
.catch(err => {
    console.error(err);
})

const CORRECT_BONUS=10;
const MAX_OUE = 2;

startGame = () => {
    queCounter = 0;
    score=0;
    availableQue = [...questions];
    console.log(availableQue);
    getNewQue();
};

getNewQue =() => {

    if(availableQue.length === 0 || queCounter >= MAX_OUE){
        localStorage.setItem('mostRecentScore', score);
        //return to end page
        return window.location.assign('end.html');
    }

    queCounter++;
    queCounterText.innerText= 'Question : '+ queCounter + '/' + MAX_OUE;
    progressBarFull.style.width = `${( queCounter/ MAX_OUE) * 100}%`;
    

    const queIndex= Math.floor(Math.random() * availableQue.length);
    currentQue = availableQue[queIndex];
    ques.innerText = currentQue.ques;

    choices.forEach( choice=> {
        const number = choice.dataset['number'];
        choice.innerText = currentQue['choice' + number];
    });

    availableQue.splice(queIndex,1);
    acceptAns=true;
};

choices.forEach(choice=>{
    choice.addEventListener('click', e=>{
        console.log(e.target);
        if(!acceptAns) return;
        acceptAns=false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        
       
        const classToApply =selectedAnswer == currentQue.answer ? 'correct' : 'incorrect';
        console.log(classToApply)
        if(classToApply == 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( ()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQue();
        },1000);
    })
});

incrementScore = num =>{
    score +=num;
    scoreText.innerText= score;
}

