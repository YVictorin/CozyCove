import useLocalStorage from './useLocalStorage';

export const useBadges = () => {
  // Using the custom useLocalStorage hook instead of useState + useEffect
  const [badges, setBadges] = useLocalStorage('userBadges', []);
  
  // Function to add a new badge
  const addBadge = (newBadge) => {
    // Check if badge already exists to prevent duplicates
    const badgeExists = badges.some(badge => badge.name === newBadge.name);
    
    if (!badgeExists) {
      const updatedBadges = [...badges, { 
        ...newBadge, 
        id: Date.now(), 
        earnedAt: new Date().toISOString() 
      }];
      
      setBadges(updatedBadges);
      return true; // Badge was added
    }
    
    return false; // Badge already existed
  };
  
  // Function to remove a badge
  const removeBadge = (badgeId) => {
    const updatedBadges = badges.filter(badge => badge.id !== badgeId);
    setBadges(updatedBadges);
  };
  
  // Function to check if a specific routine is completed
  const isRoutineCompleted = (routineName) => {
    const routineBadgeMap = {
      "Morning Routine": "Morning Champion",
      "Afternoon Routine": "Playtime Hero",
      "Night Routine": "Nighttime Hero"
    };
    
    const badgeName = routineBadgeMap[routineName];
    return badges.some(badge => badge.name === badgeName);
  };
  
  // Function to check if all routines are completed
  const areAllRoutinesCompleted = () => {
    const requiredBadges = ["Morning Champion", "Playtime Hero", "Nighttime Hero"];
    return requiredBadges.every(badgeName => 
      badges.some(badge => badge.name === badgeName)
    );
  };
  
  return { 
    badges, 
    addBadge, 
    removeBadge,
    isRoutineCompleted,
    areAllRoutinesCompleted
  };
};