
APP.semanticServiceUrl = "http://ecology-service.cse.tamu.edu/BigSemanticsService/";

APP.mainContainer;
APP.configContainer;
APP.cameras = [];
APP.cameraQueue = [];

APP.setup = function () {

	APP.mainContainer = document.getElementById("camera-container");
	APP.configContainer = document.getElementById("configuration-container");
	APP.loadingMetadata();
	APP.displayCategories();	
}

APP.displayGridVisual = function (camerasList) {

	// this.displayType = "grid";
	var i;

	while (APP.mainContainer.firstChild) {
    	APP.mainContainer.removeChild(APP.mainContainer.firstChild);
	}
	for(i in camerasList) {
		APP.mainContainer.appendChild(camerasList[i].gridVisual);
	}
}

APP.displayTableVisual = function (camerasList) {

	// this.displayType = "grid";
	var i;

	while (APP.mainContainer.firstChild) {
    	APP.mainContainer.removeChild(APP.mainContainer.firstChild);
	}
	var root = document.createElement("div");
	root = APP.setTableVisual(camerasList);

	APP.configContainer.appendChild(APP.setConfigurations(root));
	APP.mainContainer.appendChild(root);


	// APP.mainContainer = root.cloneNode(true);
	// APP.mainContainer.appendChild(APP.setTableVisual(camerasList));
	// APP.configContainer.appendChild(APP.setConfigurations(cameraList));
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

APP.displaySelectedCamera = function () {

	var container1 = document.getElementById("selected-1");
	var container2 = document.getElementById("selected-2");
	var container3 = document.getElementById("selected-3");
	var i;

	while( container3.firstChild) {
		container3.removeChild(container3.firstChild);
	}
	while( container2.firstChild) {
		container2.removeChild(container2.firstChild);
	}
	while( container1.firstChild) {
		container1.removeChild(container1.firstChild);
	}

	if( APP.cameraQueue[0] !== undefined) {
		container1.appendChild(APP.cameraQueue[0].quickVisual);
	}
	if( APP.cameraQueue[1] !== undefined) {
		container2.appendChild(APP.cameraQueue[1].quickVisual);
	}
	if( APP.cameraQueue[2] !== undefined) {
		container3.appendChild(APP.cameraQueue[2].quickVisual);
	}
}

$(document).ready( function() {
	$(".starting-button").on("click", function() {
		$("#starting-page").remove();
		$(".tag-list").on("click", "li", function() {
			event.preventDefault();	
			var cameraGrid = ".camera-grid." + $(this).data("value");
			console.log("cameraGrid = " + cameraGrid);
			if( !$(".tag").hasClass("tag-is-actived-manu") && !$(".tag").hasClass("tag-is-actived-type") ) {
				$(".camera-grid").removeClass("actived-manu");
				$(".camera-grid").removeClass("actived-type");

			}
			if( $(this).data("attribute") === "type" ) {
				if( $(".tag").hasClass("tag-is-actived-manu") ) {
					var removeGrid = ".camera-grid.actived-manu" 
					$(removeGrid).removeClass("actived-manu");
					$(".tag").removeClass("tag-is-actived-manu"); 
				}
				if( $(this).hasClass("tag-is-actived-type") ) {
					$(this).removeClass("tag-is-actived-type");
					$(cameraGrid).removeClass("actived-type");
				} else {
					$(this).addClass("tag-is-actived-type");
					$(cameraGrid).addClass("actived-type");
				}
			} else if( $(this).data("attribute") === "manufacturer" ) {
				if( $(".tag").hasClass("tag-is-actived-type") ) {
					var removeGrid = ".camera-grid.actived-type" 
					$(removeGrid).removeClass("actived-type");
					$(".tag").removeClass("tag-is-actived-type"); 
				}
				if( $(this).hasClass("tag-is-actived-manu") ) {
					$(this).removeClass("tag-is-actived-manu");
					$(cameraGrid).removeClass("actived-manu");
				} else {
					$(this).addClass("tag-is-actived-manu");
					$(cameraGrid).addClass("actived-manu");
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
			var key = $(this).find("h1").text();
			var i;
			if( APP.cameraQueue.length < 3 ) {
				$(this).toggleClass("camera-is-selected");
				if( $(this).hasClass("camera-is-selected") ) {
					for( i in APP.cameras ) {
						if( APP.cameras[i].name === key ) {
							//console.log( APP.cameras[i] );
							APP.cameraQueue.push(APP.cameras[i]);
						}
					}
				} else {
					for( i in APP.cameraQueue ) {
						//console.log(APP.cameraQueue);
						if( APP.cameraQueue[i].name === key ) {
							//console.log(i);
							break;
						}
					}
					APP.cameraQueue.splice(i,1);
					console.log(APP.cameraQueue);
				}
			}
			else {
				if ( $(this).hasClass("camera-is-selected") ) {
					$(this).toggleClass("camera-is-selected");
					for( i in APP.cameraQueue ) {
						//console.log(APP.cameraQueue);
						if( APP.cameraQueue[i].name === key ) {
							//console.log(i);
							break;
						}
					}
					APP.cameraQueue.splice(i,1);
				}
				else {
					alert("Maximum selected number is three");
				}

			}
			// console.log(APP.cameraQueue);
			APP.displaySelectedCamera();
		});

		$(".gridview-button").on("click", function() {
			// console.log("gridview start")
			APP.displayGridVisual(APP.cameras);
		});

		$(".compare-button").on("click", function() {
			// console.log("compare start")
			if( APP.cameraQueue.length === 0 )
				alert("You need to select cameras!");
			else
				APP.displayTableVisual(APP.cameraQueue);
		});

		$(".refresh-button").on("click", function() {
			// console.log("go refresh");
			var i,k;
			for( i in APP.cameras) {
				if( APP.cameras[i].checkStatus ) {
					// console.log(i + " -> good!");
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
					APP.displayGridVisual(APP.cameras);
				}
			}
		});

		$("#configuration-container").on("click", ".configuration-menu-list", function() {
		
			$(this).toggleClass("config-is-clicked");
			event.preventDefault();	
			var detail = ".camera-detail-heading." + $(this).data("value");
			$("#camera-container").find(detail).parent("div").toggleClass("detail-is-hidden");	
		});

		$("#configuration-container").on("click", ".configuration-menu", function() {

			event.preventDefault();	
			var detail = ".camera-detail-heading." + $(this).data("value");
			var config = ".configuration-menu-list." + $(this).data("value");
			console.log(detail);
			console.log(config);
			$(this).toggleClass("configuration-menu-is-clicked")
			if( $(this).hasClass("configuration-menu-is-clicked") ) {
				$(this).parent("div").find(config).each( function() {
					if( !$(this).hasClass("config-is-clicked") ) {
						$(this).addClass("config-is-clicked");
						$(this).hide();
					}
				});
				$("#camera-container").find(detail).parent("div").each( function() {
					if( !$(this).hasClass("detail-is-hidden")) {
						$(this).addClass("detail-is-hidden");
					}
				});
			} else {
				$(this).parent("div").find(config).each( function() {
					$(this).removeClass("config-is-clicked");
					$(this).show();
				});
				$("#camera-container").find(detail).parent("div").each( function() {
					$(this).removeClass("detail-is-hidden");
				});
			}
		});
	});
});







