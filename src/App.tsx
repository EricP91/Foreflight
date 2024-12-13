/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  AppBar,
  Toolbar,
  Container,
  Alert,
  IconButton,
  Collapse,
  AlertColor,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AirportCard from "./components/AirportCard";
import { fetchAirportData, fetchWeatherData } from "./services/apiService";

interface IAirport {
  id: string;
  airportInfo: any;
  weatherInfo: any;
  forecast: any[];
}

const App: React.FC = () => {
  const [inputIds, setInputIds] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [airportData, setAirportData] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [fetchingStatus, setFetchingStatus] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("cachedAirportData");
    if (storedData) {
      setAirportData(JSON.parse(storedData));
    }
  }, []);

  const handleFetchData = async () => {
    if (!navigator.onLine) {
      setFetchingStatus("error");
      if (airportData.length > 0) {
        setMessage("You are offline. Showing cached data.");
        return;
      }
      setMessage("You are offline and no cached data is available.");
      return;
    }

    if (!inputIds.trim()) {
      setFetchingStatus("error");
      setMessage("Please enter one or more airport identifiers.");
      return;
    }

    setIsLoading(true);
    const ids = inputIds.split(",").map((id) => id.trim());

    try {
      const fetchedData = await Promise.all(
        ids.map(async (id) => {
          const airportInfo = await fetchAirportData(id);
          const weatherInfo = await fetchWeatherData(id);
          const forecast = weatherInfo.report.forecast.conditions.slice(0, 2);
          return { id, airportInfo, weatherInfo, forecast };
        })
      );

      localStorage.setItem("cachedAirportData", JSON.stringify(fetchedData));
      setAirportData(fetchedData);
      setFetchingStatus("success");
      setMessage("Fetched Airport information successfully.");
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchingStatus("error");
      setMessage("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #3f51b5, #2196f3)",
          color: "white",
        }}
        elevation={4}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", textAlign: "center" }}
          >
            AeroView
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: "bold",
                background: "linear-gradient(90deg, #3f51b5, #2196f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Fetch Airport Data
            </Typography>
            <Collapse
              in={!!message}
              sx={{
                position: "absolute",
                top: "50px",
                right: "10px",
                zIndex: 10,
              }}
            >
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setMessage("");
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity={fetchingStatus as AlertColor}
                sx={{ mb: 2 }}
              >
                {message}
              </Alert>
            </Collapse>
            <Box sx={{ display: "flex", gap: 1, height: "55px" }}>
              <TextField
                label="Airport IDs (comma-separated)"
                variant="outlined"
                value={inputIds}
                onChange={(e) => setInputIds(e.target.value)}
                sx={{
                  width: { xs: "100%", sm: "590px" },
                  mb: 3,
                  borderRadius: 2,
                  background: "#ffffff",
                }}
              />

              <Button
                variant="contained"
                onClick={handleFetchData}
                disabled={isLoading}
                sx={{
                  textTransform: "none",
                  padding: "10px 20px",
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #3f51b5, #2196f3)",
                  fontWeight: "bold",
                  boxShadow: 3,
                  "&:hover": {
                    background: "linear-gradient(90deg, #2196f3, #3f51b5)",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Fetch Data"
                )}
              </Button>
            </Box>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={3}
            mt={4}
          >
            {airportData.map((data: IAirport, index) => (
              <Box key={index}>
                <AirportCard
                  id={`${data.id}`}
                  weatherInfo={data.weatherInfo}
                  forecast={data.forecast}
                  airportInfo={data.airportInfo}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default App;
