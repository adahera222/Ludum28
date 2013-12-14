/*
This is teh base game object taht contains all the game data..

*/
var game ={
	container:"game",
	version:"v 1",
	width: 800,
	height: 800,
	fontsize:16,
	font:"16px daniel, sans-serif",	
	up:0,
	down: Math.PI,
	left: Math.PI/2,
	right: Math.PI/2*3,
	score: 0,
	keys:{
		"left":37, 
		"right":39,
		"up":38,
		"down":40,
		"use":32
		
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
		level:"home",
		dataDirectory:"data",
		
	},
	
	context:{
		back:false,
		main:false,
		vfx:false
	},
	setup:function(){
		document.getElementById(game.container).focus();
		game.objects.player = new game.objects.player();
			
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
		entities:[null, //0?
		null,//level start
		
		]
	},
	preload:[
		{"image":"logo.png"},	
		{"sprite":"tiles.png","size":[32,32],"keys":{},"frames":1},
		{"sprite":"ents.png","size":[32,32],"keys":{},"frames":4},
		{"sprite":"banana.png","size":[64,64],"keys":{"used":0,"active":1},"frames":4}
		
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

