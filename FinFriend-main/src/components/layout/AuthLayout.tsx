import React, { ReactNode } from 'react';
import { Wallet } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text">FinBuddy</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your smart finance companion
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;