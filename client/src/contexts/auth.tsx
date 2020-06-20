import React, { createContext, useReducer } from 'react';
import { User, SignInPayload, SignUpPayload } from 'types';

export type State = {
  isLoggedIn: boolean;
  user: User | null;
};

export type Action =
  | {
      type: 'signIn';
      payload: User;
    }
  | { type: 'signUp'; payload: User };

export type AuthContextState = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

type AuthProviderProps = { children: React.ReactNode };

export const initialState: State = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'signIn': {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    }
    case 'signUp': {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const AuthContext = createContext<AuthContextState | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
