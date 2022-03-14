// Art 22 Final Project
// By Max Ladabaum for UCSB's ART 22 taught by Prof. Kamandy
// All code is my own. Written from 2/25-3/11.
//
// Documentation can be found in the README of the following public repo:
// https://github.com/maxladabaum/flowers
// 
// How to run locally: 
// 0) Clone the entire repo to you local computer.
// 1) Using terminal, change directory into the folder
// containing all of the project files you just cloned.
// Note for Anshul + Prof Kamandy: a pre-cloned folder is labeled “Max_Ladabaum_final_project”
// 2) Make sure you have node.js installed. If you don’t, install it now. 
// 3) Change the socket.io connection to local in function setup()
// 4) In terminal, while still in the directory from step 1, run the
// command “node server.js”. The website should now run on localhost 
// port 3000 (type localhost:3000 into any browser). 

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

// preloads font to avoid a bug caused by client computer speed
function preload() {
    font1 = loadFont("Dion-vdDD.otf");
}

function setup() {
    //sets a bunch of fields to their starting values. 
    initializeFields();

    createCanvas(windowWidth, windowHeight);

    //initializes 3 new flower objects
    GreenFlower1 = new GreenFlower();
    PinkFlower1 = new PinkFlower();
    RedFlower1 = new RedFlower();

    //IMPORTANT!!!!!!!!!! CHANGE SOCKET.IO CONNECTION
    //For public web, connect socket to heroku by uncommenting
    //the heroku connection and commenting out the local connection.
    //For local, connect socket to local by uncommenting the local
    //connection and commenting out the heroku connection.
    //HEROKU CONNECTION
    socket = io.connect('https://give-flowers.herokuapp.com');
    //LOCAL CONNECTION
    //socket = io.connect('http://localhost:3000')

    //Assigns functions when messages are recieved from other clients or servers.
    socket.on('sentSync', getSync);
    socket.on('requestSync', syncRequested);
    socket.on('click', updateSwitch);

    background(0);

    //Attempts to synchronize with clients or servers that are already running.
    requestSync();

    //Sets font to the font we loaded in preload()
    textFont(font1);

    //Redirects to the home screen.
    homeScreen();
}

//sets a bunch of fields to their starting values.
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

//runs when "click" message is received.  Updates the flower switch value.
function updateSwitch(updatedSwitchVal) {
    recSwitchVal += updatedSwitchVal;
    console.log("total switchVal " + recSwitchVal);
}

//asks to sync to other clients
function requestSync() {
    socket.emit('requestSync');
    console.log('requested a sync');
}

//runs when a client receives a sync request from another client. 
//Sends back a sync value.
function syncRequested() {
    socket.emit('sentSync', recSwitchVal);
    console.log('sent the sync ' + recSwitchVal);
}

//runs when a client recieves a sync valye from another client.
//updates the flower switch valus so that all clients share the same value.
function getSync(updatedSwitchVal) {
    recSwitchVal = updatedSwitchVal;
    console.log("synced switch val is now " + recSwitchVal);
}

//runs whenever the mouse is clicked
function mouseClicked() {
    prev_screen = "other";

    //Reactions to "send flowers" button being clicked
    if (mouseX > windowWidth / 2 - 157 && mouseX < windowWidth / 2 - 157 + 300 && mouseY > 200 && mouseY < 300 && screen == "homeScreen") {
        if (already_sent == false) {
            //emits a click message that adds 1 to the switch value of all clients
            sendSwitchVal = 1;
            socket.emit('click', sendSwitchVal);

            //shows the flowers sent screen
            flowersSent();
            screen = "flowersSent";
        }
        else {
            //shows the flowers already sent screen
            alreadySent();
            screen = "alreadySent";
        }
        already_sent = true;
    }

    //Reactions to "request flowers" button being clicked
    if (mouseX > windowWidth / 2 - 192 && mouseX < windowWidth / 2 - 192 + 370 && mouseY > 400 && mouseY < 500 && screen == "homeScreen") {
        if (recSwitchVal > 0) {
            //emits a click message that subtracts 1 from the switch value of all clients
            sendSwitchVal = -1;
            socket.emit('click', sendSwitchVal);

            //shows flowers screen
            showFlowers();
            screen = "showFlowers";
            prev_screen = "homeScreen";
        }
        else {
            //shows no flowers screen
            noFlowers();
            screen = "noFlowers";
        }
    }

    //Reactions to "back" button being clicked
    if (mouseX > 7 * windowWidth / 8 - 107 && mouseX < 7 * windowWidth / 8 + 107 && mouseY > 100 && mouseY < 200) {
        //checks that the current screen contains a back button
        if (screen == "noFlowers" || screen == "alreadySent" || screen == "flowersSent") {
            //shows the home screen
            homeScreen();
            screen = "homeScreen";
        }
    }

    //Goes to the home screen if the user clicks anywhere on the flowers screen
    if (screen == "showFlowers" && prev_screen != "homeScreen") {
        homeScreen();
        screen = "homeScreen";
    }

    //Sychronizes values across all clients
    requestSync();
}

