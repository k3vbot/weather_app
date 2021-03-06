//create variable to store API key
const weatherAPIKey = "225851f9311f6df037b641b3c403576b";
//create empty array for cities
let cityList = [ ];

//set items in local storage
function cityStorage() {
    localStorage.setItem("cities", JSON.stringify(cityList));
}

//create buttons for searched cities
function buildCityList(){
    $(".cityList").empty();
    cityList.forEach(function(city){
        $(".cityList").prepend($(`<button class = "list-group-item list-group-item-action cityBtn" data-city="${city}">${city}</button>`));
    })
}
//initialize function to get searched cities from local storage
function init() {
    let cityStorage = JSON.parse(localStorage.getItem("cities"));

    if (cityStorage !== null) {
        cityList = cityStorage;
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
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${thisCity}&units=imperial&appid=${weatherAPIKey}`;
    let cityLat;
    let cityLong;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        $(".weatherToday").append(
            `<div class = "row m-1">
                <h2>${data.name} (${(new Date(1000 * data.dt).getUTCMonth()) +1}/${(new Date(1000 * data.dt).getUTCDate()) -1}/${(new Date(1000 * data.dt).getUTCFullYear())})</h2>
                </div> `
        )
        $(".weatherToday").append(`<p> Temperature: ${data.main.temp}&degF</p>`)
        $(".weatherToday").append(`<p> Humidity: ${data.main.humidity}%</p>`)
        $(".weatherToday").append(`<p> Wind: ${data.wind.speed}mph</p>`)
        cityLat = data.coord.lat;
        cityLong = data.coord.lon;
        getUVIndex(weatherAPIKey, cityLat, cityLong);
    })
}

//5 day forecast
function getForecast(thisCity, weatherAPIKey) {
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${thisCity}&units=imperial&appid=${weatherAPIKey}`;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(data){
        for (i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.search("15:00:00") != -1) {
                let forecastDate = data.list[i];
                $(".forecast").append(
                    `<div class="card bg-primary shadow m-4">
                        <div class="card-body">
                            <h4 class="card-title">${(new Date(1000 * forecastDate.dt).getUTCMonth()) + 1}/${new Date(1000 * forecastDate.dt).getUTCDate()}/${new Date(1000 * forecastDate.dt).getUTCFullYear()}</h4>
                            <div class="card-text">
                                <img src="http://openweathermap.org/img/w/${forecastDate.weather[0].icon}.png">
                                <p class="card-text">Temp: ${forecastDate.main.temp} &degF</p>
                                <p class="card-text">Humidity: ${forecastDate.main.humidity} %</p>
                                <p class="card-text">Wind: ${forecastDate.wind.speed}mph</p>
                            </div>
                        </div>
                    </div>`
                );
            }    
        }
    })
}

// function to get UV data
function getUVIndex(weatherAPIKey, cityLat, cityLong) {
    let uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLong}&appid=${weatherAPIKey}`;

    $.ajax({
        url: uvUrl,
        method: "GET"
    }).then(function (data) {
        $(".weatherToday").append(`<p>UV Index: ${data.value}</p>`);
    })
}

function displayCityWeather() {
    let thisCity = $(this).attr("data-city");

    $(".weatherToday").empty();
    getTheWeather(thisCity, weatherAPIKey);

    $(".forecast").empty();
    getForecast(thisCity, weatherAPIKey);
}

init();



$(".submit").click(function(e){
    e.preventDefault();
    console.log("im a button");
    let newCity = $("#searchInput").val().trim();
    cityList.push(newCity);
    buildCityList();
    cityStorage();
    $("#searchInput").val("");
})

$(".cityList").on("click", ".cityBtn", displayCityWeather);