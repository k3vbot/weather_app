const APIKey = "4523ea8a862fd071298a6b39372ecf26";
const city = "";
const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=' + city + &appid=" + APIKey;

fetch(queryURL)
