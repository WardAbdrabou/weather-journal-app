// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express =require ('express');
const bodyParser = require('body-parser');


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port,theListining );
function theListining(){
    console.log('server is running');
    console.log(`running on local host : http://localhost:${port}`);
}

//get & post 

app.get('/allGetData', function (req, res) {
    res.send(projectData);
    
});

app.post('/addPostData', function (req, res) {

    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);   
});