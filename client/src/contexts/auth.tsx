import React, { createContext, useReducer } from 'react';
import { User } from 'types';

export type State = {
  isLoggedIn: boolean;
  user: User | null;
  signUpError: {
    isError: boolean;
    errorMessage: string;
  };
  signInError: {
    isError: boolean;
    errorMessage: string;
  };
  isLoading: boolean;
};

export type Action =
  | {
      type: 'signIn';
      payload: User;
    }
  | { type: 'signUp'; payload: User }
  | { type: 'signOut' }
  | { type: 'signInError'; payload: string }
  | { type: 'signUpError'; payload: string }
  | { type: 'loading' };

export type AuthContextState = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

type AuthProviderProps = { children: React.ReactNode };

export const initialState: State = {
  isLoggedIn: false,
  user: null,
  signInError: {
    isError: false,
    errorMessage: '',
  },
  signUpError: {
    isError: false,
    errorMessage: '',
  },
  isLoading: false,
};

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'signIn': {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        signInError: initialState.signInError,
        isLoading: false,
      };
    }
    case 'signUp': {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        signUpError: initialState.signUpError,
        isLoading: false,
      };
    }
    case 'signOut': {
      return {
        ...initialState,
      };
    }
    case 'signInError': {
      return {
        ...state,
        signInError: {
          isError: true,
          errorMessage: action.payload,
        },
        isLoading: false,
      };
    }
    case 'signUpError': {
      return {
        ...state,
        signUpError: {
          isError: true,
          errorMessage: action.payload,
        },
        isLoading: false,
      };
    }
    case 'loading': {
      return {
        ...state,
        isLoading: true,
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
