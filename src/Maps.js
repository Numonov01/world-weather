import React, { useState, useEffect } from "react";
import "./Map.css";
import mapData from "./mapData.json";

const apiKey = "f46588e05520333b718598c61eff472f";

const Map = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedIndicator, setSelectedIndicator] = useState("temperature");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // 50 ta tasodifiy davlatni tanlash
  const getRandomCountries = (countries, count) => {
    const shuffled = countries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Ob-havo ma'lumotlarini olish
  const fetchWeatherForCountry = async (countryId, countryName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryId}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.main) {
        const newWeatherData = {
          temperature: data.main.temp,
          windSpeed: data.wind.speed,
          cloudiness: data.clouds.all,
          countryName: countryName,
        };

        setWeatherData((prevData) => ({
          ...prevData,
          [countryId]: newWeatherData,
        }));

        setSelectedCountry({ id: countryId, ...newWeatherData });
      }
    } catch (error) {
      console.error(`Error fetching weather data for ${countryId}:`, error);
    }
  };

  // Ranglarni aniqlash funksiyalari
  const getColorForTemperature = (temp) => {
    if (temp <= -30) return "#003366";
    if (temp <= -20) return "#4A90E2";
    if (temp <= -10) return "#B3DFFD";
    if (temp <= 0) return "#E6F7FF";
    if (temp <= 10) return "#D1F2D3";
    if (temp <= 20) return "#FFFACD";
    if (temp <= 30) return "#FFCC80";
    if (temp <= 40) return "#FF7043";
    return "#D32F2F";
  };

  const getColorForWindSpeed = (speed) => {
    if (speed <= 10) return "#E0F7FA";
    if (speed <= 20) return "#B2EBF2";
    if (speed <= 40) return "#4DD0E1";
    if (speed <= 60) return "#0288D1";
    return "#01579B";
  };

  const getColorForCloudiness = (cloudiness) => {
    if (cloudiness <= 10) return "#FFF9C4";
    if (cloudiness <= 30) return "#FFF176";
    if (cloudiness <= 60) return "#E0E0E0";
    if (cloudiness <= 90) return "#9E9E9E";
    return "#616161";
  };

  // Faqat 50 ta tasodifiy davlat uchun ob-havo ma'lumotlarini olish
  useEffect(() => {
    const randomCountries = getRandomCountries(mapData, 50);
    randomCountries.forEach((country) => {
      fetchWeatherForCountry(country.id, country.name);
    });
  }, []);

  return (
    <div id="map-container">
      <div className="weather-buttons">
        <button
          onClick={() => setSelectedIndicator("temperature")}
          className={selectedIndicator === "temperature" ? "active" : ""}
        >
          Havo harorati
        </button>
        <button
          onClick={() => setSelectedIndicator("windSpeed")}
          className={selectedIndicator === "windSpeed" ? "active" : ""}
        >
          Shamol tezligi
        </button>
        <button
          onClick={() => setSelectedIndicator("cloudiness")}
          className={selectedIndicator === "cloudiness" ? "active" : ""}
        >
          Bulutlilik darajasi
        </button>
      </div>

      {selectedCountry && (
        <div className="weather-info">
          <h3>{selectedCountry.id}</h3>
          <p>🌡️ Havo harorati: {selectedCountry.temperature}°C</p>
          <p>💨 Shamol tezligi: {selectedCountry.windSpeed} m/s</p>
          <p>☁️ Bulutlilik darajasi: {selectedCountry.cloudiness}%</p>
        </div>
      )}

      <svg
        id="allSvg"
        baseProfile="tiny"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        version="1.2"
        viewBox="0 0 2000 857"
        xmlns="http://www.w3.org/2000/svg"
      >
        {mapData.map((item) => {
          const countryWeather = weatherData[item.id];

          let fillColor = "#ececec";
          if (countryWeather) {
            if (selectedIndicator === "temperature") {
              fillColor = getColorForTemperature(countryWeather.temperature);
            } else if (selectedIndicator === "windSpeed") {
              fillColor = getColorForWindSpeed(countryWeather.windSpeed);
            } else if (selectedIndicator === "cloudiness") {
              fillColor = getColorForCloudiness(countryWeather.cloudiness);
            }
          }

          return (
            <path
              key={item.id}
              className="allPaths"
              d={item.d}
              id={item.id}
              onClick={() => fetchWeatherForCountry(item.id, item.name)}
              style={{ fill: fillColor }}
            ></path>
          );
        })}
      </svg>
    </div>
  );
};

export default Map;
