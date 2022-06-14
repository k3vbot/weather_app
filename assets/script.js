const weatherAPIKey = "4523ea8a862fd071298a6b39372ecf26";
let cityList = "";

function cityStorage() {
    localStorage.setItem("cities", cityList);
}

function buildCityList() {
    $(".cityList").empty();
    cityList.forEach(function(city){
        $(".cityList").prepend($('<button class = "list-group-item list-group-item-action cityBtn" data-city="${city}">${city}</button>'));
    })
}

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

function getTheWeather(thisCity, id) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weatherAPIKey}&units=imperial';
}







$(".submit").click(function(e){
    e.preventDefault();
})
