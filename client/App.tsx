import React from 'react';
import { AuthProvider } from 'contexts';
import App from './src/App';

const DecisionApp: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default DecisionApp;
