import React, { createContext, useCallback, useContext, useState } from 'react';

interface SignMenuContextData {
  activatedMenu: string;
  handleChangeActivatedMenu(activatedMenu: string): void;
}

const SignMenuContext = createContext<SignMenuContextData>(
  {} as SignMenuContextData,
);

const SignMenuProvider: React.FC = ({ children }) => {
  const [activatedMenu, handleActivatedMenu] = useState<string>('dashboard');

  const handleChangeActivatedMenu = useCallback(
    (changeActivatedMenu: string) => {
      handleActivatedMenu(changeActivatedMenu);
    },
    [],
  );

  return (
    <SignMenuContext.Provider
      value={{ activatedMenu, handleChangeActivatedMenu }}
    >
      {children}
    </SignMenuContext.Provider>
  );
};

function useSignMenu(): SignMenuContextData {
  const context = useContext(SignMenuContext);

  if (!context) {
    throw new Error('useSignMenu must be used within an SignMenuProvider');
  }

  return context;
}

export { useSignMenu, SignMenuProvider };
