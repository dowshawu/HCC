var APP = APP || {};

APP.semanticServiceUrl = "http://ecology-service.cse.tamu.edu/BigSemanticsService/";

APP.mainContainer;
APP.cameras = [];
APP.tableHeading = null;

var GAME_VISUAL_WIDTH = 260;
var GAME_VISUAL_HEIGHT = 352;
var PADDING = 32;

APP.setup = function () {
	// init cameras list
	APP.cameras = [];
	APP.cameraQueue = [];
	// APP.camera
	APP.mainContainer = document.getElementById("camera-container");
	APP.loadingMetadata();
	APP.displayCategories();	
}

APP.displayCategories = function () {
	
	var tagListType = document.getElementById("tag-list-type");
	var t;

	for(t in APP.cameraCategoriesType)
	{
		var tag1 = APP.cameraCategoriesType[t];
		var item1 = document.createElement("li");
			item1.className = "tag" ;
			item1.setAttribute("data-value", tag1.name);
			item1.setAttribute("data-attribute", "type");
			//item1.onclick = APP.activateTag;
		
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
			item2.setAttribute("data-value", tag2.name);
			item2.setAttribute("data-attribute", "manufacturer");
			//item2.onclick = APP.activateTag;
		
		var name2 = document.createElement("span");
			name2.className = "tag-name";
			name2.textContent = tag2.name;	
			
		item2.appendChild(name2);
		
		tag2.visual = item2;
		tag2.active = false;
		
		tagListManufacturer.appendChild(item2);
	}
}

$(document).ready( function() {
	$(".tag-list").on("click", "li", function() {
		event.preventDefault();	
		var cameraGrid = ".camera-grid." + $(this).data("value");
		if( !$(".tag").hasClass("tag-is-actived-manu") && !$(".tag").hasClass("tag-list-manufacturer") ) {
			$(".camera-grid").fadeOut("slow");
		}
		if( $(this).data("attribute") === "type" ) {
			if( $(".tag").hasClass("tag-is-actived-manu") ) {
				var removeGrid = ".camera-grid.actived-manu" 
				$(removeGrid).fadeOut("slow");
				$(removeGrid).removeClass("actived-manu");
				$(".tag").removeClass("tag-is-actived-manu"); 
			}
			if( $(this).hasClass("tag-is-actived-type") ) {
				$(this).removeClass("tag-is-actived-type");
				$(cameraGrid).fadeOut("slow");
				$(cameraGrid).removeClass("actived-type");
			} else {
				$(this).addClass("tag-is-actived-type");
				$(cameraGrid).addClass("actived-type");
				$(cameraGrid).fadeIn("slow");
			}
		} else if( $(this).data("attribute") === "manufacturer" ) {
			if( $(".tag").hasClass("tag-is-actived-type") ) {
				var removeGrid = ".camera-grid.actived-type" 
				$(removeGrid).fadeOut("slow");
				$(removeGrid).removeClass("actived-type");
				$(".tag").removeClass("tag-is-actived-type"); 
			}
			if( $(this).hasClass("tag-is-actived-manu") ) {
				$(this).removeClass("tag-is-actived-manu");
				$(cameraGrid).fadeOut("slow");
				$(cameraGrid).removeClass("actived-tmanu");
			} else {
				$(this).addClass("tag-is-actived-manu");
				$(cameraGrid).addClass("actived-manu");
				$(cameraGrid).fadeIn("slow");
			}
		}
	});

	$("#camera-container").on("mouseenter", ".camera-grid", function() {
		$(this).animate({"top": "-15px"},300);
		$(this).css({"cursor": "pointer"});
	});

	$("#camera-container").on("mouseleave", ".camera-grid", function() {
		$(this).animate({"top": "0px"}, 300);
		$(this).css({"cursor": "none"});
	});

	$("#camera-container").on("click", ".camera-grid", function() {
		$(this).toggleClass("camera-is-selected");
		var key = $(this).find("h1").text();
		var i;
		if( $(this).hasClass("camera-is-selected") ) {
			for( i in APP.cameras ) {
				if( APP.cameras[i].name === key ) {
					console.log( APP.cameras[i] );
					APP.cameraQueue.push(APP.cameras[i]);
				}
			}
		} else {
			for( i in APP.cameraQueue ) {
				console.log(APP.cameraQueue);
				if( APP.cameraQueue[i].name === key ) {
					console.log(i);
					break;
				}
			}
			APP.cameraQueue.splice(i,1);
			console.log(APP.cameraQueue);
		}
		// APP.updataSelectedQueue(); 
	});

	$(".gridview-button").on("click", function() {
		console.log("gridview start")
		APP.display(APP.cameras);
	});

	$(".compare-button").on("click", function() {
		console.log("compare start")
		APP.display(APP.cameraQueue);
	});

	$(".refresh-button").on("click", function() {
		console.log("go refresh");
		var i,k;
		for( i in APP.cameras) {
			if( APP.cameras[i].checkStatus ) {

			} else {
				for( k in APP.cameraList ) {
					if( APP.cameraList[k].key == APP.cameras[i].key ) {
						break;
					}
				}
				APP.getMetadata(APP.cameraList[k].amazonUrl, "APP.getCameraMetatdataCallback");
				APP.getMetadata(APP.cameraList[k].neweggUrl, "APP.getCameraMetatdataCallback");
				APP.getMetadata(APP.cameraList[k].bestbuyUrl, "APP.getCameraMetatdataCallback");
				var myTime = setTimeout( function () { APP.display(APP.cameras); },3000);
			}
		}
	});


});

