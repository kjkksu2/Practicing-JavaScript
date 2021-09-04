const weather = document.querySelector(".weather");
const weatherBtn = document.querySelector(".weather-button");
const weatherCancel = weather.querySelector("span:first-child");

const img = weather.querySelector(".weather__img img");
const temperature = weather.querySelector(".weather__temperature span");

const etc = weather.querySelector(".weather__etc");
const humidity = etc.querySelector("span:first-child");
const wind = etc.querySelector("span:last-child");

const loc = weather.querySelector(".weather__location");
const position = loc.querySelector("span:first-child");
const nature = loc.querySelector("span:last-child");

const getLocation = async (pos) => {
  const lat = pos.coords.latitude;
  const long = pos.coords.longitude;
  const API_KEY = "0907a6077a07c16b8a9d90bddf4457b6";

  const info = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`,
      {
        method: "GET",
      }
    )
  ).json();

  console.log(info);

  const {
    name,
    sys: { country },
    main: { temp, humidity: hum },
    wind: { speed },
  } = info;
  const { main, icon } = info.weather[0];

  img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  temperature.innerText = `${parseInt(temp - 273.15)}`;
  humidity.innerText = `hum: ${hum}%`;
  wind.innerText = `wind: ${parseInt(speed)}m/s`;
  position.innerText = `${name}, ${country}`;
  nature.innerText = `${main}`;
};

const getError = (error) => {
  console.log(error.code, error.message);
};

navigator.geolocation.getCurrentPosition(getLocation, getError);

const clickWeatherCancel = () => {
  weather.animate(
    [{ opacity: 1 }, { transform: "translateY(10px)", opacity: 0 }],
    {
      duration: 500,
      fill: "forwards",
    }
  );
  timeoutID = setTimeout(() => {
    weather.classList.add("hidden");
  }, 510);
};

const clickWeatherBtn = () => {
  if (weather.classList.contains("hidden")) {
    // 창을 열 때
    weather.animate(
      [{ opacity: 0 }, { transform: "translateY(-50px)", opacity: 1 }],
      {
        duration: 500,
        easing: "linear",
        fill: "forwards",
      }
    );
    weather.classList.remove("hidden");
  } else {
    // 창을 닫을 때
    weather.animate(
      [{ opacity: 1 }, { transform: "translateY(10px)", opacity: 0 }],
      {
        duration: 500,
        easing: "linear",
        fill: "forwards",
      }
    );
    timeoutID = setTimeout(() => {
      weather.classList.add("hidden");
    }, 510);
  }
};

weatherCancel.addEventListener("click", clickWeatherCancel);
weatherBtn.addEventListener("click", clickWeatherBtn);
