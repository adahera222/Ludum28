/*
This is teh base game object taht contains all the game data..

*/
var game ={
	container:"game",
	version:"v 1",
	width: 800,
	height: 800,
	fontsize:16,
	font:"16px sans-serif",	
	up:0,
	down: Math.PI,
	left: Math.PI/2,
	right: Math.PI/2*3,
	score: 0,
	keys:{
		"left":65, 
		"right":68,
		"up":32,
		"down":66,
		"use":69
		
	},
	keysDown:{
		"left":false, 
		"right":false,
		"up":false,
		"down":false,
		"use":false
	},
	settings:{
		screen:"menu",
		level:"demo",
		dataDirectory:"data",
		
	},
	
	context:{
		back:false,
		main:false,
		vfx:false
	},
	setup:function(){
		//load keys if saved.
		var keys= diesel.load("__keys");
		if(keys){
		
			game.keys = keys;
		}
		else{
			console.log("no key saved using defaults");
		}
		
		game.objects.player = new game.objects.player();
		
		var links = document.getElementById("mobileControls").children;
		for(var i=0; i < links.length;i++){
			links[i].onmousedown = game.util.mobileButtonDown;
			links[i].onmouseup = game.util.mobileButtonUp;
			links[i].addEventListener("ontouchstart", game.util.mobileButtonDown,false);
			links[i].addEventListener("ontouchmove", game.util.mobileButtonUp,false);
			links[i].addEventListener("ontouchend", game.util.mobileButtonUp,false);
			links[i].onclick = game.util.ignore;
		}
	},
	events:{
		"click":function(evt){
			if(game.screens[game.settings.screen] &&
					game.screens[game.settings.screen].click){

				game.screens[game.settings.screen].click(evt);
			}
			else{
				game.context.vfx.fillText("No Scene: "+game.settings.screen, diesel.mouseX, diesel.mouseY);
				evt.preventDefault();
			}
		},
		"screenChange":function(event){
			var from = event.args[0], to = event.args[1], transition = event.args[2]|| false;
			console.log(from, to, transition);

			game.screens[from].close();
			if(transition){
				game.screens[transition].reset(from, to);
				game.screens[transition].open();
				game.settings.screen = transition;
			}
			else{
				game.screens[to].reset();
				game.screens[to].open();
				game.settings.screen = to;
			}
		
		},
		"keydown":function(event){
//			alert("key"+event.keyCode);
			if(game.screens[game.settings.screen] &&
					game.screens[game.settings.screen].keydown){
				game.screens[game.settings.screen].keydown(event);
			}
		},
		
		"keyup":function(event){
				if(game.screens[game.settings.screen] &&
					game.screens[game.settings.screen].keyup){
				game.screens[game.settings.screen].keyup(event);
			}

		}
		
	},

	objects:{
		//for 
	},
	screens:{
		// used to draw a screen
	},
	assets:{
		tiles:[],
		entities:[null,//0
		null,//start
		function(player){ //end
			if(game.screens.level.intel >= game.screens.level.current.intel){
				diesel.raiseEvent("levelFinished",player);
			}
			else{
			var e = new game.objects.effects.text(player.x, player.y, game.up, "You need more intel to exit");
			e.color = "rgba(255,255,255,.75)";
			e.speed =0;
			e.maxFrames = 2;
			e.framesPerFrame =1;
			game.screens.level.effects.push(e);
			}	
		},
		function(player){ //intel
			var x = Math.floor(player.x/ game.screens.level.grid);
			var y = Math.floor(player.y/ game.screens.level.grid);
			game.screens.level.captureIntel(x,y);
		},
		function(player){//objects
			if(game.keysDown.use){
				var x = Math.floor(player.x/ game.screens.level.grid);
				var y = Math.floor(player.y/ game.screens.level.grid);
				game.screens.level.hackMachine(x,y);
			}
		
		}
		]
	},
	preload:[
		{"image":"logo.png"}
	],
	util:{
		"getLevel":function(id){
			console.log("loading level", id);
			var lvl =diesel.ajax("level/"+id+".json");
			game.screens.level.current = JSON.parse(lvl);
			},
		
		"ignore":function(e){
			e.preventDefault();
		}
		
		
		
	},
	state:{
	
	}
};
