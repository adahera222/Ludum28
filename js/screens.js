/*





*/

game.screens.menu = function(){
	this.clickZones = [
		{x:32,y:32,w:128,h:128,"click":function(){
			var button = Math.floor((diesel.mouseY - 32 )/ 32);
			switch(button){
				case 0:
					diesel.raiseEvent("screenChange","menu","level","gameIntro");
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
		this.drawMenu(game.context.main, this.options, 32,32, 200,128,32);

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
		" Lee Brunjes -Code, Lead"," Paul Caritj - Code",   " Felicity Gong - Arts"," Jim Kliss -Plot"
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

game.screens.endGame = function(){
	this.slides =[];
	this.i =0;
	this.clickZones=[
		{x:0,y:0,w:game.width,h:game.height,"click":function(){
				i++;
				if(i >= this.slides.length){
						diesel.raiseEvent("screenChange","endGame","menu")
				}
			}
		}

	]
	this.draw=function(){
		var about = ["Game over Text"];
		this.clearAllContexts();

		this.drawMenu(game.context.main, about, 32,32,game.width-64,388);
		
		if(i < this.slides.length){
			//TODO DRAW SLIDE
		}

		};
		
	this.reset = function(){
		for(key in game.progress){
			
			//TODO setup engame slides based on 
			var slide = {"key": key};
			
		
			this.slides.push(slide);
		
		}
	
	}


};

game.screens.endGame.prototype = game.screens.base;
game.screens.endGame = new game.screens.endGame();

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

this.clickZones=[
		{x:0,y:0,w:game.width,h:game.height,"click":function(){
		diesel.raiseEvent("screenChange","gameIntro", this.to, "chooser");
			}
		}

	]

this.reset = function(from, to){
	this.to= to;
	this.i = 0;
	this.clearAllContexts();
}

this.i=0;

this.to;
this.lastScreen =0;
this.screenTime = 3000;

this.draw =function(){
	//TODO DRAW AN INTO instead of a descdning line.
		this.clearAllContexts();
		this.drawScreen(game.context.vfx,this.screens[this.i], 32,32,game.width-64, game.height-64);
}
this.update= function(ticks){
	this.lastScreen += ticks*1000;
	if(this.lastScreen > this.screenTime){
		this.i++;
		this.lastScreen =0;
	}
	if(this.i >= this.screens.length){
		diesel.raiseEvent("screenChange","gameIntro", this.to, "chooser");	
	}
}

this.screens =[
{
	text:[
		"This is you:",
		"You are seeking solitude",
		"Avoid the probing stares of others."
		,"",""
	],
	sprite:{
		name:"player.png",
		idx:0
	}
},
{
	text:[
		"Avoid all the others",
		"Seek the quiet spaces.",
		"",
		""
	],
	sprite:{
		name:"band.png",
		idx:0
	}
},
{
	text:[
	
		"Find the Stars","","They are the key","",""
	],
	sprite:{
		name:"ents.png",
		idx:4
	}
},
{
	text:[
	
		"You Only Get One","Chance."," One thing.",
		"Choose Carefully.","",""
		
		
	],
	sprite:{
		name:"banana.png",
		idx:0
	}
}
];

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
Chooser
*/
game.screens.chooser = function(){
this.clickZones=[
		{x:0,y:64,w:256,h:256,click:function(){
			var i = Math.floor(diesel.mouseY/32);
		
			i-=2;
			
			game.screens.chooser.selected = i;
			
			console.log(i,this.selected);
		
		}},
		{x:360,y:600,w:60,h:30,click:function(){
			
			if(
				game.screens.chooser.selected != null && 

				confirm("You only get one.\n\n Continue?")
			){
				if(game.objects.weapons[game.screens.chooser.items[game.screens.chooser.selected].name]){
					game.objects.player.item = new game.objects.weapons[game.screens.chooser.items[
						game.screens.chooser.selected].name]();
				}
				else{
						console.log("missing weapon",game.screens.chooser.items[
							game.screens.chooser.selected].name);
						game.objects.player.item  =game.screens.chooser.items[
							game.screens.chooser.selected].name;
				}
				diesel.raiseEvent("screenChange","chooser", "level", null);
				
			}			
			
		
		}},
		];
this.reset = function(from, to){
	this.to= to;


}
this.selected = null;
this.items = [
	{name:"banana",text:["The Banana","The hunble banana","Quite slippery","Avoid some casual encounters"],"sprite":{"name":"banana.png","idx":0}},
	{name:"fan",text:["The Fan","Hide Your Stars.","Makes stars score more"],"sprite":{"name":"fan.png","idx":0}},
	{name:"headphones",text:["The Headphones","Avoid eye contact","Awkwardness range reduced"],"sprite":{"name":"headphones.png","idx":0}},
	{},
	{name:"band",text:["Funny Hats","I play bassoon?","Get ignored By the band"],"sprite":{"name":"band.png","idx":0}},
	{name:"cheer",text:["School Spirit","Pom Poms are in","Cheerleaders leave you alone."],"sprite":{"name":"cheer.png","idx":0}},
	{name:"grease",text:["Look the part","Eehhhhh?","Pal up with the Greaers"],"sprite":{"name":"greaser.png","idx":0}},
	{name:"prep",text:["Pop that Collar","Bro? Bro.","Preps overlook you"],"sprite":{"name":"prep.png","idx":0}},
	

];


this.draw =function(){

//TODO make this pretty
	game.context.vfx.clearRect(0,0,800,800);
	game.context.vfx.fillText("Choose Wisely", 32,32);
	
	game.context.vfx.fillText("Banana", 64,96);
	game.context.vfx.fillText("Fan", 64,128);
	game.context.vfx.fillText("Headphones", 64,160);
	game.context.vfx.fillText("Or join:", 32,192);
	game.context.vfx.fillText("Band", 64,224);
	game.context.vfx.fillText("Cheerleaders", 64,256);
	game.context.vfx.fillText("Greasers", 64,288);
	game.context.vfx.fillText("Preppies", 64,320);
	
	if(this.selected != 3 && this.items[this.selected]){
	
		this.drawScreen(game.context.vfx,this.items[this.selected] , 352,64,256,288);
		game.context.vfx.fillRect(30,32* this.selected +2 +64, 16,28);
	}
	
	
	
	
	
	//draw okay button
	game.context.vfx.fillText("OK", 370,630);

}


}
game.screens.chooser.prototype = game.screens.base;
game.screens.chooser= new game.screens.chooser();



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





	this.reset=function(){
		this.current=false;
		this.units = [];
		this.effects =[];
		this.intel =0;
		this.started =true;
		this.startFrame = diesel.frameCount;

		game.keysDown.up =false;
		game.keysDown.down =false;
		game.keysDown.left = false;
		game.keysDown.right =false;
		game.keysDown.use =false;

		game.util.getLevel(game.settings.level);
		//set the cameraa to the start
		console.log(this.prev);
		for(var _y = 0; _y < this.current.entities.length; _y++){
			for(var _x = 0; _x < this.current.entities[_y].length; _x++){
				if(this.current.entities[_y][_x] == this.prev){
					this.offset.x = _x *this.grid ;
					this.offset.y =  _y *this.grid;
				}
			}
		}
		//move teh player to the start location.
		console.log(this.offset);
		game.objects.player.teleport(	this.offset.x +this.grid/2,	this.offset.y+this.grid/2*3);

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
							if(!game.progress[idx]){		
								idx = 2;
							}
							else{
								idx = 3;
							}
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
		for(var i=0; i < game.maxHearts;i++){
			var _x = 32, _y=0,src ;
			var spr = diesel.spriteCache["hearts.png"];
					
		
							
			if( i < game.hearts){
				src = spr.getSprite("full", (Math.floor(diesel.frameCount /10)+i)%spr.frames );
			}
			else{
				src = spr.getSprite("empty", Math.floor(diesel.frameCount/10)%spr.frames );
			}
			game.context.vfx.drawImage(spr.image, src[0],src[1],src[2],src[3],
						_x * i , _y ,32,32);
		}
		
		game.context.vfx.fillText(game.score, 0,64);



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




