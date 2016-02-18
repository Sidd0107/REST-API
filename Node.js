//Basic imports and variables.
var http = require('http');
var fs = require('fs');
var jsonFileObj = require("./data.json");
var path = require('path');
url = require("url");
//Sets port variable to 3000
PORT = 3000;
/*
Server creation and listening
The server below responds based on the if statements that
check the path of the request.
*/
http.createServer(function(request, response) {
	//Added this now to solve access control problem.
	response.setHeader('Access-Control-Allow-Origin', '*') 
	var parsed = url.parse(request.url);  
	var splitUrl = request.url.split("/");
  	console.log('Request: ' + request.url);
  	//Checks if main file is being called(html file)
   if (request.url == '/') {
      	fs.readFile('index.html', function (err, data) {
	    if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
		response.end();
	     });

	}
	// Serves js file request that is made from html file
	if(request.url == '/a3.js'){
      fs.readFile('a3.js', function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
      });

    }
    // Serves css file request made from html file.
 	if(request.url == '/style.css'){
      fs.readFile('style.css', function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });

    }
   //------------------API implementation if statements-------------------	

  // Returns all tweets,their creation time, id and text
  // by checking if path is /allTweets
  if (request.url == '/allTweets') {
	  	//Read and query file
	  	response.writeHeader(200, {"Content-Type": "application/json"});
	  	response.write('[');
	    for(var tweets in jsonFileObj) {
	      	console.log("id:"+jsonFileObj[tweets].id+", text:"+jsonFileObj[tweets].text);
	      	response.write('{\n"created_at": ' + JSON.stringify(jsonFileObj[tweets].created_at));
	      	response.write(',\n"id_str": '+ JSON.stringify(jsonFileObj[tweets].id_str));
	      	response.write(',\n"text": '+ JSON.stringify(jsonFileObj[tweets].text) + '\n}\n');
	      	//response.write(jsonFileObj[tweets]);
	 	}
		response.write(']');
		response.end(); 
  }
  // Returns all users along with their id, name and location
  // by checking is path is /allUsers
  if (request.url == '/allUsers') {
	  	var useridlist = new Array();
	  	response.writeHeader(200, {"Content-Type": "application/json"});  
	  	response.write('[');
	  	for(var tweets in jsonFileObj) {
	  		var user = jsonFileObj[tweets].user;
	  		if(useridlist.indexOf(JSON.stringify(user.id_str))==-1){
	  			useridlist.push(JSON.stringify(user.id_str));
	  			console.log("id:"+ user.id +", name:"+JSON.stringify(user.name));
	  			response.write('{\n"id_str": ' + JSON.stringify(user.id_str));
	  			response.write(',\n"name": '+ JSON.stringify(user.name));
	  			response.write(',\n"location": '+ JSON.stringify(user.location) + '\n}\n');
	  		}	
	  	}
	  	response.write(']');
	  	response.end(); 
  	}
  // Returns users name, url and tweet text
  // after checking if path end is /allExternalLinks
  if (request.url == '/allExternalLinks') {
	  	response.writeHeader(200, {"Content-Type": "application/json"});
	  	response.write('[');
	  	for(var tweets in jsonFileObj) {
	  		var urls = jsonFileObj[tweets].entities.urls;
	  		/*
	  		response.write('{"text": ' + JSON.stringify(jsonFileObj[tweets].text));
	  		console.log("name"+JSON.stringify(jsonFileObj[tweets].user.name));
	  		response.write('\n"user": {');
	  		response.write('\n"name": ' + JSON.stringify(jsonFileObj[tweets].user.name));
	  		response.write('\n}');
	  		*/
	  		response.write('{\n"name": ' + JSON.stringify(jsonFileObj[tweets].user.name));
	  		for(var item in urls){
	  			console.log( "url:"+ JSON.stringify(urls[item].url));
				response.write(',\n"url": '+ JSON.stringify(urls[item].url));		
	  		}
	  		response.write(',\n"text": '+ JSON.stringify(jsonFileObj[tweets].text) + '\n} \n]');

			
	  	}
	  	response.write(']');
	  	response.end(); 

  }
  //Must be called using /tweet/id. Checks if id is same and returns tweet elements.
  //Which include created_at, id_str and text. If id does not exist, returns not found.
  if(splitUrl[1] == "tweet"){
	  	response.writeHeader(200, {"Content-Type": "application/json"});
	  	var found = 0;
	  	
	  	for(var tweets in jsonFileObj) {
	  		if(splitUrl[2]===jsonFileObj[tweets].id_str){
	  			response.write('[');
	  			found = 1;
	  			console.log("id:"+jsonFileObj[tweets].id_str+", text:"+jsonFileObj[tweets].text);
	      		response.write('{\n"created_at": ' + JSON.stringify(jsonFileObj[tweets].created_at));
	      		response.write(',\n"id_str": '+ JSON.stringify(jsonFileObj[tweets].id_str) + '}');
	      		response.write(',\n"text": '+ JSON.stringify(jsonFileObj[tweets].text) + '\n}');

	  		}
	  	}
	  	if(found==0){
	  		response.write("Sorry id not found!");
	  		
	  	}else{
	  		response.write(']');
	  	}
	  	response.end();
  }
  // Must be called using /user/screen_name. If user_name exists
  // It returns id_str, name, url and description. If does not exist
  // returns not found
  if(splitUrl[1] == "user"){
	  	response.writeHeader(200, {"Content-Type": "application/json"});
	  	var found =0;  
	  	response.write('[');
	  	for(var tweets in jsonFileObj) {
	  		var user = jsonFileObj[tweets].user;
	  		if(splitUrl[2] === user.screen_name && found==0){
	  			found=1;  //Prevents duplicate print of same user info
	  			console.log("id:"+ user.id +", name:"+JSON.stringify(user.name));
	  			response.write('{\n"id_str": ' + JSON.stringify(user.id_str));
	  			response.write(',\n"name": '+ JSON.stringify(user.name));
	  			response.write(',\n"url": '+ JSON.stringify(user.url));
	  			response.write(',\n"description": '+ JSON.stringify(user.description) + '\n}');
	  		}	
	  	}
	  	if(found==1){
	  		response.write(']');
	  	}else{
	  		response.write("Sorry screen name not found!");
	  	}
	  	
	  	response.end(); 

  }
  // For interesting request, this returns tweet with maximum retweet count
  // along with the id_str, text and retweet_count
  // Path /maximumRetweets
  if (request.url == '/maximumRetweets') {
	  	response.writeHeader(200, {"Content-Type": "application/json"});
	  	response.write('[');
	  	var tweetMaxText="";
	  	var tweetMaxId="";
	  	var tweetMaker="";
	  	var retweets=0;
	  	var max=0;
	  	for(var tweets in jsonFileObj) {
	  		var count = jsonFileObj[tweets].retweet_count;
	  		if(count!=null){
	  			if(count>max){
	  				tweetMaxText=JSON.stringify(jsonFileObj[tweets].text);
	  				tweetMaxId=JSON.stringify(jsonFileObj[tweets].id_str);
	  				tweetMaker=JSON.stringify(jsonFileObj[tweets].user.name);
	  				retweets=JSON.stringify(jsonFileObj[tweets].retweet_count);
	  			}
	  		}
	  	}
	  	console.log("id_str:"+ tweetMaxId +", retweet_count:"+ retweets);
		response.write('{\n"id_str": ' + tweetMaxId);
		response.write(',\n"text": '+ tweetMaxText);
		response.write(',\n"retweet_count": '+ retweets + '\n}');
	  	response.write(']');
	  	response.end(); 

  }
  
}).listen(PORT, "0.0.0.0");
