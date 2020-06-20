import { useContext } from 'react';
import { AuthContext, AuthContextState, State, Action } from 'contexts';

export const useAuthContext = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

export const useAuthState = (): State => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context.state;
};

export const useAuthDispatch = (): React.Dispatch<Action> => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context.dispatch;
};
