import axios from "axios";
import {
  WEATHER_API_URL,
  AIRPORT_API_URL,
  API_USERNAME,
  API_PASSWORD,
} from "../utils/env";

const COMMON_HEADERS = {
  "ff-coding-exercise": "1",
};

export const fetchWeatherData = async (airportId: string) => {
  try {
    const url = `${WEATHER_API_URL}/${airportId}`;
    const response = await axios.get(url, {
      headers: COMMON_HEADERS,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchAirportData = async (airportId: string) => {
  try {
    const url = `${AIRPORT_API_URL}/${airportId}`;
    const response = await axios.get(url, {
      headers: COMMON_HEADERS,
      auth: {
        username: API_USERNAME,
        password: API_PASSWORD,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching airport data:", error);
    throw error;
  }
};
