import React, { useState } from 'react';
import Sidebar from '../components/account/Sidebar';
import DIYSuggestions from '../components/account/DIYSuggestions';
import ProfileSection from '../components/account/ProfileSection';
import SavedBoxes from '../components/account/SavedBoxes';
import Activities from '../components/account/Activities';
import { useBadges } from '../hooks/useBadges'; // Import the badge hook

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showDIYSuggestions, setShowDIYSuggestions] = useState(true);
  const { addBadge } = useBadges(); // Use the badge hook

  // Sample user data
  const user = {
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    role: "Parent",
    location: "Brisbane, Australia",
    email: "emma@example.com",
    phone: "+61 123 456 789",
    joinDate: "January 2023"
  };

  // Sample DIY suggestions data
  const diySuggestions = [
    { id: 1, title: "Calming Glitter Jar", difficulty: "Easy", materials: ["Clear bottle", "Glitter", "Water", "Food coloring"] },
    { id: 2, title: "Texture Busy Board", difficulty: "Medium", materials: ["Wooden board", "Various textured items", "Glue"] },
    { id: 3, title: "Sensory Rice Bin", difficulty: "Easy", materials: ["Rice", "Food coloring", "Container", "Scoops"] },
  ];

  // Sample saved sensory boxes
  const savedBoxes = [
    { 
      id: 1, 
      name: "Ocean Explorer", 
      image: "https://images.unsplash.com/photo-1518399681705-1c3a9a7b0f95?w=500&h=300&fit=crop", 
      description: "Underwater sensory experience" 
    },
    { 
      id: 2, 
      name: "Space Adventure", 
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500&h=300&fit=crop", 
      description: "Galaxy exploration with textures" 
    },
    { 
      id: 3, 
      name: "Jungle Safari", 
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop", 
      description: "Wild animal themed sensory play" 
    },
  ];

  // Sample badges to add for testing
  const sampleBadges = [
    { name: "Morning Star", icon: "🌟", color: "#FBEDCA" },
    { name: "Bedtime Hero", icon: "😴", color: "#D3FFFE" },
    { name: "Routine Master", icon: "📅", color: "#F2E2B8" },
    { name: "Helper", icon: "🙌", color: "#C7FCFB" }
  ];

  const removeFavorite = (id) => {
    alert(`Removed box #${id} from favorites`);
  };

  // Function to add a sample badge
  const handleAddSampleBadge = () => {
    const randomBadge = sampleBadges[Math.floor(Math.random() * sampleBadges.length)];
    addBadge(randomBadge);
    alert(`Added "${randomBadge.name}" badge!`);
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#E3FFFF" }}>
      <Sidebar 
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 p-8"> 
        {activeTab === 'profile' && (
          <>
            <ProfileSection user={user} />
          </>
        )}
        {activeTab === 'saved' && <SavedBoxes boxes={savedBoxes} onRemove={removeFavorite} />}
        {activeTab === 'activities' && <Activities />}      
      </div>
    </div>
  );
};

export default Account;