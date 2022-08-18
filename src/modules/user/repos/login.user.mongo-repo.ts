import { IUsersRepo } from './user.repo';
import userModel from '../../../models/user.model';
import { IUserDO } from '../../../models/user.model';
import { IRegisterUserDTO } from '../dto/register-user.dto';
import { not } from 'joi';

class MongoUserRepo implements IUsersRepo {
  public async getAllUsers(): Promise<IUserDO[]> {
    return userModel.find();
  }

  public async getUserByEmail(email: string): Promise<IUserDO | null> {
    return userModel.findOne({ email });
  }

  public async createUser(newUser: IRegisterUserDTO): Promise<IUserDO> {
    return userModel.create(newUser);
  }

  public async saveUserToken(
    id: string,
    token: string
  ): Promise<IUserDO | null> {
    const userDowithToken = userModel.findByIdAndUpdate(id, { token });
    return userDowithToken; 
  }
}

export { MongoUserRepo };
