/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  WbSunny as TempIcon,
  Opacity as HumidityIcon,
  Visibility as VisibilityIcon,
  Air as WindIcon,
  LocationOn as LocationIcon,
  FlightTakeoff,
} from "@mui/icons-material";
import PushPinIcon from "@mui/icons-material/PushPin";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface IAirportInfoCardProps {
  id: string;
  airportInfo: any;
  weatherInfo: any;
  forecast: any[];
}

type Coverage = "clr" | "few" | "sct" | "bkn" | "ovc";

type CoverageDesType = {
  [key in Coverage]: string;
};

const AirportInfoCard: React.FC<IAirportInfoCardProps> = ({
  id,
  airportInfo,
  weatherInfo,
  forecast,
}) => {
  const [showRunways, setShowRunways] = useState(false);
  const handleToggle = () => {
    setShowRunways((prev) => !prev);
  };

  const coverageDescriptions: CoverageDesType = {
    clr: "Clear",
    few: "Few Clouds",
    sct: "Scattered Clouds",
    bkn: "Broken Clouds",
    ovc: "Overcast",
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${airportInfo.latitude},${airportInfo.longitude}`;

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString();
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 6,
        background: "linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)",
        color: "#37474f",
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={
          "https://assets.skiesmag.com/wp-content/uploads/2017/11/i-chFB72c-X3.jpg"
        }
        alt="Airport Info"
        sx={{
          filter: "brightness(0.9)",
        }}
      />
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#263238" }}
          gutterBottom
        >
          <LocationIcon
            fontSize="medium"
            sx={{ verticalAlign: "middle", mr: 0.5 }}
          />
          {airportInfo.name || "Unknown Airport"} ({id})
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          <PushPinIcon
            fontSize="small"
            sx={{ verticalAlign: "middle", mr: 0.5 }}
          />
          Lat/Lon:{" "}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {airportInfo.latitude}, {airportInfo.longitude}
          </a>
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            <FlightTakeoff
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Runways Information:
          </Typography>

          <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: showRunways ? 2 : 0,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total Runways:{" "}
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {airportInfo.runways?.length || 0}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  fontWeight="bold"
                  color="primary"
                  sx={{ cursor: "pointer", textAlign: "center" }}
                  onClick={handleToggle}
                >
                  See Details
                </Typography>
                {showRunways ? (
                  <ExpandLess color="primary" />
                ) : (
                  <ExpandMore color="primary" />
                )}
              </Box>
            </Box>

            {showRunways && (
              <Box
                sx={{
                  height: "200px",
                  overflowY: "auto",
                }}
              >
                {airportInfo.runways?.map((runway: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: index % 2 === 0 ? "#e3f2fd" : "#bbdefb",
                      padding: 1.5,
                      borderRadius: 1,
                      marginBottom: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={`Runway ${index + 1}`}
                        color="primary"
                        sx={{ marginRight: 1, fontWeight: "bold" }}
                      />
                      <Typography variant="body2" fontWeight="medium">
                        {runway.name} ({runway.ident})
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        {`Length: ${runway.length} ft, Width: ${runway.width} ft`}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        <Box
          mt={3}
          sx={{
            padding: 2,
            borderRadius: 2,
            background: "linear-gradient(135deg, #b3e5fc 0%, #4fc3f7 100%)",
            color: "#004d40",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Current Weather Info:
          </Typography>
          <Typography fontWeight="bold">
            {weatherInfo.report.conditions.cloudLayers
              .map(
                (layer: { coverage: Coverage }) =>
                  coverageDescriptions[layer.coverage]
              )
              .join(" ")}
          </Typography>
          <Grid container spacing={1} mt={0}>
            <Grid item xs={6}>
              <Typography>
                <TempIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 0.5 }}
                />
                <b>Temp:</b> {weatherInfo.report.conditions.tempC}°C
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <HumidityIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 0.5 }}
                />
                <b>Humidity:</b>{" "}
                {weatherInfo.report.conditions.relativeHumidity}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <VisibilityIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 0.5 }}
                />
                <b>Visibility:</b>{" "}
                {weatherInfo.report.conditions.visibility.distanceSm} miles
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <WindIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 0.5 }}
                />
                <b>Wind:</b>{" "}
                {weatherInfo.report.conditions.wind?.speedKts.toFixed(2)} MPH (
                {weatherInfo.report.conditions.wind?.direction}°)
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box
          mt={3}
          sx={{
            padding: 2,
            borderRadius: 2,
            background: "linear-gradient(135deg, #ffccbc 0%, #ffab91 100%)",
            color: "#bf360c",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Forecast:
          </Typography>
          {forecast.map((f, i) => (
            <Typography key={i} variant="body2" mt={1}>
              <WindIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 0.5 }}
              />
              <b>Period {i + 1}:</b> {formatDate(f.period.dateStart)} <b>to</b>{" "}
              {formatDate(f.period.dateEnd)}, <b>Wind:</b>{" "}
              {f.wind?.speedKts.toFixed(2)} MPH ({f.wind?.direction}°)
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AirportInfoCard;
