const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require ('request');

const apiKey ='48e99e4f62b99be7f722a8c82360cf01';



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

  app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},uk&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        console.log(weather.weather[0].icon);
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
        let temp = Math.round(weather.main.temp); 
            let iconCode = weather.weather[0].icon;
            // let iconurl = "http://openweathermap.org/img/w/" + icon+ ".png";
          let weatherText = `It's ${temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, iconCode:iconCode, error: null});
        }
      }
    });
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
