// Game constants variables
let inputdir = {x:0,y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakearr = [
    {x:13,y:15}
]
food = {x:6, y:7}
let score = 0;
var scorebox = document.querySelector("#scorebox");
var highscorebox = document.querySelector("#highscore");
var highscoreval = 0;

// Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake){
    //If you bump into yourself
    for(var i=1;i<snakearr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // you bump to the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}
function gameEngine(){
    // part - 1 updating the snake array & food
        if(isCollide(snakearr)){
            gameOverSound.play();
            musicSound.pause();
            score = 0;
            scorebox.innerText = "Score: "+score;
            inputdir = {x:0,y:0}
            alert("Game over. Press any key to Play again !!!");
            snakearr = [{x:13,y:15}];
            musicSound.play();

        }
        // If you have eaten the food, increment the score and regenerate the food
        if(snakearr[0].y === food.y && snakearr[0].x === food.x){
            snakearr.unshift({x:snakearr[0].x + inputdir.x, y:snakearr[0].y + inputdir.y})
            foodSound.play();
            score += 1;
            if(score > highscoreval){
                highscoreval = score;
                localStorage.setItem("highscore",JSON.stringify(highscoreval))
                highscorebox.innerHTML = "High Score : "+highscoreval;
            }
            scorebox.innerText = "Score: "+score;
            let a = 2;
            let b = 16;
            food = {x:Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
        }
        // Moving the snake
        for(let i= snakearr.length-2;i>=0;i--){
            // const element = array[i];
            snakearr[i+1] = {...snakearr[i]};
        }
        snakearr[0].x += inputdir.x;
        snakearr[0].y += inputdir.y;



    // part - 2 Render the snake and food
    //Display snake
    var board = document.querySelector("#board");
        board.innerHTML = "";
    snakearr.forEach((e,index) =>{
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    })

    // Display food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


// main logic

let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}else{
    highscoreval = JSON.parse(highscore);
    highscorebox.innerHTML = "High Score : "+highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
   let inputDir = {x:0,y:1} // start the game
    musicSound.play();
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break; 
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break; 
        default:
            break;                
    }
})