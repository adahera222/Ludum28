/*
Units.js

Units for the game



*/

game.objects.player= function(){

this.x = 64;
this.y= 64;
this.maxspeed = 2*game.screens.level.grid;
this.speed = 0;
this.w = game.screens.level.grid/2;
this.h =game.screens.level.grid/2;
this.sprite=null;
this.item =null;
this.facing = "down";
this.r = game.down;
this.collideTimer = 0;
this.collideImmuneTime = 2000;
this.update= function(ticks){

	if(this.item){
		this.item.update(ticks);
		
	}
	
	//input
	this.speed =0;
	if(game.keysDown.left){
		this.facing = "left";	
		this.speed=this.maxSpeed;
	}	
	if(game.keysDown.right){
		this.facing = "right";
		this.speed=this.maxSpeed;
 	}
 	//move teh character
	if(this.speed >0 && this.canMove(ticks, game[this.facing], this.speed)){
		this.move(ticks, game[this.facing], this.speed);
	}
 	
 	this.speed =0;
	if(game.keysDown.up){
		this.facing = "up";
		this.speed=this.maxSpeed;
	}
	if(game.keysDown.down){
		this.facing = "down";		
		this.speed=this.maxSpeed;
	}
	
	if(this.speed >0 && this.canMove(ticks, game[this.facing], this.speed)){
		this.move(ticks, game[this.facing], this.speed);
	}
	
	this.r = game[this.facing];
	
	//using items
	if(game.keysDown.use &&this.item && this.item.canFire(ticks)){
	 this.item.fire(ticks);
	}
	
	//collision
	if(this.collideTimer >0){
		this.collideTimer -= Math.floor(ticks*1000);	
	}
	else{
		for(var i =0; i < game.screens.level.units.length;i++){
			var u = game.screens.level.units[i];
			if(u.contains(this.x ,this.y)&& u.collides && this.collideTimer <=0){
				diesel.raiseEvent("collision", this, u);
			
			}
		}
	}
	
	//world ents
	var ent = game.screens.level.getGridEnt(this.x, this.y);
	
	if(ent && game.assets.entities[ent]){
		if(!game.progress[ent]){
			console.log("calling",ent, this);
			game.assets.entities[ent](this);
		}
		else{
			console.log("you have already been to "+ent);
		}
	}

}


}
game.objects.player.prototype = new game.objects.units.base();

game.objects.units.band = function(x,y){
this.x  = x;
this.y =y;
this.w = game.screens.level.grid*2;
this.h = game.screens.level.grid*2;
this.sprite = new diesel.spriteInstance(diesel.spriteCache["band.png"]);
this.sprite.animation = 0;


this.draw =function(context){
		context.save();
			context.translate(this.x,this.y);

			if(this.facing == "right"){
				context.translate(this.w/2,this.h/-2);
				context.scale(-1,1);
				this.sprite.draw(context,this.w,this.h);
				context.scale(-1,1);
			}
			else{
				context.translate(this.w/-2,this.h/-2);
				this.sprite.draw(context,this.w,this.h);
			}
		context.restore();
		
		if(diesel.frameCount% 10 ==0){
			this.sprite.nextFrame();
		}
	}

}
game.objects.units.band.prototype = new game.objects.units.base();

