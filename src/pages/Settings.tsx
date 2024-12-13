import React, { useState } from 'react';
import { User, Lock, Bell, Palette, Shield, Save } from 'lucide-react';

const Settings = () => {
  // State for various settings
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: '',
    profilePicture: '/api/placeholder/200/200'
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    privacyMode: false
  });

  // Profile Settings Section
  const ProfileSettings = () => {
    const handleProfileUpdate = (e) => {
      e.preventDefault();
      console.log('Updating profile:', profile);
      // Future: Implement actual profile update logic
      alert('Profile updated successfully!');
    };

    const handleProfilePictureChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (upload) => {
          setProfile({
            ...profile,
            profilePicture: upload.target.result
          });
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <User className="h-6 w-6 mr-3 text-blue-600" />
          <h2 className="text-xl font-semibold">Profile Settings</h2>
        </div>
        <form onSubmit={handleProfileUpdate}>
          <div className="flex items-center mb-4">
            <div className="relative">
              <img 
                src={profile.profilePicture} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
              <label 
                htmlFor="profilePicture" 
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                <input 
                  type="file" 
                  id="profilePicture"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                placeholder="Tell us a bit about yourself"
              />
            </div>
          </div>
          <div className="mt-4 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Preferences Section
  const PreferencesSettings = () => {
    const handlePreferencesUpdate = (e) => {
      e.preventDefault();
      console.log('Updating preferences:', preferences);
      alert('Preferences updated successfully!');
    };

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Palette className="h-6 w-6 mr-3 text-blue-600" />
          <h2 className="text-xl font-semibold">App Preferences</h2>
        </div>
        <form onSubmit={handlePreferencesUpdate}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="flex space-x-4">
                {['light', 'dark', 'system'].map(theme => (
                  <label key={theme} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value={theme}
                      checked={preferences.theme === theme}
                      onChange={() => setPreferences({...preferences, theme})}
                      className="form-radio"
                    />
                    <span className="ml-2 capitalize">{theme}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
              <div className="space-y-2">
                {Object.keys(preferences.notifications).map(type => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.notifications[type]}
                      onChange={() => setPreferences({
                        ...preferences,
                        notifications: {
                          ...preferences.notifications,
                          [type]: !preferences.notifications[type]
                        }
                      })}
                      className="form-checkbox mr-2"
                    />
                    <span className="capitalize">{type} Notifications</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Security Settings Section
  const SecuritySettings = () => {
    const handleChangePassword = (e) => {
      e.preventDefault();
      const oldPassword = e.target.oldPassword.value;
      const newPassword = e.target.newPassword.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
      }

      console.log('Changing password');
      // Future: Implement actual password change logic
      alert('Password changed successfully!');
      e.target.reset();
    };

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Shield className="h-6 w-6 mr-3 text-blue-600" />
          <h2 className="text-xl font-semibold">Security Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Security Features</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={security.twoFactor}
                    onChange={() => setSecurity({...security, twoFactor: !security.twoFactor})}
                    className="form-checkbox mr-2"
                  />
                  <span>Two-Factor Authentication</span>
                </div>
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={() => {/* Future: Open 2FA setup modal */}}
                >
                  {security.twoFactor ? 'Manage' : 'Set Up'}
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={security.loginAlerts}
                  onChange={() => setSecurity({...security, loginAlerts: !security.loginAlerts})}
                  className="form-checkbox mr-2"
                />
                <span>Login Alerts</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={security.privacyMode}
                  onChange={() => setSecurity({...security, privacyMode: !security.privacyMode})}
                  className="form-checkbox mr-2"
                />
                <span>Privacy Mode</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileSettings />
        <PreferencesSettings />
        <SecuritySettings />
      </div>
    </div>
  );
};

export default Settings;
