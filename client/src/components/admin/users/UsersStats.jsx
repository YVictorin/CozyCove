import StatCard from "../StatCard";

export default function UsersStats() {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      change: "15% this month",
      positive: true,
      icon: "fa-users",
      color: "blue"
    },
    {
      title: "Parent Accounts",
      value: "856",
      change: "12% this month",
      positive: true,
      icon: "fa-user-tie",
      color: "green"
    },
    {
      title: "Child Accounts",
      value: "392",
      change: "7% this month",
      positive: true,
      icon: "fa-child",
      color: "yellow"
    },
    {
      title: "Sensory Boxes",
      value: "78",
      change: "5 new this week",
      positive: true,
      icon: "fa-box",
      color: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
     {null}
    </div>
  );
}