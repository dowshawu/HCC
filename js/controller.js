var APP = APP || {};

APP.loadingMetadata = function () {

	var t,i;

	for( t in APP.cameraList ) {

		var camera = new APP.Camera(APP.cameraList[t].name, APP.cameraList[t].key, APP.cameraList[t].type, APP.cameraList[t].manufacturer, APP.cameraList[t].img);
		// console.log( APP.getMetadata(APP.cameraList[t].amazonUrl, "APP.getCameraMetatdataCallback" ) );
		APP.getMetadata(APP.cameraList[t].amazonUrl, "APP.getCameraMetatdataCallback");
		APP.getMetadata(APP.cameraList[t].neweggUrl, "APP.getCameraMetatdataCallback");
		APP.getMetadata(APP.cameraList[t].bestbuyUrl, "APP.getCameraMetatdataCallback");

		APP.cameras.push(camera);
	}
	var x 
	var myTime = setTimeout( function () { 
		// for( i in APP.cameras ) {
		// 	// console.log(APP.cameras[i].amazon);
		// 	// console.log(APP.cameras[i].bestbuy);
		// 	// console.log(APP.cameras[i].newegg);
		// 	console.log(APP.cameras[i]);
		// } 
		APP.displayGridVisual(APP.cameras);
	},1000);
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

APP.getCameraMetatdataCallback = function (cameraMetadata) {

	var str;
	var i,j,k;
	//console.log(cameraMetadata);
	// console.log("got amazon product");
	if( cameraMetadata.hasOwnProperty("amazon_product")  ) {
		str = cameraMetadata.amazon_product.title;
		//console.log(str);
		//var res = str.split(" ");
		for( j in APP.cameraList ) {
			if( str.search(APP.cameraList[j].key) >= 0 ) {
				//console.log("amazon got it!");
				for( k in APP.cameras ) {
					if( APP.cameraList[j].key == APP.cameras[k].key ) {
						APP.cameras[k].amazon = JSON.parse(JSON.stringify(cameraMetadata.amazon_product));
						break;
					}
				}
				break;
			}					
		}
	} else if ( cameraMetadata.hasOwnProperty("newegg_product") ) {

		str = cameraMetadata.newegg_product.title;
		//console.log(str);
		// var res = str.split(" ");
		for( j in APP.cameraList ) {
			if( str.search(APP.cameraList[j].key) >= 0 ) {
				// console.log("newegg got it!");
				for( k in APP.cameras ) {
					//console.log(APP.cameras[k]);
					if( APP.cameraList[j].key == APP.cameras[k].key ) {
						//console.log(APP.cameras[k].name + " got it!");
						APP.cameras[k].newegg = JSON.parse(JSON.stringify(cameraMetadata.newegg_product));
						break;
					}
				}
				break;
			}					
		}
	} else if ( cameraMetadata.hasOwnProperty("bestbuy_product") ) {
		
		str = cameraMetadata.bestbuy_product.title;
		//console.log(str);
		for( j in APP.cameraList ) {
			if( str.search(APP.cameraList[j].key) >= 0 ) {
				//console.log(res[i] + " got it!");
				for( k in APP.cameras ) {
					//console.log(APP.cameras[k]);
					if( APP.cameraList[j].key == APP.cameras[k].key ) {
						//console.log(APP.cameras[k].name + " got it!");
						APP.cameras[k].bestbuy = JSON.parse(JSON.stringify(cameraMetadata.bestbuy_product));
						break;
					}
				}
				break;
			} 
			else if( cameraMetadata.bestbuy_product.hasOwnProperty("description")	) {
				if ( cameraMetadata.bestbuy_product.description.search(APP.cameraList[j].key) >= 0 ) {
					for( k in APP.cameras ) {
						//console.log(APP.cameras[k]);
						if( APP.cameraList[j].key == APP.cameras[k].key ) {
							//console.log(APP.cameras[k].name + " got it!");
							APP.cameras[k].bestbuy = JSON.parse(JSON.stringify(cameraMetadata.bestbuy_product));
							break;
						}
					}
					break;
				}
			}
		}
	}
	//check the
	APP.cameras[k].checkStatus();
}

APP.getMetadata = function (url, callback) {
	var serviceURL = APP.semanticServiceUrl + "metadata.jsonp?callback=" + callback + "&url=" + encodeURIComponent(url);
	APP.doJSONPCall(serviceURL);
	console.log("requesting semantics service for metadata: " + serviceURL);
	//return "metadata.jsonp?callback=" + callback + "&url=" + encodeURIComponent(url);
}

APP.doJSONPCall = function (jsonpURL) {
	var script = document.createElement('script');
	script.src = jsonpURL;
	script.id = jsonpURL;

	if( document.getElementById(jsonpURL) !== null ) {
		document.getElementById(jsonpURL).remove();
	}
	document.head.appendChild(script);
}

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};
