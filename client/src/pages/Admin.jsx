import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import MainContent from "../components/admin/MainContent";
import AccessibilityToggle from "../components/admin/AccessibilityToggle";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <MainContent activeTab={activeTab} />
      <AccessibilityToggle />
    </div>
  );
}