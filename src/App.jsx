import React, { useState } from 'react';
import config from './config';
export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!city || city.length == 0) {
        throw new Error('Please enter a city name');
      }

      const response = await fetch(`${config.apiUrl}weather?city=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error message
      setWeatherData(null); // Clear weather data on error
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °F</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} miles/hour</p>
        </div>
      )}
    </div>
  );
}
