import { Action } from 'contexts';
import { SignUpPayload, User } from 'types';
import axios from 'axios';

const apiUrl = 'http://192.168.0.103:8080';

type UserResponse = { data: User };

export const signUp = async (
  dispatch: React.Dispatch<Action>,
  payload: SignUpPayload
) => {
  if (!Object.values(payload).every(field => field?.trim())) return;
  try {
    const { data: user }: UserResponse = await axios.post(
      `${apiUrl}/signup`,
      payload
    );
    dispatch({
      type: 'signUp',
      payload: { username: user.username, token: user.token },
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
