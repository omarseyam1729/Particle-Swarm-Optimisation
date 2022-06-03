let world=new Array();
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
function dist(x0,y0,x1,y1){
    return ((x0-x1)**2+(y1-y0)**2)**0.5;
}
let gbest=10000000;
let gbestx=300;
let gbesty=300;
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
    this.r=new Vector(x,y);
    this.v=new Vector(vx,vy);
    this.cnt=0;
    this.update=function update(n=70){
        this.r.x+=this.v.x/n;
        this.r.y+=this.v.y/n;
        this.cnt+=1
        this.v.x=0.997*this.v.x+1.5*(100*Math.exp(-this.cnt/100)*Math.abs(randn_bm())+(gbestx-this.r.x))/1000;
        this.v.y=0.997*this.v.y+1.5*(100*Math.exp(-this.cnt/100)*Math.abs(randn_bm())+(gbesty-this.r.y))/1000;
        if(Math.abs(this.r.x-can.width)<this.radius){
            this.r.x=can.width-this.radius;
            this.v.x*=-0.8;
        }
        if(Math.abs(this.r.y-can.height)<this.radius){
            this.r.y=can.height-this.radius;
            this.v.y*=-0.8;
        }
        if(this.r.x<this.radius){
            this.r.x=this.radius;
            this.v.x*=-0.8
        }
        if(this.r.y<this.radius){
            this.r.y=this.radius;
            this.v.y*=-0.8
        }
        if(getval(this.r.x,this.r.y)<gbest)gbestx=this.r.x,gbesty=this.r.y,gbest=getval(this.r.x,this.r.y);
    this.draw=function draw(){
             draw_circle(this.radius,this.r.x,this.r.y);
    }

    }

}
