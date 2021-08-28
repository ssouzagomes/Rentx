import React from 'react';
import Routes from './routes';
import Global from './styles/global';

import { AuthProvider } from './hooks/auth';
import { SignMenuProvider } from './hooks/toggle';

export const App: React.FC = () => {
  return (
    <div>
      <AuthProvider>
        <SignMenuProvider>
          <Routes />
        </SignMenuProvider>
      </AuthProvider>
      <Global />
    </div>
  );
};
