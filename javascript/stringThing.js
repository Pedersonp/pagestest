public clock clock=new clock();
public hands hands=new hands();
void setup() {
  colorMode(HSB,360,100,100);
  createCanvas(650,650);
  background(0,0,0);
}

void draw() 
{
  if(frameCount%2==0)
  {
  background(0,0,0);
  fill(0,100,100);
  clock.draw(hands.getsec(),hands.getmin());
  hands.draw();
  hands.inc();
  }
}
public class clock
{
  public clock()
  {
    
  }
  public void draw(float sec,float min)
  {
    fill(0,0,100);
    textSize(50);
    text("1",450,100);
    text("2",550,200);
    text("3",600,350);
    text("4",550,500);
    text("5",450,600);
    text("6",300,650);
    text("7",150,600);
    text("8",50,500);
    text("9",0,350);
    text("10",50,200);
    text("11",150,100);
    text("12",300,50);
       
    
    fill(0,100,100);
    int dec=((int)sec/30)+1;
    switch(dec)
    {
      case 1:text("3",600,350);break;
      case 2:text("4",550,500);break;
      case 3:text("5",450,600);break;
      case 4:text("6",300,650);break;
      case 5:text("7",150,600);break;
      case 6:text("8",50,500);break;
      case 7:text("9",0,350);break;
      case 8:text("10",50,200);break;
      case 9:text("11",150,100);break;
      case 10:text("12",300,50);break;
      case 11:text("1",450,100);break;
      case 12:text("2",550,200);break;
    }
          fill(240,100,100);
    dec=((int)min/30)+1;
    switch(dec)
    {
      case 1:text("3",600,350);break;
      case 2:text("4",550,500);break;
      case 3:text("5",450,600);break;
      case 4:text("6",300,650);break;
      case 5:text("7",150,600);break;
      case 6:text("8",50,500);break;
      case 7:text("9",0,350);break;
      case 8:text("10",50,200);break;
      case 9:text("11",150,100);break;
      case 10:text("12",300,50);break;
      case 11:text("1",450,100);break;
      case 12:text("2",550,200);break;
    }
  }
}
public class hands
{
  private float sec=0;
  private float min=0;
  public hands()
  {
    
  }
  public void draw()
  {
    textSize(30);
    fill(0,100,100);
    pushMatrix();
    translate(325,350);
    rotate(radians(sec));
    text("The second hand",0,0);
    popMatrix();
    
    
    fill(240,100,100);
    pushMatrix();
    translate(325,350);
    rotate(radians(min));
    text("The minute hand",0,0);
    popMatrix();
  }
  public void inc()
  {
    sec+=20;
    min+=1;
    if(sec>=360)sec=0;
    if(min>=360)min=0;
  }
  public float getsec()
  {
    return sec;
  }
  public float getmin()
  {
    return min;
  }
}