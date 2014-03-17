var APP = APP || {}









// function clearTags(event)
// {
// 	for(t in APP.cameraCategories)
// 	{
// 		APP.cameraCategories[t].active = false;
// 		APP.cameraCategories[t].visual.style.background = "none";
// 	}
	
// 	rearrangeGamesBest();
// }

function checkForFailedLoad()
{
	console.log("Checking for failed loads...");
	console.log(APP.cameraQueue);
}

function sortCameras(event)
{
	console.log("sorting cameras:");
	console.log(event);
	
	var sortBy = event.target.value;
	sortCamerasBy(sortBy);
}

function sortCamerasBy(sortBy)
{
	// sort the games by the selection the user chose
	switch(sortBy)
	{
		case "name": 	APP.cameras.sort(function(a, b){
    								if(a.title < b.title) return -1;
    								if(a.title > b.title) return 1;
    								return 0;});
						break;
						
		case "rating": 	APP.cameras.sort(function(a, b){
    								if(a.rating < b.rating) return -1;
    								if(a.rating > b.rating) return 1;
    								return 0;});
						break;
	}	
	
	redisplayCameras(APP.cameras);
}

function redisplayCameras(camerasList)
{
	// move all games to left
	var i;
	for(i in APP.cameras)
	{
		APP.cameras[i].visual.style.left = "-10000px";
	}
	
	
	// re position the games in the display based on the new ordering
	switch(this.displayType)
	{
		case "grid": 	displayAsGrid(camerasList);
						break;
						
		case "list": 	displayAsList(camerasList);
						break;
	}
}



function displayAsGrid(camerasLits)
{
	this.displayType = "grid";
	
	var columns = Math.floor (APP.mainContainer.getClientRects()[0].width / (GAME_VISUAL_WIDTH + PADDING));
	
	var c = 0;
	var r = 0;
	var i;

	for(i in camerasLits)
	{
		//console.log(c +' , '+r);
		var x = 12 + (GAME_VISUAL_WIDTH + PADDING) * c;
		var y = 36 + (GAME_VISUAL_HEIGHT + PADDING) * r;
		
		camerasLits[i].visual.style.top = y + 'px';
		camerasLits[i].visual.style.left = x + 'px';
		
		camerasLits[i].gridify();
		
		c++;
		
		if(c == columns)
		{
			c = 0
			r++;
		}	
	}
}

function displayAsList(camerasLits)
{
	this.displayType = "list";

	var r = 0;
	for(i in camerasLits)
	{
		var x = 12;
		var y = 36 + (GAME_VISUAL_HEIGHT + PADDING) * r;
		
		camerasLits[i].visual.style.top = y + 'px';
		camerasLits[i].visual.style.left = x + 'px';
		
		camerasLits[i].listify();
		r++;	
	}	
}

function updateCamera(cameraMetadata)
{
	console.log("this is the metadata:");
	console.log(cameraMetadata);
	
	cameraMetadata = cameraMetadata.amazon_product;
	
	// find game from queue
	var g;
	for(g in APP.cameraQueue)
	{
		if(cameraMetadata.location == APP.cameraQueue[g].location)
		{
			APP.cameraQueue[g].updateCamera(cameraMetadata);
			removeByValue(APP.cameraQueue, APP.cameraQueue[g]);
			return;
		}
	}
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

	if( Object.getOwnPropertyNames(cameraMetadata) == "amazon_product" ) {
		// console.log("got amazon product");
		str = cameraMetadata.amazon_product.title;
		//console.log(str);
		//var res = str.split(" ");
		for( j in APP.cameraList ) {
			if( str.search(APP.cameraList[j].key) >= 0 ) {
				//console.log("amazon got it!");
				for( k in APP.cameras ) {
					//console.log(APP.cameras[k]);
					if( APP.cameraList[j].key == APP.cameras[k].key ) {
						//console.log(APP.cameras[k].name + " got it!");
						APP.cameras[k].amazon = cameraMetadata.amazon_product;
						break;
					}
				}
				break;
			}					
		}
	}
	else if( Object.getOwnPropertyNames(cameraMetadata) == "newegg_product" ) {
		//APP.camera.newegg = cameraMetadata.newegg_product;
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
						APP.cameras[k].newegg = cameraMetadata.newegg_product;
						break;
					}
				}
				break;
			}					
		}
	}
	else if( Object.getOwnPropertyNames(cameraMetadata) == "bestbuy_product" ) {
		// console.log("got bestbuy");
		str = cameraMetadata.bestbuy_product.title;
		//console.log(str);
		for( j in APP.cameraList ) {
			if( str.search(APP.cameraList[j].key) >= 0 ) {
				//console.log(res[i] + " got it!");
				for( k in APP.cameras ) {
					//console.log(APP.cameras[k]);
					if( APP.cameraList[j].key == APP.cameras[k].key ) {
						//console.log(APP.cameras[k].name + " got it!");
						APP.cameras[k].bestbuy = cameraMetadata.bestbuy_product;
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
							APP.cameras[k].bestbuy = cameraMetadata.bestbuy_product;
							break;
						}
					}
					break;
				}
			}
		}
	}
	//console.log(APP.cameras);
	// if( cameraMetadata[0])

}

