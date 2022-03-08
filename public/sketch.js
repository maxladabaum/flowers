var socket

let GreenFlower1;
let PinkFlower1;
let RedFlower1;

var sendSwitchVal;
var recSwitchVal;
var flowers_given;

var petal_green;
var green_petal_width;
var green_petal_height;
var petal_red;
var red_petal_width;
var red_petal_height;
var petal_pink;
var pink_petal_width;
var pink_petal_height;

let font1;

function setup() {
    font1 = loadFont("Dion-vdDD.otf");
    initializeFields();
    createCanvas(windowWidth, windowHeight);
    GreenFlower1 = new GreenFlower();
    PinkFlower1 = new PinkFlower();
    RedFlower1 = new RedFlower();

    //socket = io.connect('https://give-flowers.herokuapp.com');
    socket = io.connect('http://localhost:3000')
    socket.on('sentSync', getSync);
    socket.on('requestSync', syncRequested);
    socket.on('click', updateSwitch);

    background(0);
    textFont(font1);

    requestSync();
    homeScreen();
}

function initializeFields() {
    sendSwitchVal = 0;
    recSwitchVal = 0;

    green_petal_width = 518 / 5;
    green_petal_height = 794 / 5;
    pink_petal_width = 521 / 5;
    pink_petal_height = 799 / 5;
    red_petal_width = 495 / 5;
    red_petal_height = 782 / 5;
}

function updateSwitch(updatedSwitchVal){
    recSwitchVal+=updatedSwitchVal;
    console.log("total switchVal " + recSwitchVal);
}

function requestSync(){
    socket.emit('requestSync');
    console.log('requested a sync');
}

function syncRequested(){
    socket.emit('sentSync', recSwitchVal);
    console.log('sent the sync ' + recSwitchVal);
}

function getSync(updatedSwitchVal){
    recSwitchVal=updatedSwitchVal;
    console.log("synced switch val is now " + recSwitchVal);
}

function mouseClicked() {
    if (mouseX > windowWidth/2-157 && mouseX < windowWidth/2-157+300 && mouseY > 200 && mouseY < 300) {
        sendSwitchVal = 1;
        socket.emit('click', sendSwitchVal);

        background(0);
        fill(219,199,55,220);
        textSize(48);
        text("FLOWERS SENT", 40, 120);
    }

    if (mouseX > windowWidth/2-192 && mouseX < windowWidth/2-192+370 && mouseY > 400 && mouseY < 500 && recSwitchVal > 0) {
        sendSwitchVal = -1;
        socket.emit('click', sendSwitchVal);

        showFlowers();
    }

    if (mouseX > windowWidth/2-192 && mouseX < windowWidth/2-192+370 && mouseY > 400 && mouseY < 500 && recSwitchVal <= 0) {
        
        background(0);
        fill(219,199,55,220);
        textSize(48);
        text("SORRY, NOBODY SENT YOU FLOWERS", 40, 120);
    }
    if (mouseY>500) {
        homeScreen();
    }
    requestSync();
}

function draw() {
}


function homeScreen() {
    background(0);
    noStroke();
    
    fill(219,199,55,220);
    var width = 300;
    rect(windowWidth/2-width/2-7,200,300,100,   8,8,8,8);
    fill(0);
    rect(windowWidth/2-width/2,207,286,86,   8,8,8,8);
    fill(219,199,55,220);
    textSize(48);
    text("GIVE FLOWERS", windowWidth/2-width/2+8, 265);
    
    var width = 370;
    rect(windowWidth/2-width/2-7,400,370,100,   8,8,8,8);
    fill(0);
    rect(windowWidth/2-width/2,407,356,86,   8,8,8,8);
    fill(219,199,55,220);
    textSize(48);
    text("REQUEST FLOWERS", windowWidth/2-width/2+10, 465);
}




