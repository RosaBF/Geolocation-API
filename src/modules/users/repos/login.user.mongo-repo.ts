import { IUsersRepo } from './user.repo';
import userModel from '../../../models/user.model';
import { IUserDO } from '../../../models/user.model';
import { IRegisterUserDTO } from '../dto/register-user.dto';


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
    const userDoWithToken = userModel.findByIdAndUpdate(id, { token });
    return userDoWithToken; 
  }
}

export { MongoUserRepo };
