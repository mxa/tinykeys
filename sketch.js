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
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}


function setup()   {
    cnv = createCanvas(1920,430);
    centerCanvas();
    // canvas.parent('keyboard');
    colorMode(RGB, 255);
    keyboard=loadImage("keyboard.png");
    keycolormap=loadImage("keycolormap.png");     
  }

function draw() {
    image(keyboard,0,0);
    textSize(18);
    text("TinyKeys v.0.03 Max Neupert, 2017",10,410);
}

//function touchStarted () {
//  var fs = fullscreen();
//  if (!fs) {
//    fullscreen(true);
//  }
//}

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