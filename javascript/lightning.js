const title="Bisou-06-Fuse";
const bins=16;
var song;
var fft;
var lines=[];
var backround;
function preload()
{
  song=loadSound("../../songs/Bisou-06-Fuse.mp3");
}
function setup() 
{
  fft = new p5.FFT();
  backround=new back();
  for(let x=0;x<bins;x++)
  {
    lines.push(new light((360/bins)*x))
  }
  createCanvas(bins*100, 800);
}

function draw() 
{
  if(!song.isPlaying())song.play();
  colorMode(HSB,360,100,100);
  background(0);
  backround.out();
  for(let x=0; x<bins;x++)
  {
      lines[x].comp(fft.analyze(bins)[x]/3.64285);
      lines[x].out(x*100);
      lines[x].clear();
  }
}
class back
{
  constructor()
  {
    
  }
  out()
  {
    noStroke();
    for(let x=0;x<bins*100;x+=100)
    {
    fill(0,4,22);
    rect(20+x,0,70,800);
    rect(10+x,10,90,780);
    fill(0,0,0);
    rect(20+x,25,70,750)
    }
  }
}
class light
{
  constructor(color)
  {
    this.points=[];
    this.range=0;
    this.color=color;
  }
  comp(range)
  {
    this.points.push(35);
    for(let x=1;x<75;x++)
    {
      this.points.push(random(0,range)+(35-range/2))  
    }
    this.points.push(35);
  }
  out(shift)
  {
    stroke(this.color,100,100);
    for(let x=0;x<75;x++)
    {
      line(this.points[x]+shift+20,25+x*10,this.points[x+1]+shift+20,35+x*10);
    }
  }
  clear()
  {
    this.points=[];
  }
}