import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Download, 
  LogOut,
  Moon,
  Sun,
  Mail,
  Lock,
  Camera
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const settingSections = [
    {
      title: 'Profile',
      items: [
        {
          icon: User,
          label: 'Personal Information',
          description: 'Update your name, email, and profile picture',
          action: () => console.log('Edit profile')
        },
        {
          icon: Camera,
          label: 'Profile Picture',
          description: 'Change your profile picture',
          action: () => console.log('Change picture')
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: Mail,
          label: 'Email Settings',
          description: 'Manage your email preferences',
          action: () => console.log('Email settings')
        },
        {
          icon: Lock,
          label: 'Change Password',
          description: 'Update your account password',
          action: () => console.log('Change password')
        },
        {
          icon: Shield,
          label: 'Privacy Settings',
          description: 'Control your data and privacy',
          action: () => console.log('Privacy settings')
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: isDark ? Sun : Moon,
          label: 'Theme',
          description: `Switch to ${isDark ? 'light' : 'dark'} mode`,
          action: toggleTheme,
          toggle: true,
          enabled: isDark
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Manage your notification preferences',
          action: () => console.log('Notifications')
        },
        {
          icon: CreditCard,
          label: 'Payment Methods',
          description: 'Manage your linked payment methods',
          action: () => console.log('Payment methods')
        }
      ]
    },
    {
      title: 'Data',
      items: [
        {
          icon: Download,
          label: 'Export Data',
          description: 'Download your financial data',
          action: () => console.log('Export data')
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
            alt={user?.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Member since January 2025
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section) => (
        <div key={section.title} className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={item.action}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Danger Zone */}
      <div className="glass-card rounded-2xl p-6 border border-red-200 dark:border-red-800">
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-4">
          Danger Zone
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
            <div className="flex items-center space-x-3">
              <LogOut className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-400">
                  Sign Out
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">
                  Sign out of your FinBuddy account
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* App Version */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        FinBuddy v1.0.0 - Made with ❤️ for Gen Z
      </div>
    </div>
  );
};

export default Settings;