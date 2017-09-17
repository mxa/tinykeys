/* @pjs preload="keyboard.png,keycolormap.png"; */

var keyboard;        //image of the keyboard (visible)
var keycolormap;     //colormap of the keys (hidden)
var cnv;

const FOLDER = 'keys/', EXT = '.wav',
      INDEX_START = 53, INDEX_END = 79,
      INDEX_TOTAL = 1 + INDEX_END - INDEX_START,
      sounds = Array(INDEX_TOTAL);
 
function preload() {
  for (let i = 0; i < INDEX_TOTAL; ++i)
    sounds[i] = loadSound(FOLDER + (i + INDEX_START) + EXT);
    keyboard=loadImage("keyboard.png");
    keycolormap=loadImage("keycolormap.png");
}

var imageRatio;

function setup()   {
    createCanvas(windowWidth, windowHeight);
    colorMode(RGB, 255);

    imageRatio = keyboard.height/keyboard.width;
    print("imageRatio: "+imageRatio);
  }

var keyboardWidth;
var keyboardHeight;
var scaleFactor;

function draw() {
    background(255);
    keyboardWidth = windowWidth;
    keyboardHeight = keyboardWidth*imageRatio;
    scaleFactor = keyboardWidth/keyboard.width;
    print("scaleFactor: "+scaleFactor);
    image(keyboard,0,0,keyboardWidth,keyboardHeight);
    textSize(18);
    text("TinyKeys v.0.03 Max Neupert, 2017",10,410);
}

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
      print("note: "+note+", MIDI: "+midi+", index: "+index);
      if (index>-1){
        sounds[index].play();
      }
}