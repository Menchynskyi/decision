import { useEffect, useCallback } from 'react';
import { signIn as signInApi, signUp as signUpApi } from 'api';
import AsyncStorage from '@react-native-community/async-storage';
import { User, SignInPayload, SignUpPayload } from 'types';
import { useAuthDispatch, useAuthState } from './useAuthContext';

const storageUser = 'user';

export const useInitialAuth = () => {
  const dispatch = useAuthDispatch();
  const { isLoggedIn } = useAuthState();

  const getUserInfo = useCallback(async () => {
    try {
      const storageInfo = await AsyncStorage.getItem(storageUser);
      if (!storageInfo) return;

      const userInfo: User = JSON.parse(storageInfo);
      if (userInfo && userInfo.token) {
        dispatch({ type: 'signIn', payload: userInfo });
      }
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return isLoggedIn;
};

export const useAuth = () => {
  const dispatch = useAuthDispatch();

  const setUserInfo = useCallback(async userInfo => {
    try {
      await AsyncStorage.setItem(storageUser, JSON.stringify(userInfo));
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  const removeUserInfo = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(storageUser);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  const signIn = async (val: SignInPayload) => {
    try {
      const userInfo = await signInApi(dispatch, val);
      if (userInfo) {
        setUserInfo(userInfo);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const signUp = async (val: SignUpPayload) => {
    try {
      const userInfo = await signUpApi(dispatch, val);
      if (userInfo) {
        setUserInfo(userInfo);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const signOut = () => {
    removeUserInfo();
    dispatch({ type: 'signOut' });
  };

  return {
    signIn,
    signUp,
    signOut,
  };
};
