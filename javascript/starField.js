var dotList=[];
const grav=10;//the larger the number the less gravity there is
const simnum=3;

function setup() 
{
  createCanvas(700, 700);
  
  /*
format for creating bodies  
dotList.push(new dot(X cord,Y cord,radius,color,mass,new p5.Vector(x direction,y direction)));
cp: dotList.push(new dot(,,,,,new p5.Vector(,)));
  */
  
  switch(simnum)
    {
    case 0:    
      dotList.push(new dot(350,350,80,60,10000,new p5.Vector(0,0)));
      dotList.push(new dot(600,350,40,0,100,new p5.Vector(0,2)));
      //dotList.push(new dot(650,350,10,180,1,new p5.Vector(0,1)));
      break;  
             
    case 1:
      dotList.push(new dot(200,350,10,0,50,new p5.Vector(0,17)));
      dotList.push(new dot(500,350,10,180,50,new p5.Vector(0,-17)));
      dotList.push(new dot(350,500,10,0,1,new p5.Vector(-8.5,0)));
      dotList.push(new dot(350,200,10,0,1,new p5.Vector(8.5,0)));
      break;
      
    case 2: 
      dotList.push(new dot(350,350,50,60,100000,new p5.Vector(0,0)));
      dotList.push(new dot(550,350,25,0,10,new p5.Vector(0,2)));
      break;
    
    case 3:
      dotList.push(new dot(270,350,10,0,1000,new p5.Vector(0,0.7)));
      dotList.push(new dot(430,350,10,180,1000,new p5.Vector(0,-0.7)));
      dotList.push(new dot(650,350,10,60,1,new p5.Vector(0,2.5)));
      break;
    
    case 4:
      dotList.push(new fixed(350,350,10,0,100000,new p5.Vector(0,0)));
      dotList.push(new dot(0,0,10,180,100000,new p5.Vector(2,0.5)));
      break;
      
    case 5:
      dotList.push(new dot(0,0,10,180,100000,new p5.Vector(2,0.5)));
      break;
    }
}

function draw() 
{
  colorMode(HSB);
  background(0);
  
  //if(frameCount<70 && frameCount%2==0)dotList.push(new dot(500,350,10,0,1,new p5.Vector(0,3)));

  
  for(let i=0;i<dotList.length;i++)
  {
    dotList[i].gravity(dotList);
    dotList[i].pull(dotList);
  }//the reason for seperate loops is the gravity had to be calculated before the movement
  
  for(let i=0;i<dotList.length;i++)
  {
    dotList[i].move();
    dotList[i].draw();
  }
}

class dot
{
  constructor(x,y,r,c,m,start)
  {
    this.c=c;
    this.r=r;
    this.m=m;
    this.p=new p5.Vector(x,y);
    this.v=start.copy();
  }
  
  draw()
  {
    fill(this.c,100,100);
    circle(this.pos.x,this.pos.y,this.r);
  }
  
  move()
  {
    this.pos.add(this.v);
  }
  gravity(dotList)
  {
    for(let i=0; i<dotList.length; i++)
    {
      let temp=dotList[i].pos.copy();
      temp.sub(this.p);
      this.v.add(temp.setMag((dotList[i].mass)/temp.magSq()));
    }
  }
  
  get pos(){return this.p;}
  get mass(){return this.m;}
  
  
  
  pull(){}
  get magnetism(){return 0}
  get polarity(){return 0}
}

class fixed extends dot
{
  constructor(x,y,r,c,m,start)
  {
    super(x,y,r,c,m,start); 
  }
  
  move(){}
}

class magnet extends dot
{
  constructor(x,y,r,c,m,start,polarity,magnetism)
  {
    super(x,y,r,c,m,start); 
    this.polarity=polarity;
    this.magnetism=magnetism;
  }
  
  pull(dotList)
  {
    for(let i=0; i<dotList.length; i++)
    {
      if(dotList[i].pol==0){}   
      else if(this.polarity!=dotList[i].pol)
      {
        let temp=dotList[i].pos.copy();
        temp.sub(super.p);
        super.v.add(temp.setMag(this.magnetism));
      }
      else if(this.polarity==dotList[i].pol)
      {
        let temp=super.p.copy();
        temp.sub(dotList[i].pos);
        super.v.add(temp.setMag(this.magnetism));
      }
    }
  }
  
  get mag(){return this.magnetism;}
  get pol(){return this.polarity;}
}

class fixedMagnet extends magnet
{
  constructor(x,y,r,c,m,start,polarity,magnetism)
  {
    super(x,y,r,c,m,start,polarity,magnetism); 
  }
  
  move(){}
}