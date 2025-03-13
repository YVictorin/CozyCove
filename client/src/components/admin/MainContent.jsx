import PageHeader from "./PageHeader"
import StatsGrid from "./StatsGrid"
import FavoritesSection from "./FavoritesSection"

export default function MainContent() {
    return (
      <main className="flex-grow p-8 overflow-y-auto">
        <PageHeader />
        <StatsGrid />
        <FavoritesSection />
      </main>
    );
  }