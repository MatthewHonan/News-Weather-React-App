import logo from './logo.svg';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';
import NewsList from './components/newslist/NewsList';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {

        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <h1 className="main-header">React News & Weather App
        <img alt="header-icon" className="header-icon" src={`icons/React-icon.png`} />
      </h1>
      <div className="weather-container">
        <h1 className="header">Weather and 7-Day Forecast 
          <img alt="design-icon" className="small-icon" src={`icons/03d.png`} />
        </h1>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}      
      </div>
      <div className='news-list'>
        <h1 className="news-header">Today's Top US Headlines:</h1>
        <NewsList></NewsList>
      </div>
    </div>
  );
}

export default App;
