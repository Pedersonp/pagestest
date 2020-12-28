var dotList=[];
var marked=[];
var collapse;
var dotnum=60;
var pog;

function setup() 
{
  let x=0;
  let y=0;
  pog=new central();
  createCanvas(700, 700);
  
  for(let i=0;i<dotnum;i++)
  {
    dotList.push(new dots( random(0,width) , random(0,height), random(0,360) ) )
    x+=dotList[i].getx;
    y+=dotList[i].gety;
  }
  collapse=new p5.Vector(x/dotnum,y/dotnum);
}

function draw() 
{
  colorMode(HSB);
  background(0);
  
  let x=0;
  let y=0;
  
  for(let i=0;i<dotList.length;i++)
  {
    x+=dotList[i].getx;
    y+=dotList[i].gety;
    dotList[i].move(collapse);
    dotList[i].draw();
  }
  collapse= new p5.Vector(x/dotnum,y/dotnum);
  pog.draw(collapse);
}

class dots
{
  constructor(x,y,c)
  {
    this.pos=new p5.Vector(x,y);
    this.c=c;
    this.dif=this.pos.copy();
  }
  
  move(collapse)
  {
    this.dif=collapse.copy();
    this.dif.sub(this.pos);
    this.pos.add(this.dif.normalize());
  }
  
  draw()
  {
    fill(this.c,100,100);
    circle(this.pos.x,this.pos.y,10);
  }
  get getx(){return this.pos.x}
  get gety(){return this.pos.y}
  get getVector(){return this.pos}
}

class central
{
  constructor()
  {
    this.d=20;
  }
  
  draw(collapse)
  {
    fill(100,100,100);
    circle(collapse.x,collapse.y,this.d);
  }
}