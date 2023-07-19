//variables
const fiveday = document.getElementById('5day')
const searchForm = document.getElementById('search-form')
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const pastCities = document.getElementById('past-cities')
const currentCity = document.getElementById('current-city')
const currentTemp = document.getElementById('current-temp')
const fivedayforecast = []
fivedaytemperature = []
fivedayhumidity = []
fivedaywind = []
fivedayuv = []
fivedayicon = []


const apikey = '03aa7027444e2d3af9f29696b97c7af9'
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikey + '&units=imperial'


// function getForecast(city) {
//     fetch(apiURL).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log(data);
//         for (i=0; i<6; i++) {
//             fivedayforecast.push(data.list[i].dt_txt)
//             fivedaytemperature.push(data.list[i].main.temp)
//             fivedayhumidity.push(data.list[i].main.humidity)
//             fivedaywind.push(data.list[i].wind.speed)
//             fivedayuv.push(data.list[i].main.uvi)
//             fivedayicon.push(data.list[i].weather[0].icon)
//         }
//     })

    

// }


// function searchForCity() {
//     var city = $('#search-input')[0].value.trim();
//     fetch(apiURL).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                $('#past-cities').append('<li type="button">' + city + '</li>')

//             });
//         }
// });

// }



//function to get forecast data

//function to display weather data

//function to display forecast data

//function with event listener to search for city   

//function to save city to local storage

//function to get city from local storage

//function to display city from local storage


//event listeners
searchBtn.addEventListener(searchBtn, searchForCity)


// function that searches the city and pulls the api key

function searchForCity() {
    var city = $('#search-input')[0].value.trim();

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                $('#past-cities').append('<li type="button">' + city + '</li>')
                console.log(data);
                currentCity.textContent = city + " (" + dayjs().format('M/D/YYYY') + ")"

                var lat = data.coord.lat
                var lon = data.coord.lon

                var latlon = lat.toString() + "," + lon.toString()

                localStorage.setItem(city, latlon)
            });
        }
        else {
            alert("Error");
        }
    });
}

//function that displays the current weather at the top of the page

function displayCurrentWeather(data) {
    $('#current-weather').empty();

    fivedayforecast(data)
}

//function that displays the 5 day forecast

function fivedayforecast(data) {
    for (var i=0; i<5; i++) {
        var currentDate = "#date" + i
        var currentTemp = "#temp" + i
        var currentHumidity = "#humidity" + i
        var currentWind = "#wind" + i
        var currentUV = "#uv" + i
        var currentIcon = "#icon" + i
    
        $(currentDate)[0].textContent=convertDate(data, i)
        $(currentTemp)[0].textContent=data.daily[i+1].temp.day+"°F"
        $(currentHumidity)[0].textContent=data.daily[i+1].humidity+"%"
        $(currentWind)[0].textContent=data.daily[i+1].wind_speed+"MPH"
        $(currentUV)[0].textContent=data.daily[i+1].uvi
        $(currentIcon)[0].src= data.daily[i+1].weather[0].icon + ".png"
    }
}

//function that converts the date from unix to mm/dd/yyyy

function convertDate(data, i) {
    var unixTime = data.daily[i+1].dt
    var date = new Date(unixTime*1000)
    var month = date.getMonth()+1
    var day = date.getDate()
    var year = date.getFullYear()
    var convertedDate = month + "/" + day + "/" + year
    return convertedDate    
}

//function that searches for a city when you click search
$('#search-btn').click(function(event) {
    event.preventDefault();
    searchForCity();
})


//function for when you click on a past city
$('#past-cities').click(function(event) {
    event.preventDefault();
    var city = event.target.textContent;
    var latlon = localStorage.getItem(city)
    var lat = latlon.split(",")[0]
    var lon = latlon.split(",")[1]
    var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apikey + '&units=imperial'
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                currentCity.textContent = city + " (" + dayjs().format('M/D/YYYY') + ")"
                fivedayforecast(data)
            });
        }
        else {
            alert("Error");
        }
    });
})

