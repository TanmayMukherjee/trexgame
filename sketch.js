var trex,trexrunning;
var ground,groungimage,invisibleground;
var cloud,cloudImage;
var cloudsGroup,obstaclesGroup;
var play=1,end=0,gameState=play;
var obs1,obs2,obs3,obs4,obs5,obs6;
var trexcollided;
var gameover,restart,gameoverimg,restartimg;
var score=0,highscore=0;
var jump,die,checkpoint;

function preload(){
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
   obs2=loadImage("obstacle2.png");
   obs3=loadImage("obstacle3.png");
   obs4=loadImage("obstacle4.png");
   obs5=loadImage("obstacle5.png");
   obs6=loadImage("obstacle6.png");
  trexcollided=loadImage("trex_collided.png");
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
  
}


function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,20,20);
  trex.addAnimation("running",trexrunning);
  trex.addAnimation("trexcollided",trexcollided);
  
  trex.scale=0.5;
  
  ground=createSprite(300,180,600,10);
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2;
  
  invisibleground=createSprite(300,185,600,5);
  invisibleground.visible=false;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  gameover=createSprite(300,100);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  restart=createSprite(300,140);
  restart.addImage(restartimg);
  restart.scale=0.5;
  gameover.visible=false;
  restart.visible=false;
}

function draw() {
  background(180);
  text("score:"+score,500,50);
  text("highscore:"+highscore,420,50);
  if(gameState==play){
    ground.velocityX=-(6+3*score/100);
    score=score+Math.round(getFrameRate()/60);
    if(score>0 && score%100==0){
      checkpoint.play();
    }
  if(keyDown("space")  && trex.y>=159){
    trex.velocityY=-10;
    jump.play();
    
  }
  trex.velocityY=trex.velocityY+0.5;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    spawnClouds();
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState = end;
      die.play();
    }
  }
  else if(gameState==end){
    ground.velocityX=0;
    trex.velocityY=0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.changeAnimation("trexcollided",trexcollided);
    gameover.visible=true;
    restart.visible=true;
    
    
  }
  if(mousePressedOver(restart)){
    gameState=play;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running",trexrunning);
    if(highscore<score){
      highscore=score;
      
    }
    gameover.visible=false;
    restart.visible=false;
    score=0;
  }
  
  
  trex.collide(invisibleground);
  
  drawSprites();
}
function spawnClouds(){
  if(World.frameCount % 60==0){
    cloud=createSprite(600,120,10,10);
    cloud.y=random(70,120);
    cloud.velocityX=-4;
    cloud.addImage("cloud",cloudImage);
    cloud.scale=0.5;
    cloud.lifetime=150;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudsGroup.add(cloud);
  }
}
function spawnObstacles(){
  if(World.frameCount%60==0){
    var obstacle=createSprite(600,165,10,40);
    obstacle.velocityX=-(6+3*score/100);
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1 : obstacle.addImage(obs1);
        break;
       case 2 : obstacle.addImage(obs2);
         break;
      case 3 : obstacle.addImage(obs3);
        break;
         case 4 : obstacle.addImage(obs4);
        break;
         case 5 : obstacle.addImage(obs5);
        break;
         case 6 : obstacle.addImage(obs6);
        break;
        default : break;
    }
    obstacle.scale=0.5;
    obstacle.lifetime=120;
    obstaclesGroup.add(obstacle);
    
  }
}