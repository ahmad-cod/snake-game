window.onload = function(){

    "use strict";
    
   const canvas = document.getElementById("canvas");
   const ctx = canvas.getContext('2d');
   const cw= document.body.clientWidth;
   const ch= canvas.height;
   const tileCount= 30;
   const tileBlock= cw / tileCount;
   const tileSize= tileBlock-2;
   const reset = document.getElementById("reset");
   const bite = new Audio("https://www.fesliyanstudios.com/play-mp3/2918");
   
    console.log(cw)
    
   //button var
   const up= document.getElementById("up");
   const left= document.getElementById("left");
   const down= document.getElementById("down");
   const right= document.getElementById("right"); 
  
   
 //snake property
   let headx= tileCount /2;
   let heady= tileCount /2;
   let snakeTail = 0;
   let snakeparts= [];
   
 //apple property
   let applex= Math.floor(Math.random() * (tileCount -5));
   let appley= Math.floor(Math.random() * tileCount);
   
  //speed and stuff
   let xvelocity= 0;
   let yvelocity= 0;
   let dir= 0;
   let speed=8;
   
   //score value
   let score= 0
   let gameover= false;
   
   let speedFast= 5;
   let highScore = 0;
   
 class SnakePart{
     constructor(x,y){
        this.x= x;
        this.y= y;
         
     }
 }
   
   
   //game loop
   function game(){
       
       changeSnakePos();
       bodyCollide();
       let result = gameOverText();
       if(result){
           return;
       };
       
       erase();
        
       move();
       appleCollision();
       drawApple();
       drawSnake();
       scoretxt();
       speedtxt();
       
       
       //hardness level increase the speed of snake
       if(score>speedFast){
           speed+=2;
           speedFast += 5;
       }
    
       setTimeout(game,1000/speed);
   }
 
 
     //for earsing the canvas 
     function erase(){
         ctx.clearRect(0,0,cw,ch);
     }
 

 
  //////////snake body and position//////////
  
   function drawSnake(){
   //head of snake
        ctx.fillStyle="yellow";
        ctx.fillRect(headx *tileBlock,heady*tileBlock,tileSize,tileSize);
        ctx.fill();
        
         
        
        
        //it runs after it takes value fom head and create an rect on that head place *it takes older value*
        
        ctx.fillStyle = "green";
        for(let i= 0; i<snakeparts.length; i++){
            let part= snakeparts[i];
            ctx.fillRect(part.x * tileBlock, part.y * tileBlock,tileSize,tileSize);
    
        }
        
        
        
        //it take a snake head pos new value and now this value will become an array item and then for loop will take this array item and create a new rect where head pos "Was".
        snakeparts.push(new SnakePart(headx,heady));
        
        if(snakeparts.length > snakeTail){
        //removes an item from last when moving 
            snakeparts.shift();
        }
        
    }
        
    //////////// move the snake //////////

    function changeSnakePos(){
        headx = headx + xvelocity;
        heady = heady + yvelocity;
    }
            
            
            
            
            
            
    //////////button to move it//////////

    function move(){
    up.onmousedown = function() { dir = 4;}
    down.onmousedown = function() { dir = 3;}
    left.onmousedown = function() { dir = 2;}
    right.onmousedown = function() { dir = 1;}

    // For screen users
    up.ontouchstart = function() { dir = 4;}
    down.ontouchstart = function() { dir = 3;}
    left.ontouchstart = function() { dir = 2;}
    right.ontouchstart = function() { dir = 1;}
    
    
    
        //up {-1 to go up}
        if(dir===4){
            if(yvelocity ===1){
                return;
            }
            yvelocity = -1;
            xvelocity = 0;
            
        //left{-1 to go left}      
        }else if (dir===2){
            if(xvelocity ===1){
                return;
            }
            xvelocity =-1;
            yvelocity = 0;
            
        //down {1 to go down}
        }else if(dir===3){
            if(yvelocity ===-1){
                return;
            }
            yvelocity = 1;
            xvelocity = 0;
            
        //right {1 to go right}
        }else if(dir===1){
            if(xvelocity ===-1){
                return;
            }
            xvelocity = 1;
            yvelocity = 0;
            
            
        };
        
   };
    
    
    ////////////apple position//////////

    function drawApple(){
        ctx.fillStyle= "red";
        ctx.fillRect(applex * tileBlock,appley *tileBlock ,tileSize,tileSize);
        ctx.fill();      
    } 
     
     
    
//what happens when apple was eaten by snake////
 
    function appleCollision(){
        
     if(applex === headx && appley=== heady){
      //for random apple X position
        bite.play();
          applex= Math.floor(Math.random() * (tileCount -5));
      //for random apple Y position
          appley= Math.floor(Math.random() * (tileCount -5));
          snakeTail++;
          score++;
          
      }
    }
    
    
    //for game over text 
    function gameOverText(){
        
    if(xvelocity === 0 && yvelocity ===0){
        return false;
    }
    
    
    
    //////////wallls collision/////////
    
        if(headx < 0  || headx === tileCount || heady < 0 || heady === tileCount){
            gameover = true;
        }
        
        
        
 //////what to display after gameover/////  
 
        if(gameover){
        ctx.font = "50px helvetica"
        ctx.fillStyle = "white"
        
        let gradient = ctx.createLinearGradient(0,0,cw,0);
        gradient.addColorStop(0,"purple");
        gradient.addColorStop(0.5,"magenta");
        gradient.addColorStop(1,"pink");
        ctx.fillStyle= gradient;
        ctx.fillText("Game over",cw/5,canvas.height/2);
        
        }   
        return gameover;    
        
    }
     
    
    
    //////////Snake tail collision/////////
    
    function bodyCollide(){
        for(let i= 0; i < snakeparts.length; i++){
            let part = snakeparts[i];
            if(part.x === headx && part.y === heady){
                gameover = true;
                
                break;
            }
        }
    }
    
    
    

    
     //////////Score points//////////   
    function scoretxt(){
        ctx.font = ".8rem san-serif"
        ctx.fillStyle = "white"
        ctx.fillText("Score: " + score,10,20);
        //highscore
        ctx.font = ".8rem san-serif"
        ctx.fillStyle = "white"
        ctx.fillText("High: " + highScore,cw-50,20);
    }
    
    
    //////////Speed Text and change//////////   
    function speedtxt(){
        ctx.font = "10px verdana"
        ctx.fillStyle = "white"
        ctx.fillText("Speed: "+ speed,cw/2.2,20);
        ctx.fill();
    }
    
   
   
   ////this will make all the the position of snake and apple default//////
   
    function drawNow(){
        let result = gameOverText();
           if(result){
            headx = tileCount /2;
            heady = tileCount /2;
            applex = 5;
            appley = 5;
            speed=8;
            score= 0;
            snakeTail= 0;
            snakeparts=[];
            gameover= false;
            xvelocity = 0;
            yvelocity = 0;
            dir = 0;
            game();
              };
           
        };
       

/////what happens when we click reset button//////

    reset.onclick=()=>{
           erase();
           if(score >= highScore){
            highScore = score;
        }
           drawNow();
           scoretxt();
           speedtxt();
           drawApple();
           drawSnake();
      }
    
    
    
   window.requestAnimationFrame(game);    
};