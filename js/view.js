var APP = APP || {}

APP.semanticServiceUrl = "http://ecology-service.cse.tamu.edu/BigSemanticsService/";

APP.mainContainer;
APP.cameras = [];
APP.cameraQueue = [];
APP.passingObject;

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
		
	for(t in APP.cameraCategoriesType)
	{
		if(APP.cameraCategoriesType[t].visual === visual)
		{
			if(APP.cameraCategoriesType[t].active)
			{
				APP.cameraCategoriesType[t].active = false;
				visual.className = "tag";
			}
			else
			{
				APP.cameraCategoriesType[t].active = true;
				visual.className = "tag-is-actived";
				// get and render games
				//getMetadata(APP.cameraCategories[t].best_seller_list, "getAndRenderCameras");
				APP.getMetadataList(APP.cameraCategoriesType[t].name);
			}
		}
	}
	for(t in APP.cameraCategoriesManufacturer)
	{
		if(APP.cameraCategoriesManufacturer[t].visual === visual)
		{
			if(APP.cameraCategoriesManufacturer[t].active)
			{
				APP.cameraCategoriesManufacturer[t].active = false;
				visual.className = "tag";
			}
			else
			{
				APP.cameraCategoriesManufacturer[t].active = true;
				visual.className = "tag-is-actived";
				// get and render games
				//getMetadata(APP.cameraCategories[t].best_seller_list, "getAndRenderCameras");
			}
		}
	}
}


function Camera(cameraMetadata, name)
{
	this.name = name;
	this.amazon = [];
	this.newegg = [];
	this.bestbuy = [];
	//this.title = cameraMetadata.title;
	//this.location = location;

	//this.overallRating = cameraMetadata.overall_rating;
	//this.visual = this.createGridVisual();   /**/
	
	//this.getFullMetadata(); /**/
		
	//this.rating = "none";
	//this.price = "none";
}

Camera.prototype.getFullMetadata = function()
{
	APP.cameraQueue.push(this);
	getMetadata(this.location, "updateCamera");
}

Camera.prototype.updateCamera = function(cameraMetadata)
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

Camera.prototype.createGridVisual = function()
{	
	var vis = document.createElement('div');
		vis.className = "cameraVisual";	
		//vis.onmouseenter = function() {}

	var title = document.createElement('h1');
		title.textContent = this.title;

	var review = document.createElement('p');
		review.textContent = this.overallRating;
		
	
	
	vis.appendChild(title);
	vis.appendChild(review);
			
	return vis;	
}

Camera.prototype.gridify = function()
{
	this.visual.style.width = "260px";
	this.visual.style.height = "352px";
	
	if(this.miceContainer)
	{
		this.miceContainer.style.display = "none";
		this.pieContainer.style.display = "none";
	}
}

Camera.prototype.listify = function()
{
	this.visual.style.width = "auto";
	this.visual.style.height = "auto";
	
	if(this.miceContainer)
	{
		this.miceContainer.style.display = "inline-block";	
		this.pieContainer.style.display = "inline-block";
	}
}

Camera.prototype.getVowelPercentagePieChart = function()
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
Camera.prototype.countVowels = function(string)
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
