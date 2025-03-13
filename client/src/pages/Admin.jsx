import Sidebar from "../components/admin/Sidebar"
import MainContent from "../components/admin/MainContent"
import AccessibilityToggle from "../components/admin/AccessibilityToggle"

export default function Admin() {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <MainContent />
        <AccessibilityToggle />
      </div>
    );
  }