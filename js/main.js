const lvl = document.querySelector("#game-lvl");
let scoreBox = document.querySelector(".score");
let gameover = document.querySelector('#game-over');
let gameBoard = document.querySelector('#game-board');
let lvlBox = document.querySelector('.lvl-box');

function gameLvl(e) {
    let target = e.target;
    let val = target.value;
    let name = target.name;

    lvlBox.innerText = `level: ${name}`;
    lvl.style.display = "none";
    gameBoard.style.opacity ="1";

    
    


    // GAME
    const cvs = document.querySelector("#canvas");
    const ctx = cvs.getContext("2d");
  

    let score = 0;
    const unit = 32;


    // - snake
    let snake = [];

    snake[0] = {
        x : 9 * unit,
        y : 9 * unit
    };


    // - fruits
    const fruitImg = new Image();
    fruitImg.src = `img/${Math.floor(Math.random() * 6) + 1}.png`

    let fruit = {
        x : Math.floor(Math.random()*17+1) * unit,
        y : Math.floor(Math.random()*15+1) * unit
    }



    // - snake move function

    let move;
    let snakeMoves  = (e) =>{
        let key = e.keyCode;
        if( key == 37 && move != "right"){
            move = "left";
        }else if(key == 38 && move != "down"){
            move = "up";
            
        }else if(key == 39 && move != "left"){
            move = "right";
            
        }else if(key == 40 && move != "up"){
            move = "down";
            
        }
    }
    document.addEventListener("keydown",snakeMoves);



    // - collision function

    let collision = (head,array) =>{
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }



    // - draw 

    function draw(){
        
        ctx.fillStyle = '#4d3319';
        ctx.fillRect(unit,  unit,  unit * 17  , unit * 15  );
        ctx.strokeStyle = "#27190c";
        ctx.strokeRect(unit,  unit,  unit * 17  , unit * 15);

    
        for( let i = 0; i < snake.length ; i++){
            ctx.strokeStyle = "#c65353";
            ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);

            ctx.fillStyle = ( i == 0 )? "#d27979" : "#d98c8c";
            ctx.fillRect(snake[i].x,snake[i].y,unit,unit);
            if (i == 0) {
                if (move == "up") {
                    ctx.fillStyle = "white";
                    ctx.fillRect(snake[i].x +4, snake[i].y + 4, 3, 3)

                    ctx.fillStyle = "white";
                    ctx.fillRect(snake[i].x +24, snake[i].y + 4, 3, 3)
                }
                else if ( move == "down"){
                    ctx.fillStyle = "white";
                    ctx.fillRect(snake[i].x +4, snake[i].y + 24, 3, 3)

                    ctx.fillStyle = "white";
                    ctx.fillRect(snake[i].x +24, snake[i].y +24, 3, 3) 
                }
                else if ( move == "right"){
                    ctx.fillStyle = "white";
                    ctx.fillRect(snake[i].x +24, snake[i].y + 24, 3, 3)

                    ctx.fillStyle = "white";
                    ctx.fillRect(snake[i].x +24, snake[i].y + 4, 3, 3) 
                }
                else if ( move == "left"){
                    ctx.fillStyle = "white";
                    ctx.fillRect(snake[i].x +4, snake[i].y + 24, 3, 3)

                    ctx.fillStyle = "white";
                    ctx.fillRect(snake[i].x +4, snake[i].y + 4, 3, 3) 
                }

            }
        }
        
        ctx.drawImage(fruitImg, fruit.x, fruit.y, unit, unit);
        
        
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        if( move == "left") snakeX -= unit;
        if( move == "up") snakeY -= unit;
        if( move == "right") snakeX += unit;
        if( move == "down") snakeY += unit;
        
        
        if(snakeX == fruit.x && snakeY == fruit.y){
            scoreBox.innerText = score++ +1;
            
            fruitImg.src = `img/${Math.floor(Math.random() * 6) + 1}.png`
            fruit = {
                x : Math.floor(Math.random()*17+1) * unit,
                y : Math.floor(Math.random()*15+1) * unit
            }
        
        }else{
            
            snake.pop();
        }
        
        
        let newHead = {
            x : snakeX,
            y : snakeY
        }


        
    // game over
        
        if(snakeX < unit || snakeX > 17 * unit || snakeY < unit || snakeY > 15*unit || collision(newHead,snake)){
            clearInterval(game);
            if(snakeX < unit || snakeX > 17 * unit || snakeY < unit || snakeY > 15*unit){
                document.querySelector('.subalert').innerText = "Oh no! Wall!";
            }
            else if (collision(newHead,snake)) {
                document.querySelector('.subalert').innerText = "You ate yourself!";
            }
            gameover.style.opacity = "1";
            cvs.style.opacity = "0.5";   
        }
        
        snake.unshift(newHead);


        
    // start again
    let enter = (e) => {
        let key = e.keyCode;
        if (key == 13 || key == 27){
            window.location.reload();
        }

    }

    document.addEventListener('keydown',enter);

    }

 



    let game = setInterval(draw, val);

}

lvl.addEventListener('click', gameLvl);





