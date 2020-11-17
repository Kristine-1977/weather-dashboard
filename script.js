$(document).ready(function () {
    function start() {
        navigator.geolocation.getCurrentPosition(success, error);
        function success(pos) {
            console.log(pos);
            let lat = pos.coords.latitude;
            let long = pos.coords.longitude;
            weather(lat, long);
        }
    }
    start()

    $(".btn").on("click", function (event) {
        event.preventDefault();
        let city = $(".form-control").val();
        cityWeather(city);
        cityForcast(city);
        console.log(city);
    })
    function error() {
        console.log("error");
    }
    function weather(lat, long) { //call the weather function!
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=230b9b804f5520f3d52810d59c91b1b0`;
        console.log(url);
        $.ajax({ url: url, type: "GET" }).done(function (data) {
            console.log("ajax");
            updateDOM(data);
        })
    };
    function updateDOM(data) {
        let city = data.name;
        console.log(data)
        let temp = Math.round(data.current.temp);
        const celsius = temp - 273;
        let fahrenheit = Math.floor(celsius * (9 / 5) + 32);
        let desc = data.current.weather[0].description;
        let icon = data.current.weather[0].icon;


        $("#city").html(city);
        $("#temp").html(fahrenheit);
        $("#desc").html(desc);
        $("#icon").attr("src", icon);
    }
    function updateCity(data) {
        let city = data.name;
        console.log(data);
        $("#city").html(city);
        let wind = data.wind.speed
        $(`.wind`).html(wind);
    }
    function cityWeather(city) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=230b9b804f5520f3d52810d59c91b1b0`;
        console.log(url);
        $.ajax({ url: url, type: "GET" }).done(function (data) {
            console.log("ajax");
            updateCity(data);
        })
    }
    function updateForcast(data) {
        console.log(data);
    }
    function cityForcast(city) {
        let url = `https://api.openweathermap.org/data/2.5/forcast?q=${city}&appid=230b9b804f5520f3d52810d59c91b1b0`;
        console.log(url);
        $.ajax({ url: url, type: "GET" }).done(function (data) {
            console.log("ajax");
            updateForcast(data);
        });
    }
});
//Correct! And need to work on your updateDOM() function so that it can work with both of the API responses correctly