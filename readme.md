# Movie Recommender

Project is completed using NodeJS, HTML, and JavaScript.

# Files:

Server.js - NodeJS server, used for writing content to disk. (eg, matrix.txt, users.json)
index.html - Main login screen
recommender.html/js - Prediction / Allow users to rate movies. 
jquery-csv.js - Library containing star ratings for better UI.

I used collaboratibve filtering algorithm for predictions.

In simMatrix(): I created a simularity matrix by finding the cosim of each user compared to all the users individually.
In predict(): I returned the top 5 predictions a user may enjoy based on his ratings


## Input:

movies.csv - Used for movie title names
users.json - List of existing users I generated through testing.

## Output: 

matrix.txt - Simularity Matrix generated for predictions.
users.json - Any update to user information / ratings.

predictions are also outputed on the webapp accordingly.

## How to run:
Download & Install NodeJS.

Extract files to folder and run the following command in terminal / cmd when you're inside the folder:
> npm install 
> node server.js

Go to http://localhost:8080/index.html 

> Input a username (existing or new accepted)

Rate movies accordingly and when you're ready press predict to recieve the top 5 movie predictions. 
