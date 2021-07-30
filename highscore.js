const hsList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML= highScores.map( score => {
    //MAP function converts array items to individual objects
    return `<li class="high-score"> ${score.name} - ${score.score} </li>`;

}).join(" ");
