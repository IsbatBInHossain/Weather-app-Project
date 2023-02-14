const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    let city = req.body.cityName;
    console.log(city);
    let apiKey = "54801adf635195560d16b19c66c3f628";
    let unit = "metric";
    geo_url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    https.get(geo_url, (response) => {
        response.on("data", (data) => {
            const geoData = JSON.parse(data);
            let latitude = geoData[0].lat;
            let longitude = geoData[0].lon;
            url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + unit;
            https.get(url, (response) => {
                response.on("data", (data) => {
                    const weatherData = JSON.parse(data);
        
                    let temp = weatherData.main.temp;
                    let description = weatherData.weather[0].description;
                    let icon = weatherData.weather[0].icon;
                    let place = weatherData.name;
                    let imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        
                    res.write("<h1>The current temperature of " + city + " is " + temp + " degree celcius.</h1>");
                    res.write("<p>The weather is " + description + ".</p>");
                    res.write("<img src=" + imageURL + "><img>");
                    res.send();
        
                })
            })
        })
    })



})






app.listen("3000", () => {
    console.log("Server has started");
})