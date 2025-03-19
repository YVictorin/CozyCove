import React from 'react';

const Activities = () => {
  const activities = [
    {
      title: 'Morning Routine Coloring',
      description: 'Printable coloring sheets with morning activities',
      type: 'Coloring Pages',
      style: { bg: '#FBEDCA', color: '#FD975F' }
    },
    {
      title: 'Bedtime Sequence Game',
      description: 'Put bedtime routine steps in the right order',
      type: 'Interactive Game',
      style: { bg: '#D3FFFE', color: '#24B2C2' }
    },
    {
      title: 'Daily Routine Flashcards',
      description: 'Visual aids for establishing consistent routines',
      type: 'Printable Cards',
      style: { bg: '#F2E2B8', color: '#C83C75' }
    },
    {
      title: 'Reward Chart System',
      description: 'Customize charts for tracking routine progress',
      type: 'Coming Soon',
      style: { bg: '#C7FCFB', color: '#33A5CE' }
    }
  ];

  return (
    <div>
      <h1 
        className="text-3xl font-bold mb-6"
        style={{ color: "#26A5B3" }}
      >
        Routine-Based Games
      </h1>
      <div 
        className="rounded-2xl shadow-md p-6 mb-6"
        style={{ backgroundColor: "white" }}
      >
        <h2 
          className="text-xl font-bold mb-4"
          style={{ color: "#24B2C2" }}
        >
          Interactive Activities
        </h2>
        <p 
          className="mb-6"
          style={{ color: "#666666" }}
        >
          Fun games and activities to help establish daily routines.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="border rounded-xl p-4"
              style={{ borderColor: "#C7FCFB" }}
            >
              <div 
                className="rounded-lg h-32 mb-3 flex items-center justify-center"
                style={{ backgroundColor: activity.style.bg }}
              >
                <span style={{ color: activity.style.color, fontSize: "1.125rem" }}>
                  {activity.type}
                </span>
              </div>
              <h3 
                className="font-semibold mb-1"
                style={{ color: "#4A8278" }}
              >
                {activity.title}
              </h3>
              <p 
                className="text-sm"
                style={{ color: "#666666" }}
              >
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;