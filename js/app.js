const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]');
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

const incrementTemperature = temperature => {
  let counter = 0
  cityTemperatureContainer.classList.remove('fade-in')

  setTimeout(() => {
    cityTemperatureContainer.classList.add('fade-in')
  }, 100);

  const timer = setInterval(() => {
    if (counter === Math.floor(temperature)) {
      clearInterval(timer)
    }

    cityTemperatureContainer.textContent = `${counter++}`
  }, 25);


}

const showData = (icon, isDayTime, cityName, weatherText, temperature ) => {
  const timeIcon = `<img src="./src/icons/${icon}.svg" alt="${weatherText}">`
  const infoList = [cityNameContainer, cityWeatherContainer, timeIconContainer]

  cityCard.classList.add('fade-in')

  const removeClassFadeIn = info => info.classList.remove('fade-in')
  const addClassFadeIn = info => info.classList.add('fade-in')

  infoList.forEach(removeClassFadeIn)

  if (cityCard.classList.contains('d-none')) {
    cityCard.classList.remove('d-none');
  }

  if (isDayTime) {
    timeImg.src = './src/day.svg'
  } else {
    timeImg.src = './src/night.svg'
  }


  setTimeout(() => {

    infoList.forEach(addClassFadeIn);
  }, 100);

  cityNameContainer.textContent = cityName
  cityWeatherContainer.textContent = weatherText
  timeIconContainer.innerHTML = timeIcon
  incrementTemperature(temperature)
}

cityForm.addEventListener('submit', async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  const cityData = await getCityData(inputValue)
  const [{ Key, LocalizedName }] = cityData
  const [{ Temperature, WeatherText, IsDayTime, WeatherIcon }] = await getCityWeather(Key)

  showData(WeatherIcon, IsDayTime, LocalizedName, WeatherText, Temperature.Metric.Value)

  cityForm.reset()
})