APP.getMetadataListType = function (type) {

	var t,i;
	var flag = -1;

	for( t in APP.cameraList ) {
			
		if(APP.cameraList[t].type === type) {

			//console.log(APP.cameraList[t].name );
			// APP.camera[] = new Camera(APP.cameraList.name);)
			for( i in APP.cameras) {
				if( APP.cameras[i].name == APP.cameraList[t].name ) {
					flag = 1;
				}
			}
			if( flag < 0 ) {
				var camera = new APP.Camera(APP.cameraList[t].name, APP.cameraList[t].key, APP.cameraList[t].type, APP.cameraList[t].manufacturer, APP.cameraList[t].img);
				// console.log( APP.getMetadata(APP.cameraList[t].amazonUrl, "APP.getCameraMetatdataCallback" ) );
				APP.getMetadata(APP.cameraList[t].amazonUrl, "APP.getCameraMetatdataCallback" );
				APP.getMetadata(APP.cameraList[t].neweggUrl, "APP.getCameraMetatdataCallback" );
				APP.getMetadata(APP.cameraList[t].bestbuyUrl, "APP.getCameraMetatdataCallback" );

				APP.cameras.push(camera);
			}
		}
	}
}

APP.removeMetadataListType = function (type) {
	var t;
	console.log(APP.cameras);
	for( t = APP.cameras.length-1 ; t >= 0 ; t-- ) {
		//console.log( APP.cameras[t]);
		if( APP.cameras[t].type === type) {
			APP.cameras.splice(t,1);
		}
	}
	//console.log(APP.cameras);
}

APP.getMetadataListManufacturer = function (manufacturer) {

	var t,i;
	var flag = -1;

	for( t in APP.cameraList ) {
			
		if(APP.cameraList[t].manufacturer === manufacturer) {

			//console.log(APP.cameraList[t].getOwnPropertyNames );
			// APP.camera[] = new Camera(APP.cameraList.name);)
			for( i in APP.cameras) {
				if( APP.cameras[i].name == APP.cameraList[t].name ) {
					flag = 1;
				}
			}
			if( flag < 0 ) {
				var camera = new APP.Camera(APP.cameraList[t].name, APP.cameraList[t].key, APP.cameraList[t].type, APP.cameraList[t].manufacturer, APP.cameraList[t].img);
				// console.log( APP.getMetadata(APP.cameraList[t].amazonUrl, "APP.getCameraMetatdataCallback" ) );
				APP.getMetadata(APP.cameraList[t].amazonUrl, "APP.getCameraMetatdataCallback" );
				APP.getMetadata(APP.cameraList[t].neweggUrl, "APP.getCameraMetatdataCallback" );
				APP.getMetadata(APP.cameraList[t].bestbuyUrl, "APP.getCameraMetatdataCallback" );

				APP.cameras.push(camera);
			}
		}
	}
}

APP.removeMetadataListManufacturer = function (manufacturer) {
	var t;
	console.log(APP.cameras);
	for( t = APP.cameras.length-1 ; t >= 0 ; t-- ) {
		//console.log( APP.cameras[t]);
		if( APP.cameras[t].manufacturer === manufacturer) {
			APP.cameras.splice(t,1);
		}
	}
	//console.log(APP.cameras);
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

	if( document.getElementById(jsonpURL) != null ) {
		document.getElementById(jsonpURL).remove();
	}
	document.head.appendChild(script);
}

function removeByValue(arr, val)
{
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}