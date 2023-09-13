import { connect } from 'mongoose';
import config  from '../config/indexConfig';

const connectDB = async () => {
  //Connect to MongoDB
  await connect(config.databaseURL);
}

export default connectDB;