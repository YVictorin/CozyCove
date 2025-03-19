import React from 'react';
import { useBadges } from '../../hooks/useBadges';

const ChildRecentBadges = () => {
  const { badges } = useBadges();
  
  // Get only the most recent badges (up to 4)
  const recentBadges = badges
    .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
    .slice(0, 4);
  
  if (recentBadges.length === 0) {
    return (
      <div 
        className="rounded-2xl shadow-md p-6 mb-6"
        style={{ backgroundColor: "white" }}
      >
        <h2 
          className="text-xl font-bold mb-4"
          style={{ color: "#24B2C2" }}
        >
          Recent Badges
        </h2>
        <p 
          className="mb-4 text-center"
          style={{ color: "#666666" }}
        >
          Your child hasn't earned any badges yet. Encourage them to complete their daily routines!
        </p>
      </div>
    );
  }
  
  return (
    <div 
      className="rounded-2xl shadow-md p-6 mb-6"
      style={{ backgroundColor: "white" }}
    >
      <h2 
        className="text-xl font-bold mb-4"
        style={{ color: "#24B2C2" }}
      >
        Recent Badges
      </h2>
      <p 
        className="mb-4"
        style={{ color: "#666666" }}
      >
        Achievements earned by your child
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recentBadges.map((badge) => (
          <div 
            key={badge.id}
            className="flex flex-col items-center"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: badge.color || "#FBEDCA" }}
            >
              <span className="text-2xl">{badge.icon || "🏆"}</span>
            </div>
            <p 
              className="text-center font-medium"
              style={{ color: "#4A8278" }}
            >
              {badge.name}
            </p>
            <p 
              className="text-xs text-center"
              style={{ color: "#666666" }}
            >
              {new Date(badge.earnedAt).toLocaleDateString()} {/* varies acccording to timezone */}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button 
          className="text-sm font-medium py-2 px-4 rounded-lg"
          style={{ color: "#24B2C2" }}
        >
          View All Badges
        </button>
      </div>
    </div>
  );
};

export default ChildRecentBadges;