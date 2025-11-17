import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info, Clock } from "lucide-react";

interface Alert {
  id: number;
  title: string;
  description: string;
  category: "Traffic" | "Health" | "Weather" | "Public Notice";
  priority: "high" | "medium" | "low";
  timestamp: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    title: "Heavy Traffic on Main Street",
    description: "Major congestion reported due to road construction. Consider alternate routes.",
    category: "Traffic",
    priority: "high",
    timestamp: "10 minutes ago",
  },
  {
    id: 2,
    title: "Air Quality Alert",
    description: "AQI levels are moderate. Sensitive groups should limit outdoor activities.",
    category: "Health",
    priority: "medium",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    title: "Thunderstorm Warning",
    description: "Severe thunderstorms expected this evening. Stay indoors if possible.",
    category: "Weather",
    priority: "high",
    timestamp: "2 hours ago",
  },
  {
    id: 4,
    title: "Community Meeting Scheduled",
    description: "Town hall meeting on urban development plans scheduled for next week.",
    category: "Public Notice",
    priority: "low",
    timestamp: "3 hours ago",
  },
  {
    id: 5,
    title: "Water Supply Maintenance",
    description: "Scheduled water supply interruption in Zone 3 from 9 AM to 2 PM tomorrow.",
    category: "Public Notice",
    priority: "medium",
    timestamp: "5 hours ago",
  },
  {
    id: 6,
    title: "Vaccination Drive",
    description: "Free vaccination camp at City Health Center this weekend.",
    category: "Health",
    priority: "medium",
    timestamp: "1 day ago",
  },
];

const Alerts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Traffic", "Health", "Weather", "Public Notice"];

  const filteredAlerts =
    selectedCategory === "All"
      ? mockAlerts
      : mockAlerts.filter((alert) => alert.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />;
      case "medium":
        return <Info className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            City Alerts & News
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay informed about important city updates and notifications
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-hover scale-105"
                    : "bg-card text-card-foreground shadow-card hover:shadow-hover hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => (
            <Card
              key={alert.id}
              className="p-6 shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in hover:scale-[1.02]"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`p-3 rounded-lg ${getPriorityColor(
                      alert.priority
                    )}`}
                  >
                    {getPriorityIcon(alert.priority)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {alert.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        {alert.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getPriorityColor(alert.priority)}>
                  {alert.priority}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <Card className="p-12 text-center shadow-card animate-fade-in">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-success" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No alerts in this category
            </h3>
            <p className="text-muted-foreground">
              Check back later for updates
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Alerts;
