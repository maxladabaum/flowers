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

function setup() {
    initializeFields();
    createCanvas(800, 800);
    GreenFlower1 = new GreenFlower();
    PinkFlower1 = new PinkFlower();
    RedFlower1 = new RedFlower();

    socket = io.connect('http://localhost:3000')
    socket.on('click', updateSwitch);

    stroke(255);
    background(0);
    fill(255);
    textSize(36);
    text("give flower", 40, 120);
    text("request flower", 40, 220);
}

function initializeFields() {
    sendSwitchVal = -1;
    recSwitchVal = -1;

    green_petal_width = 518 / 5;
    green_petal_height = 794 / 5;
    pink_petal_width = 521 / 5;
    pink_petal_height = 799 / 5;
    red_petal_width = 495 / 5;
    red_petal_height = 782 / 5;
}

function updateSwitch(updatedSwitchVal){
    recSwitchVal=updatedSwitchVal;
    console.log("recieved switchVal" + recSwitchVal)
}

function mouseClicked() {
    if (mouseY>80 && mouseY<200) {
        sendSwitchVal = 1;
        socket.emit('click', sendSwitchVal)

        stroke(255);
        background(0);
        fill(255);
        textSize(36);
        text("flowers sent", 40, 120);
    }
    if (mouseY>200 && mouseY<400 && recSwitchVal > 0) {
        sendSwitchVal = -2;
        socket.emit('click', sendSwitchVal)
        
        background(0);
        translate(200,200);
        RedFlower1.fullFlower9(1);
        translate(200,200);
        PinkFlower1.fullFlower7(1);
        translate(200,250);
        GreenFlower1.fullFlower7(1.3);
        translate(-500,100);
        PinkFlower1.fullFlower5(1);
        translate(50,-300);
        GreenFlower1.fullFlower5(1.4);
    }
    if (mouseY>200 && mouseY<400 && recSwitchVal<0) {
        sendSwitchVal = -3;
        socket.emit('click', sendSwitchVal)
        
        stroke(255);
        background(0);
        fill(255);
        textSize(36);
        text("sorry, nobody sent you flowers", 40, 120);
    }
    if (mouseY>400) {
        sendSwitchVal = -4;
        socket.emit('click', sendSwitchVal)

        stroke(255);
        background(0);
        fill(255);
        textSize(36);
        text("give flower", 40, 120);
        text("request flower", 40, 220);
    }
}

function draw() {
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


