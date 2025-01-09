import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTab';
import { AuthProvider } from './AuthContext';

export default function ProfilePost() {
  return (
    <>
    
    <AuthProvider>
      <div className="container mx-auto px-4 pt-16 pb-10">
        <ProfileHeader />
        <ProfileTabs />
      </div>
    </AuthProvider>
    
    
    </>
    
  )
}
