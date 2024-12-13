import { render } from "@testing-library/react";
import AirportInfoCard from "../components/AirportCard";

test("renders AirportInfoCard without crashing", () => {
  const mockProps = {
    id: "KAUS",
    airportInfo: {
      name: "Austin-Bergstrom International Airport",
      latitude: 30.1945,
      longitude: -97.6681,
      runways: [],
    },
    weatherInfo: {
      report: {
        conditions: {
          tempC: 24,
          relativeHumidity: 50,
          visibility: { distanceSm: 10 },
          wind: { speedKts: 15, direction: 90 },
        },
      },
    },
    forecast: [],
  };

  render(<AirportInfoCard {...mockProps} />);
});
