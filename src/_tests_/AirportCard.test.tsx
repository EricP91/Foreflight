import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AirportCard from "../components/AirportCard";
const mockData = {
  id: "KAUS",
  airport: {
    name: "Austin-Bergstrom International Airport",
    latitude: "30.1945",
    longitude: "-97.67",
    runways: [1, 2],
  },
  weather: {
    tempF: 75,
    relativeHumidity: 50,
    visibility: 10,
    windSpeed: 12,
    windDir: "NW",
  },
  forecast: [
    {
      period: { dateStart: "00:00", dateEnd: "03:00" },
      windSpeed: 10,
      windDir: "E",
    },
    {
      period: { dateStart: "03:00", dateEnd: "06:00" },
      windSpeed: 15,
      windDir: "SE",
    },
  ],
};
test("throws error for undeclared variables", () => {
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  expect(() => {
    render(
      <AirportCard
        id={mockData.id}
        airportInfo={mockData.airport}
        weatherInfo={mockData.weather}
        forecast={mockData.forecast}
      />
    );
  }).toThrowError("Cannot read properties of undefined");

  consoleError.mockRestore();
});
