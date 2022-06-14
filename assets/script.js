//create variable to store API key
const weatherAPIKey = "4523ea8a862fd071298a6b39372ecf26";
//create empty string for cities
let cityList = "";

//set items in local storage
function cityStorage() {
    localStorage.setItem("cities", cityList);
}

//create buttons for searched cities
function buildCityList() {
    $(".cityList").empty();
    cityList.forEach(function(city){
        $(".cityList").prepend($('<button class = "list-group-item list-group-item-action cityBtn" data-city="${city}">${city}</button>'));
    })
}
//initialize function to get searched cities from local storage
function init() {
    let cityStorage = JSON.parse(localStorage.getItem("cities"));

    if (cityStorage !== null) {
        cityList = storedCities;
    }

    buildCityList();

    if (cityList) {
        let thisCity = cityList[cityList.length - 1]
        getTheWeather(thisCity, weatherAPIKey);
        getForecast(thisCity, weatherAPIKey);
    }
}

//build url to get the info from weather API and display info
function getTheWeather(thisCity, weatherAPIKey) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weatherAPIKey}&units=imperial';
    let cityLat;
    let cityLong;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        $(".weatherToday").append(
            `<div class = "row m-1">
                <h2>${data.name} (${(new Date(1000 * data.dt).getUTCMonth()) +1}/${(new Date(1000 * data.dt).getUTCDate()) -1}/${(new Date(1000 * data.dt).getUTCFullYear())})</h2>
                <img src = "http://openweather.org/img/w/${data.weather[0].icon}.png">
                </div> `
        )
        $(".weatherToday").append(`<p> Temperature: ${data.main.temp}&degF</p>`)
        $(".weatherToday").append(`<p> Humidity: ${data.main.humidity}%</p>`)
        $(".weatherToday").append(`<p> Wind: ${data.wind.speed}mph</p>`)
        cityLat = data.coord.lat;
        cityLong = data.coord.long;
        getUVIndex(weatherAPIKey, cityLat, cityLong);
    })
}








$(".submit").click(function(e){
    e.preventDefault();
})
