import mongoose from 'mongoose';

const user = new mongoose.Schema({
  handle: 'string',
  spreadsheet: 'string',
  color: 'string',
  picture: 'string',

  token: 'string',
  tokenSecret: 'string',
});

export default mongoose.model('User', user);
