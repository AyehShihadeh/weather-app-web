const apiKey = "3d1849e5b79c2721129053a422256034";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let cityinput = document.querySelector('.cityInput');
let searchBtn = document.querySelector('.searchBtn');

const weatherIcon = document.querySelector('.weather-icon');


async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  //if city name is invalid
  if(response.status == 404 || cityinput.value == ''){
    document.querySelector('.errorMsg').style.display = "block";
    document.querySelector('.weather').style.display = "none";
  }else{
    //hide error msg
    document.querySelector('.errorMsg').style.display = "none";
    var data = await response.json();

    console.log(data);

    document.querySelector(".city-name").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= `${Math.round(data.main.temp)}°c`;
    document.querySelector(".humidity-percent").innerHTML= `${data.main.humidity}%`;
    document.querySelector(".wind-speed").innerHTML= `${data.wind.speed} km/h`;

    document.querySelector(".weather").style.display = "block";

    if(data.weather[0].main == "Clouds"){
      weatherIcon.src = "IMAGES/clouds.png";
    }else if(data.weather[0].main == "Clear"){
      weatherIcon.src = "IMAGES/clear.png";
    }else if(data.weather[0].main == "Drizzle"){
      weatherIcon.src = "IMAGES/drizzle.png";
    }else if(data.weather[0].main == "Snow"){
      weatherIcon.src = "IMAGES/snow.png";
    }else if(data.weather[0].main == "Rain"){
      weatherIcon.src = "IMAGES/rain.png";
    }else if(data.weather[0].main == "Mist"){
      weatherIcon.src = "IMAGES/mist.png";
    }
  }

}

//if user clicks search button
searchBtn.addEventListener("click", ()=>{
  checkWeather(cityinput.value);
})

//if user presses enter key
cityinput.addEventListener("keyup", (event)=>{
  if(event.key === 'Enter'){
    checkWeather(cityinput.value);
  }
})