function showFlowers() {
    console.log('window width is '+ windowWidth);
    console.log('window height is '+ windowHeight);
    
    for (var i = 0; i < 10; i++) {

        var da_color = int(random(0,4));
        var da_petals = int(random(0,4));
        var da_size = random(1.5,5);
        var transx = int(random(100,windowWidth-100));
        var transy = int(random(100,windowHeight-100));
        var a_bool = true;


        push();
        translate(transx,transy);

        console.log("xcord is " + transx);
        console.log("ycord is " + transy);
        console.log("the current i is "+ i);

        if (i==0){
            background(0);
        }
        
        if (da_color == 1 && a_bool) {
            if (da_petals == 1) {
                RedFlower1.fullFlower5(da_size);
            }
            if (da_petals == 2) {
                RedFlower1.fullFlower7(da_size);
            }
            if (da_petals == 3) {
                RedFlower1.fullFlower9(da_size);
            }
        }

        if (da_color == 2 && a_bool) {
            if (da_petals == 1) {
                GreenFlower1.fullFlower5(da_size);
            }
            if (da_petals == 2) {
                GreenFlower1.fullFlower7(da_size);
            }
            if (da_petals == 3) {
                GreenFlower1.fullFlower9(da_size);
            }
        }

        if (da_color == 3 && a_bool) {
            if (da_petals == 1) {
                PinkFlower1.fullFlower5(da_size);
            }
            if (da_petals == 2) {
                PinkFlower1.fullFlower7(da_size);
            }
            if (da_petals == 3) {
                PinkFlower1.fullFlower9(da_size);
            }
        }
        pop();
    }
}








//classes
class GreenFlower {
    constructor() {
        petal_green = loadImage("petal_green.png");  
    }

    greenPetal(size) {
        image(petal_green, 0, 0, green_petal_width / size, green_petal_height / size);
    }

    fullFlower9(size) {
        for (var i = 0; i < 9; i++) {
            this.greenPetal(size);
            translate(-35 / size, -75 / size);
            rotate(radians(360 / 9));
        }
        fill(0);
        circle(85 / size, -85 / size, 190 / size);
    }
    
    fullFlower7(size) {
        for (var i = 0; i < 7; i++) {
            this.greenPetal(size);
            translate(-25 / size, -80 / size);
            rotate(radians(360 / 7));
        }
        fill(0);
        circle(70 / size, -67 / size, 140 / size);
    }
    
    fullFlower5(size) {
        for (var i = 0; i < 5; i++) {
            this.greenPetal(size);
            translate(15 / size, -90 / size);
            rotate(radians(360 / 5));
        }
        fill(0);
        circle(70 / size, -35 / size, 90 / size);
    }
}


class RedFlower {
    constructor() {
        petal_red = loadImage("petal_red.png");  
    }

    redPetal(size) {
        image(petal_red, 0, 0, red_petal_width / size, red_petal_height / size);
    }

    fullFlower9(size) {
        for (var i = 0; i < 9; i++) {
            this.redPetal(size);
            translate(-35 / size, -75 / size);
            rotate(radians(360 / 9));
        }
        fill(0);
        circle(86 / size, -85 / size, 200 / size);
    }
    
    fullFlower7(size) {
        for (var i = 0; i < 7; i++) {
            this.redPetal(size);
            translate(-25 / size, -80 / size);
            rotate(radians(360 / 7));
        }
        fill(0);
        circle(71 / size, -66 / size, 150 / size);
    }
    
    fullFlower5(size) {
        for (var i = 0; i < 5; i++) {
            this.redPetal(size);
            translate(15 / size, -90 / size);
            rotate(radians(360 / 5));
        }
        fill(0);
        circle(69 / size, -34 / size, 90 / size);
    }
}


class PinkFlower {
    constructor() {
        petal_pink = loadImage("petal_pink.png");  
    }

    pinkPetal(size) {
        image(petal_pink, 0, 0, pink_petal_width / size, pink_petal_height / size);
    }

    fullFlower9(size) {
        for (var i = 0; i < 9; i++) {
            this.pinkPetal(size);
            translate(-35 / size, -75 / size);
            rotate(radians(360 / 9));
        }
        fill(0);
        circle(85 / size, -85 / size, 200 / size);
    }
    
    fullFlower7(size) {
        for (var i = 0; i < 7; i++) {
            this.pinkPetal(size);
            translate(-25 / size, -80 / size);
            rotate(radians(360 / 7));
        }
        fill(0);
        circle(70 / size, -67 / size, 150 / size);
    }
    
    fullFlower5(size) {
        for (var i = 0; i < 5; i++) {
            this.pinkPetal(size);
            translate(15 / size, -90 / size);
            rotate(radians(360 / 5));
        }
        fill(0);
        circle(70 / size, -35 / size, 100 / size);
    }
}