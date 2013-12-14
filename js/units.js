/*
Units.js

Units for the game



*/

game.objects.player= function(){

this.x = 0;
this.y= 0;
this.maxspeed = 2*game.screens.level.grid;
this.speed = 0;
this.w = game.screens.level.grid;
this.h =game.screens.level.grid;
this.sprite=null;
this.item =null;
this.facing = "down";

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
	if(game.keysDown.up){
		this.facing = "up";
		this.speed=this.maxSpeed;
	}
	if(game.keysDown.down){
		this.facing = "down";		
		this.speed=this.maxSpeed;
	}
	//move teh character
	if(this.speed >0 && this.canMove(ticks, game[this.facing], this.speed)){
		this.move(ticks, game[this.facing], this.speed);
	}
	
	
	//using items
	if(game.keysDown.use &&this.item && this.item.canFire(ticks)){
	 this.item.fire(ticks);
	}
	
	//collision
	for(var i =0; i < game.screens.level.units.length;i++){
		var u = game.screens.level.units[i];
		if(u.contains(this.x ,this.y)&& u.collides){
			diesel.raiseEvent("collision", this, u);
			
		}
	}

}


}
game.objects.player.prototype = new game.objects.units.base();

