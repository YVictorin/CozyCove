import React from 'react';

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
            { label: 'Full Name', value: user.name, type: 'text' },
            { label: 'Email Address', value: user.email, type: 'email' },
            { label: 'Phone Number', value: user.phone, type: 'tel' },
            { label: 'Location', value: user.location, type: 'text' }
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
        <div className="mt-6">
          <button 
            className="font-bold py-2 px-6 rounded-xl text-white"
            style={{ backgroundColor: "#24B2C2" }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      
      <div 
        className="rounded-2xl shadow-md p-6"
        style={{ backgroundColor: "white" }}
      >
        <h2 
          className="text-xl font-bold mb-4"
          style={{ color: "#24B2C2" }}
        >
          Account Settings
        </h2>
        <div className="space-y-4">
          {[
            { title: 'Password', description: 'Last changed 3 months ago', action: 'Change' },
            { title: 'Notifications', description: 'Manage email and app notifications', action: 'Configure' },
            { title: 'Privacy Settings', description: 'Manage your data and privacy preferences', action: 'Review' }
          ].map((setting, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
              style={{ borderColor: "#C7FCFB" }}
            >
              <div>
                <h3 className="font-semibold" style={{ color: "#4A8278" }}>{setting.title}</h3>
                <p className="text-sm" style={{ color: "#999999" }}>{setting.description}</p>
              </div>
              <button style={{ color: "#33A5CE" }}>{setting.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;