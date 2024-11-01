import { IUserDO } from './../../../../models/user.model';
import bcrypt from 'bcrypt';
import { IUser } from '../../domain';
import { IRegisterUserDTO } from '../../dto/register-user.dto';
import { IUsersRepo } from '../../repos';
import { RegisterUserErrors } from './register-user.errors';

export interface IRegisterUserUseCase {
  execute(registerParams: IRegisterUserDTO): Promise<IUserDO>;
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
  private userRepo: IUsersRepo;

  constructor(userRepo: IUsersRepo) {
    this.userRepo = userRepo;
  }

  public async execute(registerParams: IRegisterUserDTO): Promise<IUserDO> {
    const { email, password } = registerParams;

    const userFound = await this.userRepo.getUserByEmail(email);

    if (userFound) {
      throw new RegisterUserErrors.UserAlreadyRegistered(email);
    }
    const encriptedPassword = await bcrypt.hash(password, 10);

    const newUser: IRegisterUserDTO = {
      email,
      password: encriptedPassword,
    };

    const registeredUser = this.userRepo.createUser(newUser);

    return registeredUser;
  }
}
