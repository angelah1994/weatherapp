const express = require('express');
const unirest = require('unirest');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle POST requests
app.post('/', (request, response) => {
  const city = request.body.city;

  // Perform the API request to get weather data
  const req = unirest("GET", `https://openweather43.p.rapidapi.com/weather?q=${city}&appid=da0f9c8d90bde7e619c3ec47766a42f4&lang=en&units=imperial`);


  req.query({
    'q': city,
    'lang': 'en',
    'units': 'imperial',
  });

  req.headers({
    'x-rapidapi-key': 'b0ecde0aa7msh4000c55386b3d0ap1a619djsn5b8ac1b1b077',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'useQueryString': true,
  });

  req.end((res) => {
    if (res.error) {
      response.status(500).send('Error fetching weather data.');
    } else {
      response.send(res.body);
    }
  });
});

// Weather route
app.get('/weather', (req, res) => {
  // Simulate weather data for testing
  const weatherData = {
    temperature: 72.5,
    description: 'Partly cloudy',
  };
  res.json(weatherData);
});

// Start your server
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
