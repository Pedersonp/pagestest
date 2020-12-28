var specList=[];
var foodList=[];
const startingFood=100;
const startingSpec=1;

function setup() 
{
  noStroke();
  //frameRate(1000);
  createCanvas(700, 700);
  background(0);
  for(let i=0;i<startingFood;i++)foodList.push(new food());//adds the apropraite amount of food
  
  for(let i=0; i<startingSpec;i++)specList.push(new species());//adds the apropraite amount of specs
}

function draw() 
{
  colorMode(HSB,360,100,100);
  background(0);
  
  //if(frameCount%3==0);foodList.push(new food());
  
  for(let i=0; i<foodList.length;i++)
  {
    foodList[i].draw();
  }//draw loop for all of the food
  
  for(let i=0; i<specList.length;i++)
  {
    specList[i].draw();
    specList[i].move(specList,foodList);
    let temp=specList[i].eatCheck();
    if(temp!=-1)foodList.splice(temp,1);
  }//draw loop for all of the specs
  
  
}


class species
{
  constructor()
  {
    this.pos=new p5.Vector(random(0,width),random(0,height));
    this.c=180;
    
    this.targetSpec=new p5.Vector(-1,-1);
    this.targetSpecIndex=-1;
    
    this.targetFood=new p5.Vector(-1,-1);
    this.targetFoodIndex=-1;
    
    this.dif=new p5.Vector(-1,-1);
  }

  draw()
  {
    fill(this.c,100,100);
    circle(this.pos.x,this.pos.y,12);
  }
  
  move(spec,food)
  {
    switch(random([2]))
    {
      case 1: this.mRandom(); break;
      case 2: this.mEat(food); break;
      case 3: this.mPartner(spec); break;
      case 4: this.mGroup(spec); break;
    }
  }
  
  mRandom()
  {
    this.pos.add(p5.Vector.random2D().normalize());
  }
  
  mEat(food)
  {
    
    if(this.targetFoodIndex==-1)
    {
      let dist=2000;
      for(let i=0;i<food.length;i++)
      {
        if(food[i].Vector.dist(this.pos)<dist)
        {
          dist=food[i].Vector.dist(this.pos);
          this.targetFood=food[i].Vector.copy();
          this.targetFoodIndex=i;
        }
      }
      this.dif=this.targetFood.copy();
      this.dif.sub(this.pos);
    }
    this.pos.add(this.dif.setMag(11));
  }
  
  mPartner()
  {
    //todo
  }
  
  mGroup()
  {
    //todo
  }
  
  eatCheck()
  {
    if(this.pos.dist(this.targetFood)<6)
    {
      this.dif.set(-1,-1);
      let temp=this.targetFoodIndex;
      console.log(temp);
      this.targetFoodIndex=-1;
      return temp;
    }
    return -1;
  }
  
  get Vector(){return this.pos}
}


class food
{
  constructor()
  {
    this.pos=new p5.Vector(random(0,width),random(0,height))
  }
  
  draw()
  {
    fill(0,100,100);
    circle(this.pos.x,this.pos.y,7);
  }
  get Vector(){return this.pos}
}