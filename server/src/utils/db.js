import mongoose from 'mongoose';

export const connect = (url = process.env.DB_URL, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
