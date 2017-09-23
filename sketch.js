/* @pjs preload="keyboard.png,keycolormap.png"; */

var keyboard,       //image of the keyboard
    kbdcopy,        //resized image of the keyboard (visible)
    keycolormap,    //colormap of the keys (hidden)
    imageRatio,     //ratio of the image h/w    
    keyboardWidth,  
    //keyboardHeight,
    keysdown = new Array(),
    previouskeysdown = new Array(),
    scaleFactor = 1;    //scaling factor of the image

const FOLDER = 'keys/', EXT = '.wav',
      INDEX_START = 53, INDEX_END = 79,
      INDEX_TOTAL = 1 + INDEX_END - INDEX_START,
      sounds = Array(INDEX_TOTAL);

//sounds.playMode(restart); // for some reason this throws an error even though it's in the sound.p5,js reference

function preload() {
    for (let i = 0; i < INDEX_TOTAL; ++i){
        sounds[i] = loadSound(FOLDER + (i + INDEX_START) + EXT);
    }
    keyboard=loadImage("keyboard.png", img => kbdcopy = img.get());
    keycolormap=loadImage("keycolormap.png");
}

function setup()   {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("keyboard");
    colorMode(RGB, 255);
    imageRatio = keyboard.height/keyboard.width;
    //print("imageRatio: "+imageRatio);
    windowResized();
  }

function draw() {
    background(160,160,170);
    image(kbdcopy,0,0);
    textSize(17);
    fill(105);
    text("TinyKeys v.0.13 Max Neupert, 2017",10,kbdcopy.height+25);
//    text("touches: "+touches.length,10,kbdcopy.height+45);
//    text("keysdown: ",10,kbdcopy.height+65);
//    for (var i=0;i<keysdown.length;i++){
//        text(keysdown[i]+",",100+(i*26),kbdcopy.height+65);
//    }
//        text("previouskeysdown: ",10,kbdcopy.height+85);
//    for (var i=0;i<previouskeysdown.length;i++){
//        text(previouskeysdown[i]+",",160+(i*26),kbdcopy.height+85);
//    }
    touching();
    playing();
    muting();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (windowWidth < keyboard.width){
        kbdcopy = keyboard.get();
        kbdcopy.resize(windowWidth,0);
        keyboardWidth = windowWidth;
        //keyboardHeight = keyboardWidth*imageRatio;
        scaleFactor = keyboardWidth/keyboard.width;
        //print("new scaleFactor: "+scaleFactor);
        }
}

// INTERACTION AND SOUND PLAYING

function touchStarted(){}  //an empty function to stop the default behavior of panning screen

// TOUCH
function touching(){
    var note;
    //var midi;
    fill(255,100,50,100);
    noStroke();
    previouskeysdown = [];
    arrayCopy(keysdown,previouskeysdown); //copy old array
    keysdown = []; //delete old array
	for (let i = 0; i < touches.length; i++) {
        ellipse(touches[i].x, touches[i].y, 85)
        note=keycolormap.get(touches[i].x/scaleFactor,touches[i].y/scaleFactor); //get the color in the hidden image
        note=((red(note))/5);
        //midi = note+52
        note = note-1;
        if (note>-1){
            keysdown.push(note);
        }
    }
    if (touches.length==0){
         keysdown = [];
        }
}

function playing(){
    var note;
    for (let i = 0; i <keysdown.length; i++){
            note=keysdown[i];
                if (previouskeysdown.includes(keysdown[i])){ //check if the key was previosly touched
                    // well, if so, don't trigger again then (empty if clause...)
                }
                else{
                    sounds[note].setVolume(0.5);
                    sounds[note].play(); // if it is a new touch, well then play.
                } 
            
    }
}
function muting(){
    var note;
    for (let i = 0; i <previouskeysdown.length; i++){
            note=previouskeysdown[i];
                if (previouskeysdown.includes(keysdown[i])){ //check if the key was previosly touched
                    // well, if so, then keep it playing (empty if clause...)
                }
                else{
                    sounds[note].fade(0,0.1);
                    sounds[note].stop(0.1); // if it is not touched any more, then stop.
                } 
            
    }
}


// MOUSE
/* Deactivated. Needs some kind of switch to activate this part when on the desktop

var released = true;

function mouseReleased(){
	released = true;
	return false;
}

function mousePressed(){
	if(!released){
		return;
	}
    
	released = false;
    var note;
    var midi;
    var index;
    note=keycolormap.get(mouseX/scaleFactor,mouseY/scaleFactor); //get the color in the hidden image
    note=((red(note))/5);
    midi = note+52
    index = note-1;
    //print("note: "+note+", MIDI: "+midi+", index: "+index);
    if (index>-1){
        sounds[index].play();
    }
}
*/

