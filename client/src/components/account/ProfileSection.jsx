import React from 'react';
import RecentBadges from './RecentBadges';

const ProfileSection = ({ user }) => {
  return (
    <div>
      <h1 
        className="text-3xl font-bold mb-6"
        style={{ color: "#26A5B3" }}
      >
        My Profile
      </h1>
      <div 
        className="rounded-2xl shadow-md p-6 mb-6"
        style={{ backgroundColor: "white" }}
      >
        <h2 
          className="text-xl font-bold mb-4"
          style={{ color: "#24B2C2" }}
        >
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Name', value: user?.name, type: 'text' },
            { label: 'Email Address', value: user?.email, type: 'email' },
          ].map((field, index) => (
            <div key={index}>
              <label 
                className="block mb-1"
                style={{ color: "#666666" }}
              >
                {field.label}
              </label>
              <input 
                type={field.type}
                value={field.value}
                readOnly
                className="w-full px-4 py-2 border rounded-lg"
                style={{ backgroundColor: "#E3FFFF", borderColor: "#66D6D0" }}
              />
            </div>
          ))}
        </div>
        <div className="mt-6"></div>
      </div>
      
      {/* Add Recent Badges section */}
      <RecentBadges />
    </div>
  );
};

export default ProfileSection;