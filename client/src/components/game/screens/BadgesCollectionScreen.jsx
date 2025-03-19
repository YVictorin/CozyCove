import React from "react";
import { Button } from "react-bootstrap";
import { useBadges } from "../../../hooks/useBadges";
import { getBadgeDetails } from "../utils/badgeUtils";

export default function BadgesCollectionScreen({ onBackClick }) {
  const { badges } = useBadges();
  
  // Define all possible badges
  const allBadges = [
    getBadgeDetails("Morning Routine"),
    getBadgeDetails("Afternoon Routine"),
    getBadgeDetails("Night Routine"),
    getBadgeDetails("Routine Master")
  ];
  
  // Map the badges with earned status
  const badgesWithStatus = allBadges.map(badgeTemplate => {
    const earned = badges.some(badge => badge.name === badgeTemplate.name);
    return {
      ...badgeTemplate,
      earned,
      image: badgeTemplate.name.toLowerCase().replace(' ', '_')
    };
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full mb-6">
        <div className="bg-red-500 pl-5 pr-5 pt-3 pb-3 rounded-md cursor-pointer">
          <Button variant="destructive" onClick={onBackClick} style={{ cursor: "pointer", color: "white" }}>
            Back
          </Button>
        </div>
        <h2 className="text-2xl font-bold text-yellow-600">Your Badges</h2>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {badgesWithStatus.map((badge, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${badge.earned ? "bg-yellow-100" : "bg-gray-100"} flex flex-col items-center`}
          >
            <div
              className={`w-16 h-16 rounded-full ${badge.earned ? "bg-yellow-400" : "bg-gray-300"} flex items-center justify-center mb-2`}
              style={{ backgroundColor: badge.earned ? badge.color : "#cccccc" }}
            >
              {badge.earned ? (
                <span className="text-2xl">{badge.icon}</span>
              ) : (
                <span className="text-2xl opacity-50">🔒</span>
              )}
            </div>
            <h3 className={`text-sm font-bold ${badge.earned ? "text-yellow-700" : "text-gray-500"} text-center`}>
              {badge.name}
            </h3>
            {!badge.earned && <p className="text-xs text-gray-500 mt-1">Locked</p>}
            {badge.earned && (
              <p className="text-xs text-gray-600 mt-1 text-center">
                {badge.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}