import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";
import Login from "./Login";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchWeatherData = (type) => {
    if (!selectPosition) {
      alert("Please select a position on the map.");
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${selectPosition.lat}&lon=${selectPosition.lon}&appid=23306a7ab984bb6f7684ff4b7a22fcfb`;

    setLoading(true);
    setError("");
    setWeatherType(type);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectPosition) {
      fetchWeatherData("main");
    }
  }, [selectPosition]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div style={{ width: "50vw", height: "100%" }}>
            <Maps
              selectPosition={selectPosition}
              weatherData={weatherData}
              weatherType={weatherType}
            />
          </div>
          <div style={{ width: "50vw", padding: "20px" }}>
            <SearchBox
              selectPosition={selectPosition}
              setSelectPosition={setSelectPosition}
            />
            <div
              style={{
                padding: "24px",
                margin: "0 auto",
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <button
                  onClick={() => fetchWeatherData("main")}
                  style={{ padding: "10px 20px", marginRight: "10px" }}
                >
                  Temperature
                </button>
                <button
                  onClick={() => fetchWeatherData("wind")}
                  style={{ padding: "10px 20px", marginRight: "10px" }}
                >
                  Wind Speed
                </button>
                <button
                  onClick={() => fetchWeatherData("clouds")}
                  style={{ padding: "10px 20px" }}
                >
                  Cloudiness
                </button>
              </div>

              {loading && <p>Loading weather data...</p>}
              {error && <p>{error}</p>}

              {weatherData && !loading && (
                <div style={{ marginTop: "16px" }}>
                  {weatherType === "main" && (
                    <p>Temperature: {weatherData.main?.temp}°C</p>
                  )}
                  {weatherType === "wind" && (
                    <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
                  )}
                  {weatherType === "clouds" && (
                    <p>Cloudiness: {weatherData.clouds?.all}%</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
