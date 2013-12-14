/*





*/

game.screens.menu = function(){
	this.clickZones = [
		{x:32,y:32,w:128,h:128,"click":function(){
			var button = Math.floor((diesel.mouseY - 32 )/ 32);
			switch(button){
				case 0:
					diesel.raiseEvent("screenChange","menu","level");
				break;
				case 1:
					//TODO load __current
					if(game.settings.inGame){
						game.settings.screen = "level";
						return;
					}

					var loaded = diesel.load("__current");

					if(loaded && loaded.level <= game.settings.lastLevel){
						game.mans = loaded.mans;
						game.settings.level = loaded.level;
						game.score = loaded.score;
						diesel.raiseEvent("screenChange","menu","level");
					}
					else{
						alert("cannot Continue");
					}
				break;
				case 2:
					diesel.raiseEvent("screenChange","menu","about");
				break;
				default:
					console.log("aaah",button);
				break;
			}


		}},

	]
	this.options = [
		"START",
		"CONTINUE",

		"ABOUT",

	];
	this.draw=function(){
		this.clearAllContexts();
		game.context.main.fillStyle="#ffffff";
		game.context.vfx.fillStyle="#ffffff";
		game.context.main.fillText("MENU:",16,32);
		this.drawMenu(game.context.main, this.options, 32,32, 128,128,32);

		this.fillTextCenteredX(game.context.vfx,game.version,game.width/2,420);

	};
;



};

game.screens.menu.prototype = game.screens.base;
game.screens.menu = new game.screens.menu();



/*
About

*/

game.screens.about = function(){

	this.clickZones=[
		{x:0,y:0,w:game.width,h:game.height,"click":function(){
			diesel.raiseEvent("screenChange","about","menu")
			}
		}

	]
	this.draw=function(){
		var about = [
		"Text about teh game goes here",

		"TEAM:",
		" Lee Brunjes"," Paul Caritj",   " Felicity Gong"," Jim Kliss"
		];
		this.clearAllContexts();
		game.context.main.fillText("About:",16,32);
		this.drawMenu(game.context.main, about, 32,32,game.width-64,388);

		this.fillTextCenteredX(game.context.main,game.version,game.width/2,420);
		game.context.back.fillStyle="rgba(255,255,255,.125)";
	};


};

game.screens.about.prototype = game.screens.base;
game.screens.about = new game.screens.about();

/*
Gameover

*/

game.screens.gameover = function(){

	this.clickZones=[
		{x:0,y:0,w:game.width,h:game.height,"click":function(){
			diesel.raiseEvent("screenChange","about","menu")
			}
		}

	]
	this.draw=function(){
		var about = ["Game over Text"];
		this.clearAllContexts();
		game.context.main.drawImage(diesel.imageCache["logo.png"],
			(game.width-265)/2, 128,256,256);
		this.drawMenu(game.context.main, about, 32,32,game.width-64,388);

		};


};

game.screens.gameover.prototype = game.screens.base;
game.screens.gameover = new game.screens.gameover();

/*
wongame

*/

game.screens.wongame = function(){

	this.clickZones=[
		{x:0,y:0,w:game.width,h:game.height,"click":function(){
			diesel.raiseEvent("screenChange","about","menu")
			}
		}

	]
	this.draw=function(){
		var about = [""];
		this.clearAllContexts();

		game.context.main.fillText("We Won!!",16,32);
		this.drawMenu(game.context.main, about, 32,32,game.width-64,388);

		};


};

game.screens.wongame.prototype = game.screens.base;
game.screens.wongame = new game.screens.wongame();


/*
Game INTRO
*/
game.screens.gameIntro = function(){

//TODO.
/*
Use the duke nukem intro as a basis.
anyway to get amusing random data from somewhere?
*/

}
game.screens.gameIntro.prototype = game.screens.base;
game.screens.gameIntro= new game.screens.gameIntro();

/*
Level change
*/
game.screens.levelChange = function(){

this.reset = function(from, to){
	this.to= to;
	game.context.vfx.clearRect(0,0,800,800);
	game.context.vfx.fillStyle="rgba(255,255,255, 0.5)";
}

this.o=0;
this.grid =60;
this.to;

this.draw =function(){

	game.context.vfx.fillRect(this.grid*i, 0,this.grid,game.height);
}
this.update= function(ticks){
	i++;
	if(i *this.grid >game.width){
		diesel.raiseEvent("screenChange","level", this.to, null);
	}
}


}
game.screens.levelChange.prototype = game.screens.base;
game.screens.levelChange= new game.screens.levelChange();



