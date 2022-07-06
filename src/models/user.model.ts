import { model, Document } from 'mongoose'
import { IUser } from '../modules/user/domain'
import userSchema from '../modules/user/do/schemas/user.schema';

// DO: a data class we defined for mongoose schema. 
// It reflects what we stored in the DB, such as IUserDO in this case.

export interface IUserDO extends IUser, Document { }

const userModel = model<IUser>('User', userSchema);

export default userModel;
