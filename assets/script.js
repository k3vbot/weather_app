$(".search").click(function(e){
    e.preventDefault();
    const inputVal = input.value
})

const weatherAPIKey = "4523ea8a862fd071298a6b39372ecf26";
let city = "";

const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${weatherAPIKey}&units=imperial';

fetch(queryURL)
    .then(response => response.json())
    .then(data => {

    })
    .catch(() => {
        msg.textContent = "Please search for a valid city";
    });


