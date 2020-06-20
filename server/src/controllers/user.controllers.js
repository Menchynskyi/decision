import { newToken } from '../utils/auth';
import { User } from '../models/user.model';

export const signup = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({ message: 'Email is required' });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: 'Password is required' });
  }
  if (!req.body.username) {
    return res.status(400).send({ message: 'Username is required' });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token, username: user.username });
  } catch (e) {
    return res.status(500).end();
  }
};

export const signin = async (req, res) => {
  if ((!req.body.email && !req.body.username) || !req.body.password) {
    return res
      .status(400)
      .send({ message: 'Email or username and password are required' });
  }

  const invalid = { message: 'Invalid email and password combination' };

  try {
    const userByEmail = await User.findOne({ email: req.body.email })
      .select('email password username')
      .exec();
    const userByUsername = await User.findOne({ username: req.body.username })
      .select('email password username')
      .exec();

    const user = userByEmail || userByUsername;

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(201).send({ token, username: user.username });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
