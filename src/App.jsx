import React, { useState } from 'react';
import config from './config';
import './styles.css'; 

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!city || city.length === 0) {
        throw new Error('Please enter a city name');
      }

      const response = await fetch(`https://excited-tutu.cyclic.app/weather?city=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null); 
    } catch (error) {
      console.error(error);
      setError(error.message); 
      setWeatherData(null); 
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2 className="weather-info__city">{weatherData.name}</h2>
          <p className="weather-info__item">Temperature: {weatherData.main.temp} °F</p>
          <p className="weather-info__item">Description: {weatherData.weather[0].description}</p>
          <p className="weather-info__item">Wind Speed: {weatherData.wind.speed} miles/hour</p>
        </div>
      )}
    </div>
  );
}