/*
Level

Used to show the actual game screens you know.
*/
game.screens.level = function(){
	this.current =null;
	this.offset={x:0,y:0};
	this.grid =32;
	this.units = [];
	this.effects =[];
	this.intel=0;
	this.prev = 1;

	this.startFrame =0;

	this.clickZones=[
		{x:32,y:32,w:game.width-64,h:game.height-64,click:function(){
			if(!game.screens.level.started){
				game.screens.level.started =true;

			}
		}}
	];




	this.reset=function(){
		this.current=false;
		this.units = [];
		this.effects =[];
		this.intel =0;
		this.started =false;
		this.startFrame = diesel.frameCount;



		game.util.getLevel(game.settings.level);
		//set the cameraa to the start
		for(var _y = 0; _y < this.current.entities.length; _y++){
			for(var _x = 0; _x < this.current.entities[_y].length; _x++){
				if(this.current.entities[_y][_x] == this.prev){
					this.offset.x = _x *this.grid ;
					this.offset.y =  _y *this.grid;
				}
			}
		}
		//move teh player to the start location.
		game.objects.player.teleport(	this.offset.x +this.grid/2,	this.offset.y+this.grid/2);

		//creat the units from the level and store them
		for(var i = 0; i < this.current.units.length;i++){
			var u = this.current.units[i];
			if(game.objects.units[u[0]]){
				this.units.push(new game.objects.units[u[0]]
					(u[1]*this.grid, u[2]*this.grid));
			}
			else{
				console.log("cannot add moster of type",u[0]);
			}
		}

		//create effects from teh level
		for(var i = 0; i < this.current.effects.length;i++){
			var e = this.current.effects[i];
			if(game.objects.effects[e[0]]){
				var eff = new game.objects.effects[e[0]]
					(e[1]*this.grid, e[2]*this.grid, e[3],e[4]
						.replace("%use%", diesel.getKeyName(game.keys.use))
						.replace("%jump%", diesel.getKeyName(game.keys.jump))
						.replace("%left%", diesel.getKeyName(game.keys.left))
						.replace("%right%", diesel.getKeyName(game.keys.right))
						.replace("%fire%", diesel.getKeyName(game.keys.fire)));
				eff.loop=true;
				eff.speed =0;
				eff.distanceCull = false;
				this.effects.push(eff);
			}
			else{
				console.log("cannot add effect of type",e[0]);
			}
		}

	}

	this.draw=function(){
		this.clearAllContexts();
		if(!this.current){
			game.context.vfx.fillStyle="#ffffff";
			game.context.vfx.fillText("LOADING ."
				+(diesel.frameCount % 10 ? ".":" ")
				+(diesel.frameCount % 30 ? ".":" ")
				+(diesel.frameCount % 60 ? ".":" "), 50,50)
				return;
		}


		//UPDATE OFFSETS for y

		this.offset.x = diesel.clamp(game.width/2 - game.objects.player.x,
			-1* (this.current.world[0].length*this.grid) + game.width,
			-1);
		this.offset.y = diesel.clamp(game.height/2 - game.objects.player.y,
			-1 *(this.current.world.length*this.grid) + game.height,	-1);


		game.context.main.save();
		game.context.vfx.save();


		//translate all contexts
		game.context.main.translate(this.offset.x, this.offset.y);
		game.context.vfx.translate(this.offset.x, this.offset.y);


		//draw the world
    // tiles...
		for(var _y = 0; _y < this.current.tiles.length; _y++){
			for(var _x = 0; _x < this.current.tiles[_y].length; _x++){

				if(this.current.tiles[_y][_x] >=0){
						var spr = diesel.spriteCache["tiles.png"];
						var idx = this.current.tiles[_y][_x];
						var src = spr.getSprite( idx, Math.floor(diesel.frameCount/10)%spr.frames );


						game.context.main.drawImage(spr.image, src[0],src[1],src[2],src[3],
							_x *this.grid, _y*this.grid ,this.grid,this.grid);
				}
			}
		}

    // entities...
    for(var _y = 0; _y < this.current.entities.length; _y++){
			for(var _x = 0; _x < this.current.entities[_y].length; _x++){

				var idx = this.current.entities[_y][_x];
						if( typeof(idx) !== 'number'){					
							idx = 2;
						}
				if(idx >=0){
						var spr = diesel.spriteCache["ents.png"];
					
						var src = spr.getSprite( idx, Math.floor(diesel.frameCount/10)%spr.frames );
						game.context.main.drawImage(spr.image, src[0],src[1],src[2],src[3],
							_x *this.grid, _y*this.grid ,this.grid,this.grid);
				}
			}
		}
		//draw the player
		game.objects.player.draw(game.context.main);

		//Draw the units
		for(var i = 0; i < this.units.length;i++){
			
				this.units[i].draw(game.context.main);
			
		}

		//Draw the effects
		for(var i = 0; i < this.effects.length;i++){
			if(this.isOnScreen(this.effects[i].x,this.effects[i].y)){
				this.effects[i].draw(game.context.main);
			}
		}


		game.context.main.restore();
		game.context.vfx.restore();

		//GUI




	};


	this.update=function(ticks){

		//the player moves first
		game.objects.player.update(ticks);

		for(var i = 0; i < this.units.length;i++){
			if(game.objects.player.manhattanDistance(this.units[i].x, this.units[i].y) < (game.width + game.height)){
				this.units[i].update(ticks,i);
			}
		}

		for(var i = 0; i < this.effects.length;i++){
			if(game.objects.player.manhattanDistance(this.effects[i].x, this.effects[i].y) < (game.width + game.height)){

				this.effects[i].update(ticks,i);
			}
		}
	


	};


	this.getGridRef=function(x,y){
		return [Math.floor(x/this.grid),Math.floor(y/this.grid) ]
	};
	this.getGridItem=function(x,y){
		y = Math.floor(y/this.grid);
		x = Math.floor(x/this.grid);
		y = Math.max(Math.min(y,this.current.world.length -1),0);
		x = Math.max(Math.min(x,this.current.world[0].length-1),0);

		return this.current.world[y][x];
	};
	this.getGridEnt=function(x,y){
		y = Math.floor(y/this.grid);
		x = Math.floor(x/this.grid);
		y = Math.max(Math.min(y,this.current.entities.length -1),0);
		x = Math.max(Math.min(x,this.current.entities[0].length-1),0);

		return this.current.entities[y][x];
	};

	this.keydown = function(event){
		for(keyname in game.keys){
					if(event.keyCode == game.keys[keyname]){
						game.keysDown[keyname] =true;
					}
				}
		};
	this.keyup =function(event){
		for(keyname in game.keys){
			if(event.keyCode == game.keys[keyname]){
				game.keysDown[keyname] =false;
			}
		}

		if(event.keyCode ===27){
			game.settings.screen = "menu";
			game.settings.inGame = true;
		}
	};
};

game.screens.level.prototype = game.screens.base;
game.screens.level = new game.screens.level();




