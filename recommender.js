
var movies;

var ratings;
var users;

const params = new URLSearchParams(document.location.search);
const userName = params.get("userName");
console.log(userName)


window.onload = function what(){
document.getElementById('user').innerHTML = "Logged in as: " + userName;



var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	processCSVContents(xhttp);
};
xhttp.open("GET", "movies.csv", true);
xhttp.send();



var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    window.users = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", "users.json", true);
xmlhttp.send();

}
 function processCSVContents(httpRequest){
	 if (httpRequest.readyState == 4){
                    if ((httpRequest.status == 200)|| (httpRequest.status == 0)){
                        CSVContents = httpRequest.responseText;
                        window.movies = $.csv.toObjects(CSVContents);
						nextStep();
                    } else {
                    alert(' => There was a problem with the request. ' 
                            + httpRequest.status + httpRequest.responseText);
                    }
                }
		
 }
 
 
 function nextStep(){
	 if (userName in users){
		newUser();
		
	 } else {
		console.log("userName is a new User")
		users[userName] = {} 
		newUser();
	 }
	 console.log(movies[1].title)	
 }
 
 function newUser(){
	randomInt = Math.floor(Math.random() * 9700) + 1
    document.getElementById('title').innerHTML = movies[randomInt].title;
	var options = {
    max_value: 5,
    step_size: 1,
    initial_value: 0,
 
}
$(".rating").rate(options);

$(".rating").on("change", function(ev, data){
	
    //console.log(data.from, data.to);
	addFilm(movies[randomInt].title, data.to)
	$('.rating').off('change');
	$(".rating").rate("setValue", 0);
	newUser()
    });
	}
	
function addFilm(title, rating){
	users[userName][title] = rating 
	writeToFile();
}

function writeToFile(){
	
	var json = JSON.stringify(users);
	var xhr = new XMLHttpRequest();
	xhr.open("POST","http://localhost:8080/users",true);
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(json);
	//fs.writeFile('myjsonfile.json', json, 'utf8', callback);
}
function commonKeys(obj1, obj2) {
  var keys = [];
  
  return keys;
}
function sim(user1, user2){
	var keys = []
	
	// Find intersection
	for(var i in users[user1]) {
		if(i in users[user2]) {
			keys.push(i);
		}
	}
	var sum1 = 0;
	var sum2 = 0;
	keys.forEach(key => {
		
	sum1 += users[user1][key];
	sum2 += users[user2][key];
	});
	
	sum1 = sum1 / keys.length;
	sum2 = sum2 / keys.length
	
	topValue = 0;
	bottomLeft = 0;
	bottomRight = 0;
	keys.forEach(key => {
		topValue += (users[user1][key]-sum1)*(users[user2][key]-sum2);
		bottomLeft += Math.pow((users[user1][key]-sum1), 2)
		bottomRight += Math.pow((users[user2][key]-sum2), 2)
	});
	bottom = Math.sqrt(bottomLeft*bottomRight);
	
	var cosim = topValue/bottom
	if (isNaN(cosim)) cosim = -1;
	return cosim;
}

function simMatrix(){
	keys = Object.keys(users);
	matrix = []
	txt = '';
	for(var i = 0; i < keys.length;i++){
		matrix[keys[i]] = [];
		for(var j = 0; j < keys.length;j++){
			if (i == j) continue;
			var val =  sim(keys[i],keys[j]);
			matrix[keys[i]][keys[j]] = val;
			txt += keys[i]+ ' vs ' + keys[j] + ' = ' + val +'\n';
			
		}
	}
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST","http://localhost:8080/matrix",true);
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(txt);
	
	return matrix;
}

function predict(){
	matrix = simMatrix();
	user = matrix[userName]
	
	user = Object.keys(user).reduce(function(a, b){ return user[a] > user[b] ? a : b });
	
	keys = []
	for(var i in users[user]) {
		if(!(i in users[userName])) {
			keys.push(i);
		}
	}
	top5 = ""
	i = 0
	while (keys.length > i && i < 5){
	top5 = top5 + keys[i] + " </br>";
	i++;
	}
	top5 = "Top predictions: <br> " + top5;
    document.getElementById('predictions').innerHTML = top5;
	 
}