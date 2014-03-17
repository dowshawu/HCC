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



APP.loadCamerasList = function(cameraList) {}

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

	//console.log("cameraMetadata = " + cameraMetadata);
	// var cameera = cameraMetadata;
	// console.log("cameraMetadata.amazon_product = " + cameraMetadata.amazon_product);
	
	// var camera = new Camera(cameraMetadata);
	
	//APP.passingObject = cameraMetadata.amazon_product;
	// console.log(APP.passingObject.title);

	//console.log(Object.getOwnPropertyNames(cameraMetadata) );
	var str;
	var i,j;

	if( Object.getOwnPropertyNames(cameraMetadata) == "amazon_product" ) {
		// console.log("got amazon product");
		APP.camera.amazon = cameraMetadata.amazon_product;
		str = cameraMetadata.amazon_product.title;
		console.log(str);
		var res = str.split(" ");
		for( i = 0 ; i < 5 ; i++ ) {
			for( j in APP.cameraListDSLR ) {
				if( APP.cameraListDSLR[j].key == res[i]) {
						console.log(res[i] + " got it!");
						break;
				}					
			}
			
		}
		// console.log(APP.camera.amazon);
	}
	else if( Object.getOwnPropertyNames(cameraMetadata) == "newegg_product" ) {
		APP.camera.newegg = cameraMetadata.newegg_product;
		str = cameraMetadata.newegg_product.title;
		//console.log(str);
		// console.log(APP.camera.newegg);
	}
	else if( Object.getOwnPropertyNames(cameraMetadata) == "bestbuy_product" ) {
		// console.log("got bestbuy");
		APP.camera.bestbuy = cameraMetadata.bestbuy_product;
		str = cameraMetadata.bestbuy_product.title;
		//console.log(str);
		// console.log(APP.camera.bestbuy);
	}

	// if( cameraMetadata[0])

}

APP.getMetadataList = function (type) {

	if(type === "DSLR") {

		var t;
		for( t in APP.cameraListDSLR ) {
			//console.log(APP.cameraListDSLR[t].name );
			// APP.camera[] = new Camera(APP.cameraListDSLR.name);
			APP.camera = new Camera();
			// console.log( APP.getMetadata(APP.cameraListDSLR[t].amazonUrl, "APP.getCameraMetatdataCallback" ) );
			APP.camera.amaon = APP.getMetadata(APP.cameraListDSLR[t].amazonUrl, "APP.getCameraMetatdataCallback" );
			// camera.amazon = APP.passingObject;
			// console.log(APP.getCameraMetatdataCallback)
			// console.log(APP.camera.amazon);
			APP.getMetadata(APP.cameraListDSLR[t].neweggUrl, "APP.getCameraMetatdataCallback" );
			// camera.newegg = APP.passingObject;
			// console.log(camera.newegg.title);
			APP.getMetadata(APP.cameraListDSLR[t].bestbuyUrl, "APP.getCameraMetatdataCallback" );
			// camera.bustbuy = APP.passingObject;
			// console.log(camera.buestbuy.title);
		}
	}
	else if( type === "Compack") {
		alert("got Compack");
	}
	

}

function getAndRenderCameras(bestSellerListMetadata)
{
	//console.log(bestSellerListMetadata);
	var camerasList = bestSellerListMetadata.amazon_list.items;
	//console.log(camerasList);
	
	for(i in camerasList)
	{
		var camera = new Camera(camerasList[i]);
		
		APP.cameras.push(camera);
		
		APP.mainContainer.appendChild(camera.visual);		
	}
	
	setTimeout(checkForFailedLoad, 1000);
	
	sortCamerasBy("name");
	displayAsGrid(APP.cameras);
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