var list=[];
var titlecolor=0;
const t=80; // control the time allowed between duplicates
const p=30; // control the space needed between circles large is less precise
const q=4; // control the number of circles the program starts with
const s=70; // control the size of the circles
const v=2; // control the speed of the circles
const total=100; //control the max number of the circles
function setup() 
{
  colorMode(HSB,360,100,100);
  createCanvas(1000,1000);
  background(0,0,0);
  for(let x=0; x<q; x++)
  {
    list.push(new ball());
    
  }
}

function draw() 
{
  colorMode(HSB,360,100,100);
  background(350,100,0);
  for(let x=0; x<list.length;x++)
  {
    //console.log(list[x].getx());
    fill(list[x].bcolor(),100,100);
    ellipse(list[x].getx(),list[x].gety(),s,s);
    list[x].move();
    list[x].bounce();
    for(let y=0;y<list.length;y++)
    {
      if(x!=y&&list[x].cool( )>t&&list[y].cool()>t)
      {  
        if(abs(list[x].getx()-list[y].getx())<p&&abs(list[x].gety()-list[y].gety())<p)
        {
          list.push(new ball());
          list[list.length-1].star(list[x].getx(),list[x].gety());
          list[y].reset();
          list[x].reset();
          if(list.length>total)
          {
            list.pop();
          }
        }
      }
    }
  }
  fill(titlecolor,100,100);
  titlecolor++;
  if(titlecolor>360){
    titlecolor=0;
  }
  rect(350,450,300,100);
  //rect(300,450,400,100);
  fill(0,0,0);
  textSize(100);
  text("Parker",350,550);
}

class ball
{
  constructor()
  {
  this.c = random(0,360);
  this.x = 200;
  this.y = 200;
  this.d1 = (random(-1000,1000)/200)*v;
  this.d2 = (random(-1000,1000)/200)*v;
  this.cooldown = 0;
  }
  star(px,py)
  {
    this.x=px;
    this.y=py;
  }
  getx()
  {
    return this.x;
  }
  gety()
  {
    return this.y;
  }
  move()
  {
    this.x+=this.d1;
    this.y+=this.d2;
    this.cooldown+=1;
  }
  bounce()
  {
    if(this.x<35||this.x>965)
    {
      this.d1=this.d1*-1;
    }
    if(this.y<35||this.y>965)
    {
      this.d2=this.d2*-1;
    }
    if(this.x>315&&this.x<685&&this.y>415&&this.y<585)
    {
      if(abs(this.x-315)<abs(this.y-415)&&abs(this.x-315)<abs(this.y-585)||abs(this.x-685)<abs(this.y-415)&&abs(this.x-685)<abs(this.y-585))
      //if(abs(x-265)<abs(y-415)&&abs(x-315)<abs(y-585)||abs(x-685)<abs(y-415)&&abs(x-685)<abs(y-585))
         {
           this.d1=this.d1*-1;
         }
      else
         {
           this.d2=this.d2*-1;
         }
    }
  }
  cool()
  {
    return this.cooldown;
  }
  reset()
  {
    this.cooldown=0;
  }
  bcolor()
  {
    return this.c;
  }
}