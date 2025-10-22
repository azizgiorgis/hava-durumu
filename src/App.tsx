import React, { useState } from 'react';
import axios from 'axios'; 

interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  humidity: number;
  pressure: number;
}

interface Wind {
  speed: number;
}

interface System {
  country: string;
}

interface WeatherData {
  name: string;
  sys: System;
  main: Main;
  wind: Wind;
  weather: Weather[];
}

function App() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Hava Durumu API Çağrısı Fonksiyonu
  const fetchWeather = async (targetCity: string) => {
    if (!targetCity) return;
    
    if (!API_KEY) {
      setError("Hata: REACT_APP_WEATHER_API_KEY bulunamadı. Lütfen .env.local dosyanızı kontrol edin.");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&units=metric&appid=${API_KEY}&lang=tr`;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get<WeatherData>(url);
      setWeatherData(response.data);
      console.log("Hava Durumu Verisi:", response.data);

    } catch (error) { 
      const axiosError = error as any; 

      if (axiosError.response) {
        if (axiosError.response.status === 404) {
          setError(`"${targetCity}" için hava durumu bilgisi bulunamadı.`);
        } else {
          setError(`Hata oluştu: ${axiosError.response.data?.message || 'Veri çekilemedi.'}`);
        }
      } else {
         setError("Bilinmeyen bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    const normalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
    fetchWeather(normalizedCity);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Hava Durumu Sorgula
        </h1>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Şehir adı girin (Örn: İstanbul)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => { 
                if (e.key === 'Enter') handleSearch(); 
            }}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Ara'}
          </button>
        </div>
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            {error}
          </div>
        )}
        {weatherData && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="text-center">
              <p className="text-6xl font-extrabold text-blue-800">
                {Math.round(weatherData.main.temp)}°C
              </p>
              <p className="text-xl text-gray-600 mt-2 capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>
                        <div className="flex justify-between mt-6 text-gray-600">
              <div className="text-center">
                <p className="font-semibold">Rüzgar</p>
                <p>{weatherData.wind.speed} m/s</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Nem</p>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Basınç</p>
                <p>{weatherData.main.pressure} hPa</p>
              
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;