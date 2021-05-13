//Create variables here
var dogimg, dogimg2,dog
var database
var foodstock,food
var foodObject;
var addfood;
var lastFed;
var bedroom,garden,washroom;
var gameState,readState;
var currentTime;
var feedTime;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodObject = new Food();
  dog = createSprite(250,400,15,15);
  feedTime = database.ref('FeedTime'); 
  feedTime.on("value",function(data) {
    lastFed = data.val();
  })

  
  
  
  dog.addImage(dogImg);
  dog.scale = 0.25;
  foodstock = database.ref('Food')
  foodstock.on("value",readStock)
  
  feed = createButton("Feed the Dog")
  feed.position(650,90);
  feed.mousePressed(feedDog);
  addfood = createButton("Add Food")
  addfood.position(750,90)
  addfood.mousePressed(addFood)

  readState = database.ref('gameState');
  readState.on("value",function(data) {
    gameState = data.val();
  })
} 


function draw() {  
  
 currentTime = hour();
 if(currentTime == (lastFed + 1)) {
   update("playing")
   foodObject.garden();
 } else if (currentTime == (lastFed + 2)) {
   update("sleeping")
   foodObject.bedroom();
 } else if (currentTime > (lastFed + 2)&& currentTime <= (lastFed  + 4)) {
  update("bathing");
  foodObject.washroom();
 } else {
   update("hungry")
   foodObject.display();
 }
 if(gameState !== "hungry") {
   feed.hide();
   addfood.hide();
   dog.remove();
 } else {
   feed.show();
   addfood.show();
   dog.addImage(dogImg);
 }
 

  drawSprites();                                                                            
  //add styles here 

  
}


function readStock(data) {
  food = data.val();
  foodObject.updateFoodStock(food);

}

function addFood() {
  
  database.ref('/').update({
    Food : food + 1
  })
}

function feedDog() {
  dog.addImage(dogImg2);
  milk = createSprite(150,380,10,10)
  milk.addImage(foodObject.image)
  milk.scale = 0.1
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref('/').update({
    Food : foodObject.getFoodStock(),
    FeedTime : hour(),
    gameState : "hungry"
  }) 
    
  
}

function update(state) {
  database.ref('/').update({
    gameState : state
  })
}

