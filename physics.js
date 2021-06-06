let world=new Array();

function dist(x0,y0,x1,y1){
    return ((x0-x1)**2+(y1-y0)**2)**0.5;
}
function getval(x,y){
    return dist(x,y,742,618);
}
let gbestx=Math.floor(Math.random()*window.innerWidth);
let gbesty=Math.floor(Math.random()*window.innerHeight);
let gbest=getval(gbestx,gbesty);
function Vector(x,y){
  this.x=x;
  this.y=y;
  this.dot=function(v){
      return this.x*v.x+this.y*v.y;
  }
  this.norm=function(){
       return (this.x**2+this.y**2)**0.5;
  }
  this.resolve=function(v){
      let ret=new Vector((this.dot(v)*v.x)/v.norm(),(this.dot(v)*v.y/v.norm()));
      return ret;
  }
  this.add=function(v){
      return new Vector(this.x+v.x,this.y+v.y);
  }
this.diff=function(v){
return new Vector(this.x-v.x,this.y-v.y);
} 
}
function Circle(radius,x,y,vx,vy){
    world.push(this);
    this.radius=radius;
    this.pbestx=Math.floor(Math.random()*window.innerWidth);
    this.pbesty=Math.floor(Math.random()*window.innerHeight);
    this.pbest=getval(this.pbestx,this.pbesty);
    this.r=new Vector(x,y);
    this.v=new Vector(vx,vy);
    this.update=function update(n=70){
        this.r.x+=this.v.x/n;
        this.r.y+=this.v.y/n;
        this.v.x=0.999*this.v.x+2*((this.pbesty-this.r.x)+1.5*(gbesty-this.r.x))/1000;
        this.v.y=0.999*this.v.y+2*((this.pbesty-this.r.y)+1.5*(gbesty-this.r.y))/1000;
        if(Math.abs(this.r.x-can.width)<this.radius+2 || this.r.x<this.radius+2)this.v.x*=-0.8;
        if(Math.abs(this.r.y-can.height)<this.radius+2 || this.r.y<this.radius+2)this.v.y*=-0.8;


    if(this.pbest>getval(this.r.x,this.r.y)){
            this.pbest=getval(this.r.x,this.r.y);
            this.pbestx=this.r.x;
            this.pbesty=this.r.y;
    }
    if(this.pbest<gbest){
        gbest=this.pbest;
        gbestx=this.pbestx;
        gbesty=this.pbesty;
    }
    this.draw=function draw(){
             draw_circle(this.radius,this.r.x,this.r.y);
    }

    }

}
