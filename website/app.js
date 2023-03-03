/* Global Variables */
let apiBaseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const myApiKey = '&appid=4724b0a79315998346f40f2fae5d8a7a&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// the action generate
document.getElementById('generate').addEventListener('click', doActionGenerate);

function doActionGenerate(){
  const newZipCode =  document.getElementById('zip').value;
  const newFeelingsCode =  document.getElementById('feelings').value;

  getWeatherInformation(apiBaseURL,newZipCode, myApiKey)
  
  .then(function(infoData){
    console.log(infoData);
    postDataServer('/addPostData', {date:d , temp:infoData.main.temp , content:newFeelingsCode});
  })
  .then(function(){
    updateingUiData()
  })
};

const getWeatherInformation = async (apiBaseURL, newZipCode, myApiKey)=>{

    const response = await fetch(apiBaseURL+newZipCode+myApiKey)
    try {
  
      const infoData = await response.json();
      return infoData;

    }catch(error) {
      console.log("error", error);
      
    }
  };

const postDataServer = async ( url ='' , infoData = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(infoData), 
  });

    try {
      const newDataEntry = await response.json();
      console.log(newDataEntry);
      return newDataEntry;
             
    }
    catch(error){
      console.log("error", error);
    } 
      
};

const updateingUiData = async () => {
  const request = await fetch('/allGetData');
try {
const allSavedData = await request.json();
document.getElementById('date').innerHTML = allSavedData.date;
document.getElementById('temp').innerHTML = allSavedData.temp;
document.getElementById('content').innerHTML = allSavedData.content;

} catch (error) {
console.log("error", error);
}
}

  