function draw() {
}

//p5.js code for the home screen.
function homeScreen() {
    background(0);
    noStroke();

    //give flowers button
    fill(189, 42, 137, 220);
    var width = 300;
    rect(windowWidth / 2 - width / 2 - 7, 200, 300, 100, 8, 8, 8, 8);
    fill(46, 144, 219, 220);
    rect(windowWidth / 2 - width / 2, 207, 286, 86, 8, 8, 8, 8);
    fill(219, 199, 55, 220);
    textSize(48);
    text("GIVE FLOWERS", windowWidth / 2 - width / 2 + 8, 265);

    //request flowers button
    var width = 370;
    fill(189, 42, 137, 220);
    rect(windowWidth / 2 - width / 2 - 7, 400, 370, 100, 8, 8, 8, 8);
    fill(46, 144, 219, 220);
    rect(windowWidth / 2 - width / 2, 407, 356, 86, 8, 8, 8, 8);
    fill(219, 199, 55, 220);
    textSize(48);
    text("REQUEST FLOWERS", windowWidth / 2 - width / 2 + 10, 465);
}

//p5.js code for sent flowers screen
function flowersSent() {

    //thanks for sending flowers 
    background(0);
    noStroke();
    var width = 650;
    textSize(48);
    fill(219, 199, 55, 220);
    text("THANK YOU FOR SENDING FLOWERS", windowWidth / 16, 165);

    //back button
    var width = 200;
    fill(189, 42, 137, 220);
    rect(7 * windowWidth / 8 - width / 2 - 7, 100, 200, 100, 8, 8, 8, 8);
    fill(46, 144, 219, 220);
    rect(7 * windowWidth / 8 - width / 2, 107, 186, 86, 8, 8, 8, 8);
    fill(219, 199, 55, 220);
    textSize(48);
    text("GO BACK", 7 * windowWidth / 8 - width / 2 + 10, 165);
}

//p5.js code for no flowers screen
function noFlowers() {

    //nobody sent you flowers
    background(0);
    noStroke();
    var width = 650;
    textSize(48);
    fill(219, 199, 55, 220);
    text("SORRY, NOBODY SENT YOU FLOWERS", windowWidth / 16, 165);

    //back button
    var width = 200;
    fill(189, 42, 137, 220);
    rect(7 * windowWidth / 8 - width / 2 - 7, 100, 200, 100, 8, 8, 8, 8);
    fill(46, 144, 219, 220);
    rect(7 * windowWidth / 8 - width / 2, 107, 186, 86, 8, 8, 8, 8);
    fill(219, 199, 55, 220);
    textSize(48);
    text("GO BACK", 7 * windowWidth / 8 - width / 2 + 10, 165);
}

//p5.js code for already sent flowers screen
function alreadySent() {

    //you already sent flowers
    background(0);
    noStroke();
    var width = 650;
    textSize(48);
    fill(219, 199, 55, 220);
    text("YOU ALREADY SENT FLOWERS", windowWidth / 16, 165);

    //back button
    var width = 200;
    fill(189, 42, 137, 220);
    rect(7 * windowWidth / 8 - width / 2 - 7, 100, 200, 100, 8, 8, 8, 8);
    fill(46, 144, 219, 220);
    rect(7 * windowWidth / 8 - width / 2, 107, 186, 86, 8, 8, 8, 8);
    fill(219, 199, 55, 220);
    textSize(48);
    text("GO BACK", 7 * windowWidth / 8 - width / 2 + 10, 165);
}

