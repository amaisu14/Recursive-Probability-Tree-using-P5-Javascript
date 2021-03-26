// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

var angle = 0;
var slider;
var pesa=3;

var c='white';
var hits=new Array();
var currentCombination="";

var button;
function setup() {
  createCanvas(1000, 500);
  input=createInput("0","number");
//input.input(draw);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
//slider.input(draw);
	//noLoop();
  button = createButton('Download Comb.');
  button.position(20, 20);
  button.mousePressed(downloadHitsAsJson);
input.input(redraw);
slider.input(redraw);
}

 function downloadHitsAsJson(){
	var exportName="Hits";
	var exportObj=hits;
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
console.log("CLICK");
  }
var toFind=0;
var combinations=0;
var firstLine=0;

var five=0;
function draw(){

hits=[];
currentCombination="";
firstLine=0;
  combinations=0;
  background(51);
  angle = slider.value();
toFind=input.value();
  stroke(255);
  translate(500, height);
var dices=5;
  branch(500,dices,0,"");
  fill(255);
textSize(20);
  text(combinations+' / '+Math.pow(6,dices),-480,-420);
  text('P='+(combinations/Math.pow(6,dices)),-480,-400);
noLoop();
  //console.log(hits);
//console.log(JSON.stringify(hits));

}
var invert=0;
function branch(len, times,found5,currentCombination) {
if(times==0){
	found5==(toFind) ? c="red" : c="white";			
}
stroke(c);
if(firstLine){
	line(0, 0, 0, -len);
	translate(0, -len);
}
else{
	firstLine=1;
}

if (times > 0) {
	//6
	push();
	rotate(angle*0.9);
	branch(len * 0.5,times-1,found5+1,currentCombination+"6");
	pop();
	//5
	push();
	rotate(angle*0.5);
	branch(len * 0.5,times-1,found5,currentCombination+"5");
	pop(); 
	//4   
	push();
	rotate(angle*0.1);
	branch(len * 0.5,times-1,found5,currentCombination+"4");
	pop();
	//3
	push();
	rotate(-angle*0.1);
	branch(len * 0.5,times-1,found5,currentCombination+"3");
	pop();
	//2
	push();
	rotate(-angle*0.5);
	branch(len * 0.5,times-1,found5,currentCombination+"2");
	pop();
	//1
	push();
	rotate(-angle*0.9);
	branch(len * 0.5,times-1,found5,currentCombination+"1");
	pop();
  }
else{
	
	if(found5==toFind){
		hits.push(currentCombination);
		currentCombination="";
		combinations++;
		found5=0;
	}

}
c="white";

  //line(0, 0, 0, -len * 0.67);
}
