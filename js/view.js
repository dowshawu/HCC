
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

APP.setConfigurations = function (root) {
	var table = root.cloneNode(true);
	var list = document.createElement("div");
	var listChild = document.createElement("div");
	var i;


	//list.appendChild(table.firstChild.firstChild.cloneNode(true));
	table.removeChild(table.firstChild);

	while( table.firstChild ) {
		if( table.firstChild.firstChild.hasClass("category-bar") ) {
			listChild = document.createElement("div");
			listChild.className = "configurations configuration-menu " + table.firstChild.firstChild.textContent.toLowerCase().replace(/ /g,"-");
			listChild.setAttribute("data-value", table.firstChild.firstChild.textContent.toLowerCase().replace(/ /g,"-"));
			listChild.textContent = table.firstChild.firstChild.textContent;
			table.removeChild(table.firstChild);
			list.appendChild(listChild.cloneNode(true));
			while( table.firstChild && !table.firstChild.firstChild.hasClass("category-bar")) {
				var configList = document.createElement("div");
					// configList.className = table.firstChild.firstChild.className;
					configList.className = "configurations configuration-menu-list " + listChild.getAttribute("data-value");
					configList.setAttribute("data-value", listChild.getAttribute("data-value") + "." + table.firstChild.firstChild.textContent.toLowerCase().replace(/ /g,"-"));
					configList.textContent = table.firstChild.firstChild.textContent;
				list.appendChild(configList.cloneNode(true));
				table.removeChild(table.firstChild);
			}
		}

		// list.appendChild(listChild.cloneNode(true));
	}

	return list;
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

APP.setTableVisual = function(cameraList) {
	var visual = []
	for( i in cameraList) {

		visual[i] = cameraList[i].detailVisual.cloneNode(true);
	}	
	// console.log(visual[0]);
	// console.log(visual[1]);
	// console.log(visual[2]);
	var table;

	var emptyBox = document.createElement("div");
	// table = APP.parseVisual(visual[0]);
	if( APP.cameraQueue[0] != null)
		visual[0] = APP.parseVisual(visual[0]);	
	if( APP.cameraQueue[1] != null)
		visual[1] = APP.parseVisual(visual[1]);
	else
		visual[1] = emptyBox;
	if( APP.cameraQueue[2] != null)
		visual[2] = APP.parseVisual(visual[2]);
	else
		visual[2] = emptyBox;
	//while( visual[0].firstChild.firstChild )
	var row;
	row = visual[0].firstChild.cloneNode(true);
	if( APP.cameraQueue[1] != null) {
		if( visual[0].firstChild.firstChild.isEqualNode(visual[1].firstChild.firstChild) ) {
			row.appendChild(visual[1].firstChild.firstChild.nextSibling.cloneNode(true));	
		}
	}
	if( APP.cameraQueue[2] != null) {
		if( visual[0].firstChild.firstChild.isEqualNode(visual[2].firstChild.firstChild)) {
			row.appendChild(visual[2].firstChild.firstChild.nextSibling.cloneNode(true));
		}	
	}

	// console.log("row");
	// console.log(row);
	table = document.createElement("div");
	table.appendChild(row.cloneNode(true));

	visual[0].removeChild(visual[0].firstChild);
	if( APP.cameraQueue[1] != null)
		visual[1].removeChild(visual[1].firstChild);
	if( APP.cameraQueue[2] != null)
		visual[2].removeChild(visual[2].firstChild);
	

	//firstChild.firstChild must to be match

	// while( visual[0].firstChild.firstChild || visual[1].firstChild.firstChild || visual[2].firstChild.firstChild ) {

	while( visual[0].firstChild || visual[1].firstChild || visual[2].firstChild ) {

		var flag = -1;
		if( visual[0].firstChild && visual[1].firstChild && visual[2].firstChild && visual[0].firstChild.firstChild.isEqualNode(visual[1].firstChild.firstChild) && visual[1].firstChild.firstChild.isEqualNode(visual[2].firstChild.firstChild) ) {
			flag = 3;
		} else if( visual[0].firstChild && visual[1].firstChild && visual[0].firstChild.firstChild.isEqualNode(visual[1].firstChild.firstChild) ) {
			flag = 2;
		} else if( visual[0].firstChild && visual[2].firstChild && visual[0].firstChild.firstChild.isEqualNode(visual[2].firstChild.firstChild) ) {
			flag = 1;
		} else if( visual[1].firstChild && visual[2].firstChild && visual[1].firstChild.firstChild.isEqualNode(visual[2].firstChild.firstChild) ) {
			flag = 0;
		} else {
			flag = -1;
		}

		switch( flag ) {
			case 3:     row = APP.parseCategories(visual[0].firstChild, visual[1].firstChild, visual[2].firstChild);
						visual[0].removeChild(visual[0].firstChild);
						visual[1].removeChild(visual[1].firstChild);
						visual[2].removeChild(visual[2].firstChild);
						break;

			case 2: 	//console.log("length = " + visual[2].childNodes.length);
						for ( i = 0 ; i < visual[2].childNodes.length ; i++ ) {
							if( visual[0].firstChild.firstChild.isEqualNode(visual[2].childNodes[i].firstChild)) {
								break;
							}
						}
						if ( i < visual[2].childNodes.length ) {
							row = APP.parseCategories(visual[0].firstChild, visual[1].firstChild, visual[2].childNodes[i]);
							visual[2].removeChild(visual[2].childNodes[i]);
						} else {
							row = APP.parseCategories(visual[0].firstChild, visual[1].firstChild, emptyBox);
						}
						visual[0].removeChild(visual[0].firstChild);
						visual[1].removeChild(visual[1].firstChild);
						break;

			case 1:     //console.log("length = " + visual[1].childNodes.length);
						for ( i = 0 ; i < visual[1].childNodes.length ; i++ ) {
							if( visual[0].firstChild.firstChild.isEqualNode(visual[1].childNodes[i].firstChild)) {
								break;
							}
						}
						//console.log("i = " + i);
						if ( i < visual[1].childNodes.length ) {
							row = APP.parseCategories(visual[0].firstChild, visual[1].childNodes[i], visual[2].firstChild);
							visual[1].removeChild(visual[1].childNodes[i]);
						} else {
							row = APP.parseCategories(visual[0].firstChild, emptyBox, visual[2].firstChild);
						}
						visual[0].removeChild(visual[0].firstChild);
						visual[2].removeChild(visual[2].firstChild);
						break;

			case 0:     //console.log("length = " + visual[0].childNodes.length);
						for ( i = 0 ; i < visual[0].childNodes.length ; i++ ) {
							if( visual[1].firstChild.firstChild.isEqualNode(visual[0].childNodes[i].firstChild)) {
								break;
							}
						}
						if ( i < visual[0].childNodes.length ) {
							row = APP.parseCategories(visual[0].childNodes[i], visual[1].firstChild, visual[2].firstChild);
							visual[0].removeChild(visual[0].childNodes[i]);
						} else {
							row = APP.parseCategories(emptyBox, visual[1].firstChild, visual[2].firstChild);
						}
						visual[1].removeChild(visual[1].firstChild);
						visual[2].removeChild(visual[2].firstChild);
						break;

			case  -1:   if( visual[0].firstChild ) {
							row = APP.parseCategories(visual[0].firstChild, emptyBox, emptyBox);
							visual[0].removeChild(visual[0].firstChild);
							break;
						} else if ( visual[1].firstChild ) {
							row = APP.parseCategories(emptyBox, visual[1].firstChild, emptyBox);
							visual[1].removeChild(visual[1].firstChild);
							break;
						} else if ( visual[2].firstChild ) {
							row = APP.parseCategories(emptyBox, emptyBox, visual[2].firstChild);
							visual[2].removeChild(visual[2].firstChild);
							break;
						} else {
							console.log("error!!");
						}

		}

		while( row.firstChild ) {
			table.appendChild(row.firstChild.cloneNode(true));
			row.removeChild(row.firstChild);
		}
		// console.log("Visual[0]");
		// console.log(visual[0]);
		// console.log("Visual[1]");
		// console.log(visual[1]);	
		// console.log("Visual[2]");
		// console.log(visual[2]);
	}

	// console.log("table");
	// console.log(table);
	return table;
}

APP.parseCategories = function(visual0, visual1, visual2) {

	// console.log(visual0);
	// console.log(visual1);
	// console.log(visual2);
	var table = document.createElement("div");
	var row;

	while( visual0.firstChild || visual1.firstChild || visual2.firstChild ) {
		var flag = -1;
		if( visual0.firstChild && visual1.firstChild && visual2.firstChild && visual0.firstChild.firstChild.isEqualNode(visual1.firstChild.firstChild) && visual1.firstChild.firstChild.isEqualNode(visual2.firstChild.firstChild) ) {
			flag = 3;
		} else if( visual0.firstChild && visual1.firstChild && visual0.firstChild.firstChild.isEqualNode(visual1.firstChild.firstChild) ) {
			flag = 2;
		} else if( visual0.firstChild && visual2.firstChild && visual0.firstChild.firstChild.isEqualNode(visual2.firstChild.firstChild) ) {
			flag = 1;
		} else if( visual1.firstChild && visual2.firstChild && visual1.firstChild.firstChild.isEqualNode(visual2.firstChild.firstChild) ) {
			flag = 0;
		} else {
			flag = -1;
		}
		// console.log("flag = " + flag);

		// if( visual0.firstChild )
		// 	console.log( visual0.firstChild.firstChild);
		// if( visual1.firstChild )
		// 	console.log( visual1.firstChild.firstChild);
		// if( visual2.firstChild)
		// 	console.log( visual2.firstChild.firstChild);

		row = document.createElement("div");
		row.className = "table-row";
		var blank = document.createElement("div");
			// blank.textContent = "N/A";	

		switch( flag ) {
			case 3:     if( visual0.firstChild.hasClass("category-bar") ) {
							row.appendChild(visual0.firstChild.cloneNode(true));
							visual0.removeChild(visual0.firstChild);
							visual1.removeChild(visual1.firstChild);
							visual2.removeChild(visual2.firstChild);
							break;
						}
						else {
							row.appendChild(visual0.firstChild.firstChild.cloneNode(true));
							row.appendChild(visual0.firstChild.firstChild.nextSibling.cloneNode(true));
							row.appendChild(visual1.firstChild.firstChild.nextSibling.cloneNode(true));
							row.appendChild(visual2.firstChild.firstChild.nextSibling.cloneNode(true));
							visual0.removeChild(visual0.firstChild);
							visual1.removeChild(visual1.firstChild);
							visual2.removeChild(visual2.firstChild);
						}	
						break;

			case 2: 	if( visual0.firstChild.hasClass("category-bar") ) {
							row.appendChild(visual0.firstChild.cloneNode(true));
							visual0.removeChild(visual0.firstChild);
							visual1.removeChild(visual1.firstChild);
							break;
						}
						row.appendChild(visual0.firstChild.firstChild.cloneNode(true));
						// console.log("length = " + visual2.childNodes.length);
						for ( i = 0 ; i < visual2.childNodes.length ; i++ ) {
							if( visual0.firstChild.firstChild.isEqualNode(visual2.childNodes[i].firstChild)) {
								break;
							}
						}
						row.appendChild(visual0.firstChild.firstChild.nextSibling.cloneNode(true));
						row.appendChild(visual1.firstChild.firstChild.nextSibling.cloneNode(true));
						if ( i < visual2.childNodes.length && visual2.childNodes.length != 0  ) {
							//console.log(visual2.firstChild.childNodes[i]);
							row.appendChild(visual2.childNodes[i].firstChild.nextSibling.cloneNode(true));
							visual2.removeChild(visual2.childNodes[i]);
						} else {
							blank.className = visual0.firstChild.firstChild.nextSibling.className;								
							row.appendChild(blank.cloneNode(true));
						}
						visual0.removeChild(visual0.firstChild);
						visual1.removeChild(visual1.firstChild);
						break;

			case 1:     if( visual0.firstChild.hasClass("category-bar") ) {
							row.appendChild(visual0.firstChild.cloneNode(true));
							visual0.removeChild(visual0.firstChild);
							visual2.removeChild(visual2.firstChild);
							break;
						}
						row.appendChild(visual0.firstChild.firstChild.cloneNode(true));
						// console.log("length = " + visual1.childNodes.length);
						for ( i = 0 ; i < visual1.childNodes.length ; i++ ) {
							// console.log("i = " + i);
							if( visual0.firstChild.firstChild.isEqualNode(visual1.childNodes[i].firstChild)) {
								break;
							}
						}
						row.appendChild(visual0.firstChild.firstChild.nextSibling.cloneNode(true));
						if ( i < visual1.childNodes.length && visual1.childNodes.length != 0) {
							// console.log(visual1.firstChild.childNodes[i]);
							row.appendChild(visual1.childNodes[i].firstChild.nextSibling.cloneNode(true));
							visual1.removeChild(visual1.childNodes[i]);
						} else {
							blank.className = visual0.firstChild.firstChild.nextSibling.className;
							row.appendChild(blank.cloneNode(true));
						}
						row.appendChild(visual2.firstChild.firstChild.nextSibling.cloneNode(true));
						visual0.removeChild(visual0.firstChild);
						visual2.removeChild(visual2.firstChild);
						break;

			case 0:     if( visual1.firstChild.hasClass("category-bar") ) {
							row.appendChild(visual1.firstChild.cloneNode(true));
							visual1.removeChild(visual1.firstChild);
							visual2.removeChild(visual2.firstChild);
							break;
						}
						row.appendChild(visual1.firstChild.firstChild.cloneNode(true));
						// console.log("length = " + visual0.childNodes.length);
						for ( i = 0 ; i < visual0.childNodes.length ; i++ ) {
							if( visual1.firstChild.firstChild.isEqualNode(visual0.childNodes[i].firstChild)) {
								break;
							}
						}
						if ( i < visual0.childNodes.length && visual0.childNodes.length != 0) {
							// console.log(visual0.firstChild.childNodes[i]);
							row.appendChild(visual0.childNodes[i].firstChild.nextSibling.cloneNode(true));
							visual0.removeChild(visual0.childNodes[i]);
						} else {
							blank.className = visual1.firstChild.firstChild.nextSibling.className;
							row.appendChild(blank.cloneNode(true));
						}
						row.appendChild(visual1.firstChild.firstChild.nextSibling.cloneNode(true));
						row.appendChild(visual2.firstChild.firstChild.nextSibling.cloneNode(true));
						visual1.removeChild(visual1.firstChild);
						visual2.removeChild(visual2.firstChild);
						break;

			case  -1:   if( visual0.firstChild ) {
							if ( visual0.firstChild.hasClass("category-bar") ) {
								row.appendChild(visual0.firstChild.cloneNode(true));
								visual0.removeChild(visual0.firstChild);
								break;
							}
							row.appendChild(visual0.firstChild.firstChild.cloneNode(true));
							blank.className = visual0.firstChild.firstChild.nextSibling.className;						
							row.appendChild(visual0.firstChild.firstChild.nextSibling.cloneNode(true));
							row.appendChild(blank.cloneNode(true));
							row.appendChild(blank.cloneNode(true));
							visual0.removeChild(visual0.firstChild);
							break;
						} else if ( visual1.firstChild ) {
							if ( visual1.firstChild.hasClass("category-bar") ) {
								row.appendChild(visual1.firstChild.cloneNode(true));
								visual1.removeChild(visual1.firstChild);
								break;
							}
							row.appendChild(visual1.firstChild.firstChild.cloneNode(true));
							blank.className = visual1.firstChild.firstChild.nextSibling.className;	
							row.appendChild(blank.cloneNode(true));
							row.appendChild(visual1.firstChild.firstChild.nextSibling.cloneNode(true));
							row.appendChild(blank.cloneNode(true));
							visual1.removeChild(visual1.firstChild);
							break;
						} else if ( visual2.firstChild ) {
							if( visual2.firstChild.hasClass("category-bar") ) {
								row.appendChild(visual2.firstChild.cloneNode(true));
								visual2.removeChild(visual2.firstChild);
								break;
							}
							row.appendChild(visual2.firstChild.firstChild.cloneNode(true));
							blank.className = visual2.firstChild.firstChild.nextSibling.className;	
							row.appendChild(blank.cloneNode(true));
							row.appendChild(blank.cloneNode(true));
							row.appendChild(visual2.firstChild.firstChild.nextSibling.cloneNode(true));
							visual2.removeChild(visual2.firstChild);
							break;
						} else {
							console.log("error!!");
						}

		}
		
		// console.log("row");
		// console.log(row);
		table.appendChild(row.cloneNode(true));
	}

	// console.log("Visual[0]");
	// console.log(visual0);
	// console.log("Visual[1]");
	// console.log(visual1);	
	// console.log("Visual[2]");
	// console.log(visual2);
	// console.log("table");
	// console.log(table);
	return table;
}

APP.parseVisual = function(visual) {

	var table = document.createElement("div");

	var row = document.createElement("div");
		row.className = "table-row";

	var box1 = document.createElement("div");
	var box2 = document.createElement("div");

	box1.className = "camera-detail camera-detail-heading camera-detail-img";
	box1.textContent = "Photo";
	box2 = visual.firstChild.nextSibling.firstChild;
	row.appendChild(box1);
	row.appendChild(box2);
	table.appendChild(row.cloneNode(true));
	//cameraList[0].detailVisual.firstChild.nextSibling.removeChild(cameraList[0].detailVisual.firstChild.nextSibling.firstChild);
	visual.firstChild.removeChild(visual.firstChild.firstChild);
	// visual.firstChild.removeChild(visual.firstChild.firstChild);
	
	while( visual.firstChild.firstChild ) {
		var x = visual.firstChild.firstChild;
		var y = visual.firstChild.nextSibling.firstChild;
		
		while(row.firstChild) {
			row.removeChild(row.firstChild);
		}

		var categoryBox = document.createElement("div");
			categoryBox.className = x.className + " category-bar";
			categoryBox.textContent = x.firstChild.textContent;
		row.appendChild(categoryBox);
		// console.log("categoryBox");
		// console.log(categoryBox);
		//table.appendChild(row.cloneNode(true));
		x.removeChild(x.firstChild);

		while( x.firstChild ) {
			var x1 = x.firstChild;
			// x1.className += " table-heading";
			var y1 = y.firstChild;
			// console.log("x.firstChild");
			// console.log(x.firstChild);
			// console.log("y.firstChild");
			// console.log(y.firstChild);

			var r = document.createElement("div");
				r.className = "table-row";
			r.appendChild(x1.cloneNode(true));
			r.appendChild(y1.cloneNode(true));
			// console.log("r:");
			// console.log(r);
			//table.appendChild(r);
			row.appendChild(r);
			x.removeChild(x.firstChild);
			y.removeChild(y.firstChild);
		}
		visual.firstChild.removeChild(visual.firstChild.firstChild);
		visual.firstChild.nextSibling.removeChild(visual.firstChild.nextSibling.firstChild);
		table.appendChild(row.cloneNode(true));
		// console.log("Visual");
		// console.log(visual);
		// console.log("table");
		// console.log(table);
	}
	return table;
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







