import { Action } from 'contexts';
import { SignUpPayload, User, SignInPayload } from 'types';
import axios from 'axios';
import Constants from 'expo-constants';

const { apiUrl } = Constants.manifest.extra;

type UserResponse = { data: User };

export const signUp = async (
  dispatch: React.Dispatch<Action>,
  payload: SignUpPayload
) => {
  if (!Object.values(payload).every(field => field?.trim())) return;
  dispatch({ type: 'loading' });
  try {
    const { data: user }: UserResponse = await axios.post(
      `${apiUrl}/signup`,
      payload
    );
    dispatch({
      type: 'signUp',
      payload: { username: user.username, token: user.token },
    });
    return user;
  } catch (e) {
    if (e.response) {
      dispatch({ type: 'signUpError', payload: e.response.data.message });
    }
    throw new Error(e);
  }
};

export const signIn = async (
  dispatch: React.Dispatch<Action>,
  payload: SignInPayload
) => {
  if (!Object.values(payload).every(field => field?.trim())) return;
  dispatch({ type: 'loading' });
  try {
    const { data: user }: UserResponse = await axios.post(`${apiUrl}/signIn`, {
      ...payload,
      email: payload.username,
    });
    dispatch({
      type: 'signIn',
      payload: { username: user.username, token: user.token },
    });
    return user;
  } catch (e) {
    if (e.response) {
      dispatch({ type: 'signInError', payload: e.response.data.message });
    }
    throw new Error(e);
  }
};
