import { useState } from "react";
import { Card } from "@/components/ui/card";
import { X, MapPin, Phone, Clock as ClockIcon } from "lucide-react";

interface Zone {
  id: number;
  name: string;
  type: string;
  description: string;
  contact: string;
  hours: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const zones: Zone[] = [
  {
    id: 1,
    name: "Central Park",
    type: "Parks & Recreation",
    description: "A beautiful urban park with walking trails, playgrounds, and picnic areas.",
    contact: "+1 (555) 123-4567",
    hours: "6:00 AM - 10:00 PM",
    x: 10,
    y: 10,
    width: 25,
    height: 25,
  },
  {
    id: 2,
    name: "City General Hospital",
    type: "Healthcare",
    description: "24/7 emergency services, specialized care units, and outpatient facilities.",
    contact: "+1 (555) 234-5678",
    hours: "24/7",
    x: 40,
    y: 10,
    width: 25,
    height: 25,
  },
  {
    id: 3,
    name: "Riverside Mall",
    type: "Shopping",
    description: "Premier shopping destination with 200+ stores, restaurants, and entertainment.",
    contact: "+1 (555) 345-6789",
    hours: "10:00 AM - 9:00 PM",
    x: 70,
    y: 10,
    width: 25,
    height: 25,
  },
  {
    id: 4,
    name: "Lincoln Elementary School",
    type: "Education",
    description: "K-5 public elementary school with modern facilities and experienced staff.",
    contact: "+1 (555) 456-7890",
    hours: "8:00 AM - 3:00 PM (Weekdays)",
    x: 10,
    y: 40,
    width: 25,
    height: 25,
  },
  {
    id: 5,
    name: "Community Library",
    type: "Public Services",
    description: "Public library with vast collection, digital resources, and community programs.",
    contact: "+1 (555) 567-8901",
    hours: "9:00 AM - 8:00 PM",
    x: 40,
    y: 40,
    width: 25,
    height: 25,
  },
  {
    id: 6,
    name: "Sports Complex",
    type: "Sports & Fitness",
    description: "Multi-sport facility with indoor courts, swimming pool, and fitness center.",
    contact: "+1 (555) 678-9012",
    hours: "6:00 AM - 11:00 PM",
    x: 70,
    y: 40,
    width: 25,
    height: 25,
  },
  {
    id: 7,
    name: "Fire Station #3",
    type: "Emergency Services",
    description: "24/7 fire and rescue services serving the downtown and east districts.",
    contact: "911 / +1 (555) 789-0123",
    hours: "24/7",
    x: 10,
    y: 70,
    width: 25,
    height: 25,
  },
  {
    id: 8,
    name: "Transit Hub",
    type: "Transportation",
    description: "Central bus and metro station with connections to all city zones.",
    contact: "+1 (555) 890-1234",
    hours: "5:00 AM - 12:00 AM",
    x: 40,
    y: 70,
    width: 25,
    height: 25,
  },
  {
    id: 9,
    name: "City Hall",
    type: "Government",
    description: "Municipal administration, permits, licenses, and public records.",
    contact: "+1 (555) 901-2345",
    hours: "8:00 AM - 5:00 PM (Weekdays)",
    x: 70,
    y: 70,
    width: 25,
    height: 25,
  },
];

const CityMap = () => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const getZoneColor = (type: string) => {
    switch (type) {
      case "Parks & Recreation":
        return "fill-success/70 hover:fill-success";
      case "Healthcare":
        return "fill-destructive/70 hover:fill-destructive";
      case "Shopping":
        return "fill-warning/70 hover:fill-warning";
      case "Education":
        return "fill-info/70 hover:fill-info";
      case "Public Services":
        return "fill-primary/70 hover:fill-primary";
      case "Sports & Fitness":
        return "fill-secondary/70 hover:fill-secondary";
      case "Emergency Services":
        return "fill-destructive/70 hover:fill-destructive";
      case "Transportation":
        return "fill-accent/70 hover:fill-accent";
      case "Government":
        return "fill-primary/70 hover:fill-primary";
      default:
        return "fill-muted/70 hover:fill-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Interactive City Map
          </h1>
          <p className="text-lg text-muted-foreground">
            Click on any zone to view detailed information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Card className="p-6 shadow-card">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-auto"
                style={{ minHeight: "500px" }}
              >
                {/* Grid background */}
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {/* Zones */}
                {zones.map((zone) => (
                  <g key={zone.id}>
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      className={`${getZoneColor(
                        zone.type
                      )} transition-all duration-300 cursor-pointer stroke-card-foreground/20`}
                      strokeWidth="0.5"
                      onClick={() => setSelectedZone(zone)}
                      rx="1"
                    />
                    <text
                      x={zone.x + zone.width / 2}
                      y={zone.y + zone.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-white text-[3px] font-semibold pointer-events-none"
                      style={{ textShadow: "0 0 2px rgba(0,0,0,0.5)" }}
                    >
                      {zone.name}
                    </text>
                  </g>
                ))}
              </svg>
            </Card>
          </div>

          {/* Legend & Info */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Zone Types
              </h3>
              <div className="space-y-3">
                {Array.from(new Set(zones.map((z) => z.type))).map((type) => (
                  <div key={type} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded ${getZoneColor(type).replace(
                        "fill-",
                        "bg-"
                      ).replace("/70", "")}`}
                    />
                    <span className="text-sm text-muted-foreground">{type}</span>
                  </div>
                ))}
              </div>
            </Card>

            {selectedZone && (
              <Card className="p-6 shadow-card animate-scale-in">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedZone.name}
                  </h3>
                  <button
                    onClick={() => setSelectedZone(null)}
                    className="p-1 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm text-muted-foreground">
                        Category
                      </span>
                    </div>
                    <p className="text-foreground">{selectedZone.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-3">
                      {selectedZone.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm text-muted-foreground">
                        Contact
                      </span>
                    </div>
                    <p className="text-foreground">{selectedZone.contact}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm text-muted-foreground">
                        Hours
                      </span>
                    </div>
                    <p className="text-foreground">{selectedZone.hours}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;
