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

// function checkForFailedLoad()
// {
// 	console.log("Checking for failed loads...");
// 	console.log(APP.cameraQueue);
// }

// function sortCameras(event)
// {
// 	console.log("sorting cameras:");
// 	console.log(event);
	
// 	var sortBy = event.target.value;
// 	sortCamerasBy(sortBy);
// }

// function sortCamerasBy(sortBy)
// {
// 	// sort the games by the selection the user chose
// 	switch(sortBy)
// 	{
// 		case "name": 	APP.cameras.sort(function(a, b){
//     								if(a.title < b.title) return -1;
//     								if(a.title > b.title) return 1;
//     								return 0;});
// 						break;
						
// 		case "rating": 	APP.cameras.sort(function(a, b){
//     								if(a.rating < b.rating) return -1;
//     								if(a.rating > b.rating) return 1;
//     								return 0;});
// 						break;
// 	}	
	
// 	redisplayCameras(APP.cameras);
// }


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


// function search(event)
// {
// 	console.log("seraching games..");
	
// 	var searchBy = event.target.value;
// 	console.log(searchBy);
	
// 	var results =[];
	
// 	for(var i = 0; i < games.length; i++)
// 	{
// 		if(games[i].title.indexOf(searchBy) != -1)
// 			results.push(games[i]);
// 	}
	
// 	redisplayGames(results);
// }


// helpers


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
