import { model, Document } from 'mongoose'
import { IUser } from '../modules/users/domain'
import userSchema from '../modules/users/do/schemas/user.schema';

// DO: a data class we defined for mongoose schema. 
// It reflects what we stored in the DB, such as IUserDO in this case.

export interface IUserDO extends IUser, Document { }

const userModel = model<IUser>('User', userSchema);

export default userModel;
