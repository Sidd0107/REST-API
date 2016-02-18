
//This is the text field where all results wil be displayed
var outputText = document.getElementById("output");

//-----------------JQUERY----------------------------------

//Below are all the JQuery button click listeners. They call the functions below
//That make the Ajax requests.
$("#getAllTweets").click(function(){
   allTweetRequest();
});

$("#getAllKnownTwitterUsers").click(function(){
	allUsers();
});
$("#getAllExternalLinks").click(function(){
	allExternal();
});
$("#Detailabouttweet").click(function(){
	var tweetid = prompt("Please enter the Tweet Id here", "Tweet ID");
	specificTweetfunct(tweetid);
});
$("#profileInfo").click(function(){
	var screen_name = prompt("Please enter the user's screen name", "Screen Name");
	specificUserfunct(screen_name);
});
$("#interestingInfo").click(function(){
	maxTweets();
});


//----------Functions that make AJAX requests to server----------


//Creates ajax request to get all tweets.
function allTweetRequest(){
	outputText.innerHTML=" ";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
			outputText.innerHTML=xmlHttp.responseText;
		}
	}
    xmlHttp.open( "GET", "http://127.0.0.1:3000/allTweets", true); // false for synchronous request
    xmlHttp.send(null);
    
}

//Creates ajax request to get all users.
function allUsers(response){
	outputText.innerHTML=" ";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
			outputText.innerHTML=xmlHttp.responseText;
		}
	}
    xmlHttp.open( "GET", "http://127.0.0.1:3000/allUsers", true); // false for synchronous request
    xmlHttp.send(null);
}

//Creates ajax request to get all external links.
function allExternal(){
	outputText.innerHTML=" ";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
			outputText.innerHTML=xmlHttp.responseText;
		}
	}
    xmlHttp.open("GET", "http://127.0.0.1:3000/allExternalLinks", true); // false for synchronous request
    xmlHttp.send(null);
}

//Creates ajax request to get specific tweets with given tweet id.
function specificTweetfunct(tweetid){
    if(tweetid!=null){
    	outputText.innerHTML=" ";
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
			outputText.innerHTML=xmlHttp.responseText;
			}
		}
    	xmlHttp.open("GET", "http://127.0.0.1:3000/tweet/"+tweetid, true); // false for synchronous request
    	xmlHttp.send(null);
    }else{
    	outputText.innerHTML=("Sorry you did not enter a tweet id");
    }
}

//Creates ajax request to get user profile info with specific screen name.
function specificUserfunct(screen_name){
	if(screen_name!=null){
    	outputText.innerHTML=" ";
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function(){
			if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
				outputText.innerHTML=xmlHttp.responseText;
				}
		}
    	xmlHttp.open("GET", "http://127.0.0.1:3000/user/"+screen_name, true); // false for synchronous request
    	xmlHttp.send(null);
    }else{
    	outputText.innerHTML=("Sorry you did not enter a screen_name");
    }
}

//Creates ajax request to get max tweets. Note this is the request to
//showcase my ability to extract interesting infor from the archive.
function maxTweets(){
	outputText.innerHTML=" ";
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://127.0.0.1:3000/maximumRetweets", false ); // false for synchronous request
    xmlHttp.send( null );
    outputText.innerHTML=xmlHttp.responseText;
}