APP.Camera = function (name, key, type, manufacturer, imgUrl) {
	this.name = name;
	this.key = key;
	this.type = type;
	this.manufacturer = manufacturer;
	this.amazon = null;
	this.newegg = null;
	this.bestbuy = null;
	this.img = imgUrl;

	//this.title = cameraMetadata.title;
	//this.location = location;

	this.visual = null;   /**/
	this.gridVisual = null;
	this.detailVisual = null;

}



APP.Camera.prototype.checkStatus = function () {
	
	if( this.amazon != null && this.newegg != null && this.bestbuy != null )
	{
		console.log("done");
		//console.log(this);
		this.gridVisual = this.createGridVisual();
		this.detailVisual = this.createDetailVisual();
		return true;
	}
	else
	{
		//console.log("not done");
		return false;
	}
}

APP.Camera.prototype.createTableHeading = function () {

}

APP.Camera.prototype.createDetailVisual = function () {
	var i,j;
		var content;
		content = document.createElement("div");
		content.className = "camera-detail-container";
		var childElement;
		var imgDiv = document.createElement("div");
			imgDiv.className =  "camera-detail camera-detail-img";
		var img = document.createElement("img");
			img.src = this.img;
		imgDiv.appendChild(img);
		content.appendChild(imgDiv);

		var heading;
		heading = document.createElement("div");
		heading.className = "camera-detail-container camera-detail-heading";
		var childElement2;
		var imgDiv2 = document.createElement("div");
			imgDiv2.className = "camera-detail camera-detail-img camera-detail-heading";
		heading.appendChild(imgDiv2);

		for( i = 0 ; i < this.newegg.detailed_specifications.length ; i++ ) {
			

			//console.log("****" + this.newegg.detailed_specifications[i].title + "****");
			childElement = document.createElement("div");
			childElement2 = document.createElement("div");
			childElement.className = "camera-detail camera-detail-table " + this.newegg.detailed_specifications[i].title.toLowerCase().replace(" ","-");
			childElement2.className = "camera-detail camera-detail-table camera-detail-heading " + this.newegg.detailed_specifications[i].title.toLowerCase().replace(" ","-");
			//childElement.textContent = this.newegg.detailed_specifications[i].title;
			var deeperChildren;
			var deeperChildren2;
			for( j = 0 ; j < this.newegg.detailed_specifications[i].specifications.length ; j++ ) {
				
				deeperChildren = document.createElement("div");
				deeperChildren.className = "camera-detail " + this.newegg.detailed_specifications[i].title.toLowerCase().replace(" ", "-") + " " + this.newegg.detailed_specifications[i].specifications[j].title.toLowerCase().replace(" ","-");
				deeperChildren.textContent = this.newegg.detailed_specifications[i].specifications[j].description;
				deeperChildren2 = document.createElement("div");
				deeperChildren2.className = "camera-detail camera-detail-heading " + this.newegg.detailed_specifications[i].title.toLowerCase().replace(" ", "-") + " " + this.newegg.detailed_specifications[i].specifications[j].title.toLowerCase().replace(" ","-");
				deeperChildren2.textContent = this.newegg.detailed_specifications[i].specifications[j].title;
				// console.log(this.newegg.detailed_specifications[i].specifications[j].title + " : " + this.newegg.detailed_specifications[i].specifications[j].description);
				childElement.appendChild(deeperChildren);
				childElement2.appendChild(deeperChildren2);
				//console.log(this.newegg.detailed_specifications[0].specifications[0].description);
			}
			content.appendChild(childElement);
			heading.appendChild(childElement2);
			//console.log(childElement);
		}

		// var x = content.children[0].children[0];
		// console.log(x);
		// console.log(content);
		// console.log(heading);
		var root = document.createElement("var");
		root.appendChild(heading);
		root.appendChild(content);

		return root;
}

APP.Camera.prototype.createGridVisual = function() {
	var vis = document.createElement("div");
		vis.className = "camera-grid " + this.type + " " + this.manufacturer;	
		//vis.onmouseenter = function() {}

	var img = document.createElement("img");
		img.src = this.img;

	var title = document.createElement("h1");
		title.textContent = this.name;

	var review = document.createElement("p");
		review.textContent = "Amazon Rating " + this.amazon.overall_rating;
		//console.log("rating = " + this.amazon.overall_rating);
	
	vis.appendChild(title);
	vis.appendChild(review);
	vis.appendChild(img);
			
	return vis;	
}

