/* @pjs preload="keyboard.png,keycolormap.png"; */

var keyboard,       //image of the keyboard
    kbdcopy,        //resized image of the keyboard (visible)
    keycolormap,    //colormap of the keys (hidden)
    imageRatio,     //ratio of the image h/w    
    keyboardWidth,  
    //keyboardHeight,
    scaleFactor = 1;    //scaling factor of the image

const FOLDER = 'keys/', EXT = '.wav',
      INDEX_START = 53, INDEX_END = 79,
      INDEX_TOTAL = 1 + INDEX_END - INDEX_START,
      sounds = Array(INDEX_TOTAL);
 
function preload() {
    for (let i = 0; i < INDEX_TOTAL; ++i){
        sounds[i] = loadSound(FOLDER + (i + INDEX_START) + EXT);
    }
    keyboard=loadImage("keyboard.png", img => kbdcopy = img.get());
    keycolormap=loadImage("keycolormap.png");
}

function setup()   {
    createCanvas(windowWidth, windowHeight);
    colorMode(RGB, 255);
    imageRatio = keyboard.height/keyboard.width;
    //print("imageRatio: "+imageRatio);
  }

function draw() {
    background(255);
    image(kbdcopy,0,0);
    textSize(18);
    text("TinyKeys v.0.04 Max Neupert, 2017",10,410);
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

