import React, { useState, useEffect } from 'react';
import Sidebar from '../components/account/Sidebar';
import ProfileSection from '../components/account/ProfileSection';
import useAuth from '../hooks/useAuth'; 
import Unauthorized from '../components/Unauthorized';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://cozycove-server.vercel.app/api/account', {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ email: auth.email }),
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (auth?.accessToken) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [auth]);

  // This function clears user info and auth state on logout.
  const handleLogoutFromAccount = () => {
    setUser(null);                      
    if (setAuth) setAuth({});            
  };

  // If auth token is not available, show the Unauthorized component.
  if (auth?.accessToken === undefined) {
    return <Unauthorized />; 
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-4">     
          <DotLottieReact
            src="https://lottie.host/12f17653-9f9f-4391-af96-0f80b2857922/zThr74CE8L.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* On desktop: side-by-side layout */}
      <div className="hidden md:block">
        <Sidebar 
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogoutFromAccount}  
        />
      </div>

      {/* On mobile: stacked layout */}
      <div className="md:hidden px-4 pt-4">
        <Sidebar 
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogoutFromAccount}  
        />
      </div>

      <div className="flex-1 p-4 md:p-8 md:mt-24"> 
        {activeTab === 'profile' && (
          <ProfileSection user={user} />
        )}
      </div>
    </div>
  );
};

export default Account;