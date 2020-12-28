var d;
var count=0;
function setup() 
{
createCanvas(1000,500)
  d=new dice();
}

function draw() 
{
  count++;
  background(0);
  d.fall();
  d.bounce();
  d.land();
  d.draw(count);
}


class dice
{
  constructor()
  {
    this.x=50;
    this.y=random(0,350);
    this.v=0;
    this.g=1;
    this.f=0;
    this.landed=false;
    this.yStore=[];
    this.list=[1,2,3,4,5,6];
  } 
  fall()
  {
    this.v+=this.g;
    this.y+=this.v;
    this.yStore.push(this.y);
    if(this.yStore.length>3)this.yStore.shift();
    if(!this.landed)this.x++;
  }
  bounce()
  {
    if(this.y>height-30)
    {
      if(this.landed)this.y=height-25;
      else this.y=height-30;
      this.v*=-0.95;
    }
  }
  land()
  {
    if(this.yStore[0]>=height-30 && this.yStore[1]>=height-30 && this.yStore[2]>=height-30)this.landed=true;
  }
  draw(count)
  {
    fill(255,255,255)
    if(this.landed==true)this.final();
    else this.spin(count);
    
  }
  spin(count)
  {
    push();
    translate(this.x,this.y);
    rotate(count);
    switch(random(this.list))
    {
      case 1:this.face1();break;
      case 2:this.face2();break;
      case 3:this.face3();break;
      case 4:this.face4();break;
      case 5:this.face5();break;
      case 6:this.face6();break;
    }
    pop();
  }
  final()
  {
    if(this.f==0)this.f=random(this.list);
    push();
    translate(this.x,this.y);
    switch(this.f)
    {
      case 1:this.face1();break;
      case 2:this.face2();break;
      case 3:this.face3();break;
      case 4:this.face4();break;
      case 5:this.face5();break;
      case 6:this.face6();break;
    }
    pop();
  }
  face1()
  {
    square(-25,-25,50);
    fill(0,0,0);
    circle(0,0,10);
  }
  face2()
  {
    square(-25,-25,50);
    fill(0,0,0);
    circle(-15,-15,10);
    circle(15,15,10);
  }
  face3()
  {
    square(-25,-25,50);
    fill(0,0,0);
    circle(-15,-15,10);
    circle(0,0,10);
    circle(15,15,10);
  }
  face4()
  {
    square(-25,-25,50);
    fill(0,0,0);
    circle(-15,-15,10);
    circle(15,-15,10);
    circle(-15,15,10);
    circle(15,15,10);
  }
  face5()
  {
    square(-25,-25,50);
    fill(0,0,0);
    circle(-15,-15,10);
    circle(15,-15,10);
    circle(-15,15,10);
    circle(15,15,10);
    circle(0,0,10);
  }
  face6()
  {
    square(-25,-25,50);
    fill(0,0,0);
    circle(-15,-15,10);
    circle(15,-15,10);
    circle(-15,15,10);
    circle(15,15,10);
    circle(-15,0,10);
    circle(15,0,10);
  }
}