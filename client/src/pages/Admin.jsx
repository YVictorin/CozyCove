import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import MainContent from "../components/admin/MainContent";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("Users");
  
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <MainContent activeTab={activeTab} />
    </div>
  );
}