interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
    cod: number;
}

async function getWeather(): Promise<void> {
    const cityInput = document.getElementById("city") as HTMLInputElement;
    const resultDiv = document.getElementById("result") as HTMLDivElement;

    const city: string = cityInput.value;
    const apiKey: string = "b190a0605344cc4f3af08d0dd473dd25";

    if (!city) {
        resultDiv.innerText = "Enter a city name!";
        return;
    }

    const url: string =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response: Response = await fetch(url);
        const data: WeatherData = await response.json();

        if (data.cod !== 200) {
            resultDiv.innerText = "City not found!";
            return;
        }

        resultDiv.innerHTML = `
            🌡 Temp: ${data.main.temp}°C <br>:-)
            ☁ Weather: ${data.weather[0].description} <br>
            💧 Humidity: ${data.main.humidity}%
        `;
    } catch (error) {
        resultDiv.innerText = "Error fetching weather.";
    }
}
