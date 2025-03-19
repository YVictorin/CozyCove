
export const getBadgeDetails = (routineName) => {
    switch (routineName) {
      case "Morning Routine":
        return { 
          name: "Morning Champion", 
          icon: "☀️", 
          color: "#FBEDCA",
          description: "Completed all morning routine tasks" 
        };
      case "Afternoon Routine":
        return { 
          name: "Playtime Hero", 
          icon: "🎮", 
          color: "#D3FFFE",
          description: "Completed all afternoon activities" 
        };
      case "Night Routine":
        return { 
          name: "Nighttime Hero", 
          icon: "🌙", 
          color: "#C7FCFB",
          description: "Completed all bedtime routine tasks" 
        };
      case "Routine Master":
        return { 
          name: "Routine Master", 
          icon: "🏆", 
          color: "#F2E2B8",
          description: "Completed all daily routines" 
        };
      default:
        return null;
    }
  };