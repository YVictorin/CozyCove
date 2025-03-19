import React, { useState, useEffect } from 'react';
import Sidebar from '../components/account/Sidebar';
import DIYSuggestions from '../components/account/DIYSuggestions';
import ProfileSection from '../components/account/ProfileSection';
import SavedBoxes from '../components/account/SavedBoxes';
import Activities from '../components/account/Activities';
import { useBadges } from '../hooks/useBadges'; // Import the badge hook
import  useAuth  from '../hooks/useAuth'; // Import the auth hook

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showDIYSuggestions, setShowDIYSuggestions] = useState(true);
  const { addBadge } = useBadges();
  const [user, setUser] = useState(null);

  const { auth } = useAuth();
  

  // Fetch user information from the database (via an API endpoint)
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/account`, {
          method: 'POST',  // Using POST as per your server implementation
          headers: { 
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ email: auth.email }),
          credentials: 'include'  // Include cookies

        });
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Token has expired, You must login once again</div>;
  }

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
    <div className="flex min-h-screen pt-32  bg-gray-50">
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
        {/* {activeTab === 'saved' && <SavedBoxes boxes={savedBoxes} onRemove={removeFavorite} />}
        {activeTab === 'activities' && <Activities />}       */}
      </div>
    </div>
  );
};

export default Account;
