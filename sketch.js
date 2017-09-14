/* @pjs preload="keyboard.png,keycolormap.png"; */

var keyboard;        //image of the keyboard (visible)
var keycolormap;     //colormap of the keys (hidden)

const FOLDER = 'keys/', EXT = '.wav',
      INDEX_START = 53, INDEX_END = 79,
      INDEX_TOTAL = 1 + INDEX_END - INDEX_START,
      sounds = Array(INDEX_TOTAL);
 
function preload() {
  for (let i = 0; i < INDEX_TOTAL; ++i)
    sounds[i] = loadSound(FOLDER + (i + INDEX_START) + EXT);
}
function setup()   {
    createCanvas(displayWidth,384);
    colorMode(RGB, 255);
    keyboard=loadImage("keyboard.png");
    keycolormap=loadImage("keycolormap.png");     
  }

function draw() {
    background(keyboard);
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
      note=keycolormap.get(mouseX,mouseY); //get the color in the hidden image
      note=((red(note))/5);
    //  print("color:"+(note)+" red"+red(note)+" alpha"+alpha(note));
    //  print("red: "+red(note)+"note: "+note);
      midi = note+52
      index = note-1;
      print("note: "+note+", MIDI: "+midi+", index: "+index);
      if (index>-1){
        sounds[index].play();
      }
  }