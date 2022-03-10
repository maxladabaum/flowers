var socket;

let GreenFlower1;
let PinkFlower1;
let RedFlower1;

var sendSwitchVal;
var recSwitchVal;

var petal_green;
var green_petal_width;
var green_petal_height;
var petal_red;
var red_petal_width;
var red_petal_height;
var petal_pink;
var pink_petal_width;
var pink_petal_height;
var already_sent;
var screen;
var prev_screen

let font1;

function preload() {
    font1 = loadFont("Dion-vdDD.otf");
}

function setup() {
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

    requestSync();
    textFont(font1);
    homeScreen();
}

function initializeFields() {
    sendSwitchVal = 0;
    recSwitchVal = 0;
    screen = "homeScreen";
    prev_screen = "other";
    already_sent = false;
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
    prev_screen = "other";

    if (mouseX > windowWidth/2-157 && mouseX < windowWidth/2-157+300 && mouseY > 200 && mouseY < 300 && screen == "homeScreen") {
        if (already_sent== false){
            sendSwitchVal = 1;
            socket.emit('click', sendSwitchVal);
            flowersSent();
            screen = "flowersSent";
        }
        else {
            alreadySent();
            screen = "alreadySent";
        }
        already_sent = true;
    }

    if (mouseX > windowWidth/2-192 && mouseX < windowWidth/2-192+370 && mouseY > 400 && mouseY < 500 && screen == "homeScreen") {
        if (recSwitchVal > 0) {
            sendSwitchVal = -1;
            socket.emit('click', sendSwitchVal);
            showFlowers();
            screen = "showFlowers";
            prev_screen = "homeScreen";
        }
        else {
            noFlowers();
            screen = "noFlowers";
        }
    }

    if (mouseX > 7*windowWidth/8-107 && mouseX < 7*windowWidth/8+ 107 && mouseY > 100 && mouseY < 200) {
        if (screen == "noFlowers" || screen == "alreadySent" || screen == "flowersSent") {
            homeScreen();
            screen = "homeScreen";
        }
    }

    if (screen == "showFlowers" && prev_screen != "homeScreen") {
        homeScreen();
        screen = "homeScreen";
    }

    
    requestSync();
}

function draw() {
}


function homeScreen() {
    background(0);
    noStroke();
    
    
    fill(189, 42, 137,220);
    var width = 300;
    rect(windowWidth/2-width/2-7,200,300,100,   8,8,8,8);
    fill(46, 144, 219,220);
    rect(windowWidth/2-width/2,207,286,86,   8,8,8,8);
    fill(219,199,55,220);
    textSize(48);
    text("GIVE FLOWERS", windowWidth/2-width/2+8, 265);
    
    var width = 370;
    fill(189, 42, 137,220);
    rect(windowWidth/2-width/2-7,400,370,100,   8,8,8,8);
    fill(46, 144, 219,220);
    rect(windowWidth/2-width/2,407,356,86,   8,8,8,8);
    fill(219,199,55,220);
    textSize(48);
    text("REQUEST FLOWERS", windowWidth/2-width/2+10, 465);
}

function flowersSent() {

    background(0);
    noStroke();
    var width = 650;
    textSize(48);
    fill(219,199,55,220);
    text("THANK YOU FOR SENDING FLOWERS", windowWidth/16, 165);
    
    var width = 200;
    fill(189, 42, 137,220);
    rect(7*windowWidth/8-width/2-7,100,200,100,   8,8,8,8);
    fill(46, 144, 219,220);
    rect(7*windowWidth/8-width/2,107,186,86,   8,8,8,8);
    fill(219,199,55,220);
    textSize(48);
    text("GO BACK", 7*windowWidth/8-width/2+10, 165);
}

function noFlowers() {

    background(0);
    noStroke();
    var width = 650;
    textSize(48);
    fill(219,199,55,220);
    text("SORRY, NOBODY SENT YOU FLOWERS", windowWidth/16, 165);
    
    var width = 200;
    fill(189, 42, 137,220);
    rect(7*windowWidth/8-width/2-7,100,200,100,   8,8,8,8);
    fill(46, 144, 219,220);
    rect(7*windowWidth/8-width/2,107,186,86,   8,8,8,8);
    fill(219,199,55,220);
    textSize(48);
    text("GO BACK", 7*windowWidth/8-width/2+10, 165);
}

function alreadySent() {

    background(0);
    noStroke();
    var width = 650;
    textSize(48);
    fill(219,199,55,220);
    text("YOU ALREADY SENT FLOWERS", windowWidth/16, 165);
    
    var width = 200;
    fill(189, 42, 137,220);
    rect(7*windowWidth/8-width/2-7,100,200,100,   8,8,8,8);
    fill(46, 144, 219,220);
    rect(7*windowWidth/8-width/2,107,186,86,   8,8,8,8);
    fill(219,199,55,220);
    textSize(48);
    text("GO BACK", 7*windowWidth/8-width/2+10, 165);
}




function showFlowers() {
    console.log('window width is '+ windowWidth);
    console.log('window height is '+ windowHeight);
    
    for (var i = 0; i < 15; i++) {

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
