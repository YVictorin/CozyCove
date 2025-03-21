import React, { useState, useEffect } from 'react';
import Sidebar from '../components/account/Sidebar';
import ProfileSection from '../components/account/ProfileSection';
import useAuth from '../hooks/useAuth'; 
import Unauthorized from '../components/Unauthorized';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);

  // Destructure both auth and setAuth if available.
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://cozycove-server.vercel.app/api/account', {
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
  }, [auth]);

  // This function clears user info and auth state on logout.
  const handleLogoutFromAccount = () => {
    setUser(null);                      
    if (setAuth) setAuth({});            
  };

  // If auth token is not available, show the Unauthorized component.
 if (auth?.accessToken === undefined) {
  return ( 
    <Unauthorized/> 
  );
}


  return (
    <div className="flex min-h-screen pt-32 bg-gray-50">
      <Sidebar 
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogoutFromAccount}  
      />

      <div className="flex-1 p-8"> 
        {activeTab === 'profile' && (
          <ProfileSection user={user} />
        )}
      </div>
    </div>
  );
};

export default Account;
