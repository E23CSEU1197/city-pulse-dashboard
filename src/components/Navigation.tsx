import { NavLink } from "react-router-dom";
import { Home, Bell, Map, MessageSquare } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/alerts", label: "Alerts", icon: Bell },
    { path: "/map", label: "City Map", icon: Map },
    { path: "/feedback", label: "Feedback", icon: MessageSquare },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CP</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">CityPulse</h1>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-hover"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
