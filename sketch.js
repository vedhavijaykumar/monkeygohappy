var monkey, monkey_running, bananaGroup
var banana, bananaImage, obstacle, obstacleImage, obstaclesGroup
var obstacleGroup
var score=0
var ground,invisibleground
var gamestate="play"
var survivaltime=0

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
//creating monkey
  monkey=createSprite(70,300)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.15
 
  //creating ground
  ground=createSprite(200,340,400,20)
  ground.shapeColor="brown"
  
  //creating invisible ground
  invisibleground=createSprite(200,330,400,20)
  invisibleground.visible=false
  //creating groups
 bananaGroup=new Group()
 obstaclesGroup=new Group()

}


function draw() 
{
  background("white")
  text("SCORE"+score,340,30)
  text("SURVIVAL TIME"+survivaltime,200,20)
  if(gamestate==="play")
  {
    
     survivaltime = survivaltime + Math.round(getFrameRate()/60);
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >200 ) 
    {
        monkey.velocityY = -15;
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground)
 
    //to feed the monkey & increase score
    if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      score=score+1;
    }
    spawnObstacles()
    bananafunc();
    
    if(monkey.isTouching(obstaclesGroup))
    {
      reset()
      gamestate="end";
      monkey.velocityY=0;
    }
  }
  
  if(gamestate==="end")
  { 
    text("PRESS R TO RESTART",200,200)
    
    if(keyDown("r")){
   gamestate="play";
   survivaltime=0;  
   obstaclesGroup.destroyEach()  
       bananaGroup.destroyEach()
    }
  }  
  drawSprites();
}

function reset(){
 score=0
  gamestate="end"
  obstaclesGroup.setVelocityXEach(0)
  bananaGroup.setVelocityXEach(0)
  
  obstaclesGroup.setLifetimeEach(-1)
  bananaGroup.setLifetimeEach(-1)
 
  
}




function bananafunc(){
  //creating banana
 if(frameCount%80===0){
  banana=createSprite(350,round(random(120,200)))
  banana.addImage("banana",bananaImage)
   banana.velocityX=-7
  banana.scale=0.15
  banana.lifetime=300
  bananaGroup.add(banana)
 }
   
}

function spawnObstacles(){
  //creating obsctacles
  if(frameCount%170===0){
  obstacle=createSprite(350,305,20,20)  
  obstacle.addImage(obstacleImage)  
  obstacle.velocityX=-5  
  obstacle.lifetime=300 
  obstacle.scale=0.15 
  obstaclesGroup.add(obstacle)   
  } 
}





