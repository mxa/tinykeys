/* @pjs preload="keyboard.png,keycolormap.png"; */

var keyboard;        //image of the keyboard (visible)
var keycolormap;     //colormap of the keys (hidden)

const FOLDER = 'keys/', EXT = '.wav',
      INDEX_START = 53, INDEX_END = 77,
      INDEX_TOTAL = 1 + INDEX_END - INDEX_START,
      sounds = Array(INDEX_TOTAL);
 
function preload() {
  for (let i = 0; i < INDEX_TOTAL; ++i)
    sounds[i] = loadSound(FOLDER + (i + INDEX_START) + EXT);
}
function setup()   {
    createCanvas(1920,384);
    colorMode(RGB, 255);
    keyboard=loadImage("keyboard.png");
    keycolormap=loadImage("keycolormap.png");     
  }

function draw() {
    background(keyboard);
}

function mousePressed()
  {
    var note;  
      note=keycolormap.get(mouseX,mouseY); //get the color in the hidden image
      note=((red(note))/5);
    //  print("color:"+(note)+" red"+red(note)+" alpha"+alpha(note));
    //  print("red: "+red(note)+"note: "+note);
      midi = note+52
      print("MIDI: "+midi);
      sounds[note].play();
  }