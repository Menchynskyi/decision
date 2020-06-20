import React from 'react';
import { AuthProvider } from 'contexts';
import AuthApp from 'App';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthApp />
    </AuthProvider>
  );
};

export default App;
