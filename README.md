# Airport Info Fetcher

The **Airport Info Fetcher** is a React-based web application that allows users to retrieve detailed airport information and real-time weather reports. Users can input airport identifiers to view information like weather conditions and forecasts. The app supports offline usage by caching data locally.

---

## Features

- Retrieve real-time airport data and weather reports.
- Displays weather details like temperature, humidity, wind speed, and visibility.
- Includes a short-term forecast for two periods.
- Offline support: cached data is shown when offline.
- Clean, responsive user interface.

---

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

---

## Getting Started

1. **Clone the repository and Install dependencies:**

```bash
 cd airport-app
 npm install
```

2. **Set up environment variables:**
   Create a .env file in the root of your project with the following content:

```bash
  VITE_WEATHER_API_URL=https://qa.foreflight.com/weather/report
VITE_AIRPORT_API_URL=https://qa.foreflight.com/airports
VITE_API_USERNAME=ff-interview
VITE_API_PASSWORD=@-*KzU.*dtP9dkoE7PryL2ojY!uDV.6JJGC9
```

3. **Start the development server:**

```bash
 npm run dev
```

Visit http://localhost:5173 in your browser.

## Using the App

1. **Input Airport Identifiers:**

   - Enter one or more comma-separated airport identifiers (e.g., `KAUS, KDAB`) in the text input field.

2. **Fetch Data:**

   - Click the **"Fetch Data"** button to retrieve and display airport details and weather information.

3. **View Results:**

   - Airport details, including latitude, longitude, runway count, and weather data (temperature, humidity, wind speed, visibility, and a two-period forecast), will be displayed.

4. **Offline Usage:**
   - If the app is offline, it will display the cached data (if available). If no cached data exists, a message will notify the user.

---

## Testing the App

1. **Run Tests:**
   Execute the following command in the terminal to run all tests:
   ```bash
   npm test
   ```
