var APP = APP || {};

APP.semanticServiceUrl = "http://ecology-service.cse.tamu.edu/BigSemanticsService/";

APP.mainContainer;
APP.cameras = [];
APP.cameraQueue = [];

var GAME_VISUAL_WIDTH = 260;
var GAME_VISUAL_HEIGHT = 352;
var PADDING = 32;

APP.setup = function () {
	// init cameras list
	APP.cameras = [];
	APP.cameraQueue = [];
	APP.mainContainer = document.getElementById("camera-container");
	APP.displayCategories();
	
}

APP.displayCategories = function () {
	
	var tagListType = document.getElementById("tag-list-type");
	var t;

	for(t in APP.cameraCategoriesType)
	{
		var tag1 = APP.cameraCategoriesType[t];
		var item1 = document.createElement("li");
			item1.className = "tag";
			item1.onclick = APP.activateTag;
		
		var name1 = document.createElement("span");
			name1.className = "tag-name";
			name1.textContent = tag1.title;	
			
		item1.appendChild(name1);
		
		tag1.visual = item1;
		tag1.active = false;
		
		tagListType.appendChild(item1);
	}

	var tagListManufacturer = document.getElementById("tag-list-manufacturer");

	for(t in APP.cameraCategoriesManufacturer)
	{
		var tag2 = APP.cameraCategoriesManufacturer[t];
		var item2 = document.createElement("li");
			item2.className = "tag";
			item2.onclick = APP.activateTag;
		
		var name2 = document.createElement("span");
			name2.className = "tag-name";
			name2.textContent = tag2.name;	
			
		item2.appendChild(name2);
		
		tag2.visual = item2;
		tag2.active = false;
		
		tagListManufacturer.appendChild(item2);
	}
}

APP.activateTag = function(event) {
	var visual = event.target;
	while(visual.tagName != "LI")
		visual = visual.parentElement;
	var t,i;
	//console.log("visual = " + visual);
	for(t in APP.cameraCategoriesType) {
		if(APP.cameraCategoriesType[t].visual === visual) {
			if(APP.cameraCategoriesType[t].active) {
				APP.cameraCategoriesType[t].active = false;
				visual.className = "tag";
				//console.log("Here is " + APP.cameraCategoriesType[t].name);
				APP.removeMetadataListType(APP.cameraCategoriesType[t].name);
			}
			else {
				for( i in APP.cameraCategoriesManufacturer ) { 
					if( APP.cameraCategoriesManufacturer[i].active ) {
						 APP.cameraCategoriesManufacturer[i].visual.className = "tag";
						 APP.removeMetadataListManufacturer(APP.cameraCategoriesManufacturer[i].name);
					}
				}
				APP.cameraCategoriesType[t].active = true;
				visual.className = "tag-is-actived";
				APP.getMetadataListType(APP.cameraCategoriesType[t].name);
				// APP.removeMetadataListType(APP.cameraCategoriesType[t].name);
				// console.log(APP.cameras);
			}
		}
	}
	for(t in APP.cameraCategoriesManufacturer) {
		if(APP.cameraCategoriesManufacturer[t].visual === visual) {
			if(APP.cameraCategoriesManufacturer[t].active) {
				APP.cameraCategoriesManufacturer[t].active = false;
				visual.className = "tag";
				APP.removeMetadataListManufacturer(APP.cameraCategoriesManufacturer[t].name);
			}
			else {
				for( i in APP.cameraCategoriesType ) { 
					if( APP.cameraCategoriesType[i].active ) {
						 APP.cameraCategoriesType[i].visual.className = "tag";
						 APP.removeMetadataListType(APP.cameraCategoriesType[i].name);
					}
				}
				APP.cameraCategoriesManufacturer[t].active = true;
				visual.className = "tag-is-actived";
				APP.getMetadataListManufacturer(APP.cameraCategoriesManufacturer[t].name);
			}
		}
	}
	//console.log(APP.cameras[0].amazon);
	var x 
	var myTime = setTimeout( function () { 
		for( i in APP.cameras ) {
			//console.log(APP.cameras[i].amazon);
			//console.log(APP.cameras[i].bestbuy);
			//console.log(APP.cameras[i].newegg);
			APP.cameras[i].setGridVisual();
		} },1000);


	// console.log(APP.cameras);
	//console.log(APP.cameras[0].amazon);
	//APP.cameras[i].visual = APP.cameras[i].createGridVisual();
	 

}