//p5.js code that generates up to 15 random flowers
function showFlowers() {

    for (var i = 0; i < 15; i++) {
        //sets ranges for random values
        var da_color = int(random(0, 4));
        var da_petals = int(random(0, 4));
        var da_size = random(1.5, 5);
        var transx = int(random(100, windowWidth - 100));
        var transy = int(random(100, windowHeight - 100));

        var a_bool = true;

        push();
        //translates a random amount
        translate(transx, transy);

        //initially sets the background without reseting after each flower
        if (i == 0) {
            background(0);
        }

        //generates a flower based on random numbers
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

//////////////////////////////////////////////////////////////
//CLASSES

class GreenFlower {

    //loads a hand drawn green flower petal
    constructor() {
        petal_green = loadImage("petal_green.png");
    }

    //draws a single petal
    greenPetal(size) {
        image(petal_green, 0, 0, green_petal_width / size, green_petal_height / size);
    }

    //draws flower with 9 petals. Flower can be scaled to any size.
    fullFlower9(size) {
        for (var i = 0; i < 9; i++) {
            this.greenPetal(size);
            translate(-35 / size, -75 / size);
            rotate(radians(360 / 9));
        }
        fill(0);
        circle(85 / size, -85 / size, 190 / size);
    }

    //draws flower with 7 petals. Flower can be scaled to any size.
    fullFlower7(size) {
        for (var i = 0; i < 7; i++) {
            this.greenPetal(size);
            translate(-25 / size, -80 / size);
            rotate(radians(360 / 7));
        }
        fill(0);
        circle(70 / size, -67 / size, 140 / size);
    }

    //draws flower with 5 petals. Flower can be scaled to any size.
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

    //loads a hand drawn red flower petal
    constructor() {
        petal_red = loadImage("petal_red.png");
    }

    //draws a single petal
    redPetal(size) {
        image(petal_red, 0, 0, red_petal_width / size, red_petal_height / size);
    }

    //draws flower with 9 petals. Flower can be scaled to any size.
    fullFlower9(size) {
        for (var i = 0; i < 9; i++) {
            this.redPetal(size);
            translate(-35 / size, -75 / size);
            rotate(radians(360 / 9));
        }
        fill(0);
        circle(86 / size, -85 / size, 200 / size);
    }

    //draws flower with 7 petals. Flower can be scaled to any size.
    fullFlower7(size) {
        for (var i = 0; i < 7; i++) {
            this.redPetal(size);
            translate(-25 / size, -80 / size);
            rotate(radians(360 / 7));
        }
        fill(0);
        circle(71 / size, -66 / size, 150 / size);
    }

    //draws flower with 5 petals. Flower can be scaled to any size.
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

    //loads a hand drawn pink flower petal
    constructor() {
        petal_pink = loadImage("petal_pink.png");
    }

    //draws a single petal
    pinkPetal(size) {
        image(petal_pink, 0, 0, pink_petal_width / size, pink_petal_height / size);
    }

    //draws flower with 9 petals. Flower can be scaled to any size.
    fullFlower9(size) {
        for (var i = 0; i < 9; i++) {
            this.pinkPetal(size);
            translate(-35 / size, -75 / size);
            rotate(radians(360 / 9));
        }
        fill(0);
        circle(85 / size, -85 / size, 200 / size);
    }

    //draws flower with 7 petals. Flower can be scaled to any size.
    fullFlower7(size) {
        for (var i = 0; i < 7; i++) {
            this.pinkPetal(size);
            translate(-25 / size, -80 / size);
            rotate(radians(360 / 7));
        }
        fill(0);
        circle(70 / size, -67 / size, 150 / size);
    }

    //draws flower with 5 petals. Flower can be scaled to any size.
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
