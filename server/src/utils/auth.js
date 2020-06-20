import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const newToken = user => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXP,
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

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

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
