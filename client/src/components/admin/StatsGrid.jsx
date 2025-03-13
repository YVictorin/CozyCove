import StatCard from "./StatCard"

export default function StatsGrid() {
    const stats = [
      {
        title: "Total Visitors",
        value: "5,248",
        change: "12% this week",
        positive: true,
        icon: "fa-user",
        color: "blue"
      },
      {
        title: "Content Interactions",
        value: "12,673",
        change: "8% this week",
        positive: true,
        icon: "fa-hand-pointer",
        color: "green"
      },
      {
        title: "Average Session",
        value: "14:32",
        change: "3% this week",
        positive: true,
        icon: "fa-clock",
        color: "yellow"
      },
      {
        title: "Most Favorites",
        value: "24",
        change: "3 new this week",
        positive: true,
        icon: "fa-star",
        color: "purple"
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    );
  }