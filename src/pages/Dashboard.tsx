import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Cloud, Droplets, Wind, Activity, Car, Clock } from "lucide-react";

interface CityData {
  temperature: number;
  aqi: number;
  humidity: number;
  windSpeed: number;
  trafficDensity: number;
  activeAlerts: number;
}

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cityData] = useState<CityData>({
    temperature: 24,
    aqi: 68,
    humidity: 65,
    windSpeed: 12,
    trafficDensity: 72,
    activeAlerts: 3,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-success";
    if (aqi <= 100) return "bg-warning";
    return "bg-destructive";
  };

  const getTrafficColor = (density: number) => {
    if (density <= 40) return "bg-success";
    if (density <= 70) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            City Dashboard
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <p className="text-lg">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" • "}
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Temperature Card */}
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in hover:scale-105">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-primary rounded-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Temperature
            </h3>
            <p className="text-4xl font-bold text-foreground mb-2">
              {cityData.temperature}°C
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Droplets className="w-4 h-4" />
              <span>Humidity: {cityData.humidity}%</span>
            </div>
          </Card>

          {/* AQI Card */}
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in hover:scale-105" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-secondary rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Air Quality Index
            </h3>
            <p className="text-4xl font-bold text-foreground mb-3">
              {cityData.aqi}
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getAQIColor(
                  cityData.aqi
                )}`}
                style={{ width: `${Math.min(cityData.aqi, 100)}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {cityData.aqi <= 50 ? "Good" : cityData.aqi <= 100 ? "Moderate" : "Unhealthy"}
            </p>
          </Card>

          {/* Wind Speed Card */}
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in hover:scale-105" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-info rounded-lg">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Wind Speed
            </h3>
            <p className="text-4xl font-bold text-foreground mb-2">
              {cityData.windSpeed}
            </p>
            <p className="text-sm text-muted-foreground">km/h</p>
          </Card>
        </div>

        {/* Traffic Section */}
        <Card className="p-8 shadow-card mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Traffic Density
              </h2>
              <p className="text-muted-foreground">Real-time traffic monitoring</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-foreground">
                Current Density
              </span>
              <span className="text-2xl font-bold text-foreground">
                {cityData.trafficDensity}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${getTrafficColor(
                  cityData.trafficDensity
                )}`}
                style={{ width: `${cityData.trafficDensity}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Low (0-40%)</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-warning rounded-full mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Medium (41-70%)</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-destructive rounded-full mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">High (71-100%)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Active Alerts
            </h3>
            <p className="text-3xl font-bold text-warning">{cityData.activeAlerts}</p>
          </Card>
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Public Facilities
            </h3>
            <p className="text-3xl font-bold text-success">127</p>
          </Card>
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Service Requests
            </h3>
            <p className="text-3xl font-bold text-info">42</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
