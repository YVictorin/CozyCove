import React, { useEffect } from 'react';
import { Button } from "react-bootstrap";
import { useBadges } from "../../../hooks/useBadges";
import { getBadgeDetails } from "../utils/badgeUtils";

export default function BadgeScreen({ routine, onReturnToMenu }) {
  const { addBadge, areAllRoutinesCompleted } = useBadges();
  const badgeInfo = getBadgeDetails(routine);
  
  useEffect(() => {
    // Add the routine badge
    if (badgeInfo) {
      const wasAdded = addBadge(badgeInfo);
      
      // Check if all routines are completed to award master badge
      if (wasAdded && areAllRoutinesCompleted()) {
        const masterBadge = getBadgeDetails("Routine Master");
        if (masterBadge) {
          addBadge(masterBadge);
        }
      }
    }
  }, [routine, addBadge, areAllRoutinesCompleted, badgeInfo]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-yellow-500 mb-6">You earned a badge!</h2>

      <div className="w-32 h-32 rounded-full bg-yellow-100 border-4 border-yellow-500 flex items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center">
          <img
            src={`/src/assets/images/${badgeInfo?.image || routine.toLowerCase()}.svg`}
            alt="Badge"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-yellow-600 mb-2">{badgeInfo?.name}</h3>

      <p className="text-gray-400 mb-8 text-center max-w-md">
        You've completed all the tasks in the {routine.toLowerCase()}! Keep up the good work!
      </p>

      <div className="bg-blue-200 p-2 rounded-md cursor-pointer">
        <Button onClick={onReturnToMenu} style={{ cursor: "pointer" }}>Return to Menu</Button>
      </div>
    </div>
  );
}