var trex,ground,invisibleGround,gravity,trexCollide,reset,gameoverImage;
var trexRunning,groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
trexRunning=loadAnimation("trex0.png","trex1.png","trex2.png") ; 
  groundImage=loadImage("grnd.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstical5.png");
  obstacle6=loadImage("obstical6.png");
  cloudImage=loadImage("Cloud.png");
  trexCollide=loadAnimation("trex_rest.png");
  gameoverImage=loadImage("gameover.png");
  reset=loadImage("resetBt.png");
  
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(40,165,20,20);
  trex.addAnimation("trexRunning",trexRunning);
  trex.addAnimation("trex_rest.png",trexCollide);
  
  trex.scale=0.5;
  ground=createSprite(300,185,600,5);
  ground.addImage("groundMoving",groundImage);
  ground.x=ground.width/2;
  ground.velocityX=-6;
  invisibleGround=createSprite(300,185,600,5);
  invisibleGround.visible=false;
  gravity=0.5;
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
  score=0;
   gameOver = createSprite(290,90);
 restart = createSprite(280,140);
gameOver.addImage("gameOver",gameoverImage);
gameOver.scale = 0.5;
restart.addImage("restart",reset);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
}

function draw() {
  
  background(180);
  text("Score: "+ score, 480, 20);
    text(mouseX+","+mouseY,mouseX,mouseY);
  if(gameState==PLAY){
   ground.velocityX=-4; 
  score = score + Math.round(getFrameRate()/60);
  if(ground.x<0){
   ground.x=ground.width/2; 
  }
  if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
      
    }
  trex.velocityY=trex.velocityY+gravity
  spawnClouds();
  spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
      gameState=END;
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_rest.png",trexCollide);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    restart1();
  }
  trex.collide(invisibleGround); 
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+score/100);
    
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage("obstacle1.png",obstacle1)
        break;
        case 2:obstacle.addImage("obstacle2.png",obstacle2)
        break;
      case 3:obstacle.addImage("obstacle3.png",obstacle3)
        break;
        case 4: obstacle.addImage("obstacle4.png",obstacle4)
        break;
        case 5:obstacle.addImage("obstical5.png",obstacle5)
        break;
        case 6:
        obstacle.addImage("obstical6.png",obstacle6)
        break;
        default:
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function restart1(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("trexRunning",trexRunning);
  
  score = 0;
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("Cloud.png",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
