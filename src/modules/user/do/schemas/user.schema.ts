import { Schema } from 'mongoose';
import { IUser } from '../../domain';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    reqired: true,
  },
});

export default userSchema;
