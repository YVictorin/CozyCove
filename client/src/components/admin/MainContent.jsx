import PageHeader from "./PageHeader";
import StatsGrid from "./StatsGrid";
import FavoritesSection from "./FavoritesSection";
import UsersPageContent from "./users/UsersPageContent";
import SensoryBoxPage from "./sensoryBoxes/SensoryBoxSection";

export default function MainContent({ activeTab }) {
  return (
    <>
      {activeTab === "Dashboard" && (
        <main className="flex-grow p-8 overflow-y-auto" style={{width: "90%"}}>
          <PageHeader />
          <StatsGrid />
          <FavoritesSection />
        </main>
      )}
        {activeTab === "Users" && <UsersPageContent />}
        {activeTab === "Sensory" && <SensoryBoxPage/>}
     
    </>
  );
}