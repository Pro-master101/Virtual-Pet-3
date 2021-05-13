class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage('images/Milk.png');
    }
    getFoodStock() {
        return this.foodStock;
        
    }

    updateFoodStock(foodstock) {
        this.foodStock = foodstock;
    }

    display() {
        background(46,139,87);
        fill("white");
        textSize(18);
        if(lastFed > 12) {
            text("Last Feed : "+ lastFed%12 + " PM", 50,30);
        } else if(lastFed == 0) {
            text("Last Feed: 12 AM",50,30);
        } else if(lastFed == 12) {
            text("Last Feed: 12 PM",50,30); 
        } else {
            text("Last Feed: "+ lastFed + " AM", 50,30);
        }
        
        var x =  80
        var y = 100
        imageMode(CENTER)
        image(this.image,720,220,70,70)
        
        if(this.foodStock !== 0) {
            for(var i = 0;i < this.foodStock; i++) {
                if(i % 10 == 0) {
                    x = 80;
                    y += 50;
                }
                image(this.image,x,y,50,50)
                x += 30;
            }
        }
    }
    
    bedroom() {
        background(bedroom)
    }

    garden() {
        background(garden)
    }
    
    washroom() {
        background(washroom)
    }
}