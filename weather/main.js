let cityData = [
    { name: "", lat: "", lon: "" },
    { name: "台北", lat: 25.0856513, lon: 121.421409 },
    { name: "台中", lat: 24.1852333, lon: 120.4946381 },
    { name: "高雄", lat: 22.7000444, lon: 120.0508691 },
];

$(function(){
    for(let x = 0; x < cityData.length; x++){
        $("#citySelect").append(`<option value='${x}'>${cityData[x].name}</option>`);
    }
    $("#citySelect").on("change", loadServerData);

    $("#getLocationButton").on("click", getCurrentLocation);
});

function loadServerData(){
    $("#result").empty();
    if(this.value == 0) return;

    let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather";
    let weatherMapAPIKey = "Your API Key here";

    let lat = parseFloat(cityData[this.value].lat);
    let lon = parseFloat(cityData[this.value].lon);

    $.getJSON(weatherAPI_URL, {
        lat: lat,
        lon: lon,
        appid: weatherMapAPIKey,
        units: 'metric',
        lang: 'zh_tw'
    })
    .done(function(data) {
        $("#result")
        .append(`<p>氣溫: ${data.main.temp_min}~ ${data.main.temp_max}</p>`);
        $("#result")
        .append(`<p><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>
        ${data.weather[0].description}</p>`);
    })
    .fail(function(){
        console.log("Error");
    })
    .always(function(){
        console.log("Always");
    });
}

function getCurrentLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        });
    } else {
        $("#currentLocationResult").text("瀏覽器不支援地理位置功能");
    }
}

function getWeatherByCoordinates(lat, lon){
    let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather";
    let weatherMapAPIKey = "Your API Key here";

    $.getJSON(weatherAPI_URL, {
        lat: lat,
        lon: lon,
        appid: weatherMapAPIKey,
        units: 'metric',
        lang: 'zh_tw'
    })
    .done(function(data) {
        $("#currentLocationResult").empty();
        $("#currentLocationResult")
        .append(`<p>您的位置:</p>`);
        $("#currentLocationResult")
        .append(`<p>緯度: ${lat}</p>`);
        $("#currentLocationResult")
        .append(`<p>經度: ${lon}</p>`);
        $("#currentLocationResult")
        .append(`<p>氣溫: ${data.main.temp_min}~ ${data.main.temp_max}</p>`);
        $("#currentLocationResult")
        .append(`<p><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'>
        ${data.weather[0].description}</p>`);
    })
    .fail(function(){
        $("#currentLocationResult").text("無法取得當前位置的天氣資訊");
    })
    .always(function(){
        console.log("Always");
    });
}