APP.Camera = function (name, key, type, manufacturer, imgUrl) {
	this.name = name;
	this.key = key;
	this.type = type;
	this.manufacturer = manufacturer;
	this.amazon = [];
	this.newegg = [];
	this.bestbuy = [];
	this.img = imgUrl;


	//this.title = cameraMetadata.title;
	//this.location = location;

	//this.overallRating = cameraMetadata.overall_rating;

	this.visual = null;   /**/
		
	//this.rating = "none";
	//this.price = "none";
}


APP.Camera.prototype.setGridVisual = function () {
	
	this.visual = this.createGridVisual();
	//console.log(APP.cameras);
}

APP.Camera.prototype.updateCamera = function(cameraMetadata)
{
	var img = document.createElement('img');
		img.src = cameraMetadata.image.location;
	this.visual.appendChild(img);
		
	if(cameraMetadata.overall_rating)
		this.rating = cameraMetadata.overall_rating;
		
	if(cameraMetadata.price)
		this.price = cameraMetadata.price;
	
	
	// Add MICE container
	this.miceContainer = document.createElement('div');
	this.miceContainer.className = "miceContainer";
	this.miceContainer.innerText = "very important information";
	
	this.visual.appendChild(this.miceContainer);
	
	// Use the MetadataRenderer to construct the vanilla MICE for a given URL	
	MetadataRenderer.addMetadataDisplay(this.miceContainer, this.location, true, cameraMetadata.reviews);
	
	
	// Add canvas graph of data
	this.pieContainer = document.createElement('div');
	this.pieContainer.className = "pieContainer";
	this.pieContainer.appendChild(this.getVowelPercentagePieChart());
	
	this.visual.appendChild(this.pieContainer);
}

APP.Camera.prototype.createGridVisual = function()
{	
	var vis = document.createElement("div");
		vis.className = "camera-grid";	
		//vis.onmouseenter = function() {}

	var img = document.createElement("img");
		img.src = this.img;

	var title = document.createElement('h1');
		title.textContent = this.name;

	var review = document.createElement('p');
		review.textContent = "Amazon Rating " + this.amazon.overall_rating;
		console.log("rating = " + this.amazon.overall_rating);
	
	vis.appendChild(img);
	vis.appendChild(title);
	vis.appendChild(review);
			
	return vis;	
}

APP.Camera.prototype.gridify = function()
{
	
	if(this.miceContainer)
	{
		this.miceContainer.style.display = "none";
		this.pieContainer.style.display = "none";
	}
}

APP.Camera.prototype.listify = function()
{
	this.visual.style.width = "auto";
	this.visual.style.height = "auto";
	
	if(this.miceContainer)
	{
		this.miceContainer.style.display = "inline-block";	
		this.pieContainer.style.display = "inline-block";
	}
}

APP.Camera.prototype.getVowelPercentagePieChart = function()
{
	var canvas = document.createElement('canvas');
		canvas.width = 220;
		canvas.height = 220;
		
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 75;
    var counterClockwise = false;
    
    // count the total letters in the title
  	var totalLetterCount = this.title.length;
  	var vowelCount = this.countVowels(this.title);
  	//console.log("letters: "+totalLetterCount+" , vowels: "+vowelCount );
    
    var percentageVowels = vowelCount / totalLetterCount;
    
    var startAngle = (0 * Math.PI) + Math.PI;
    var vowelAngle = (percentageVowels * 2 * Math.PI) + Math.PI; 
    var endAngle = (2 * Math.PI) + Math.PI;    

    context.beginPath();
    context.arc(x, y, radius, vowelAngle, endAngle, counterClockwise);
    context.lineWidth = 35;
    context.strokeStyle = '#659E92';
    context.stroke();
    
    context.beginPath();
    context.arc(x, y, radius, startAngle, vowelAngle, counterClockwise);
    context.lineWidth = 35;
   
    context.strokeStyle = '#EFADAA';
    context.stroke();
    
    return canvas;
}

// count the vowels
// a, e, i, o, u and sometimes y
APP.Camera.prototype.countVowels = function(string)
{	
	var vowelCount = 0;
	
	string = string.toLowerCase();
	
	for(var i = 0; i < string.length; i++)
	{
		switch(string[i])
		{
			case 'a':
			case 'e':
			case 'i':
			case 'o':
			case 'u': 	vowelCount++;
						break;
			case 'y': 	// only sometimes 'y'
						var n = Math.floor((Math.random()*2));
						if(n == 1)
							vowelCount++;
						break;
		}
	}
	
	return vowelCount;
}
