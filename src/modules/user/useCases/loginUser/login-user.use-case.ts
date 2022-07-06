import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IAccessTokenDTO } from './../../dto/access-token.dto';
import { ILoginUserDTO } from '../../dto/login-user.dto';
import { IUsersRepo } from '../../repos/loginUser.repo';
import { LoginUserErrors } from './login-user.errors';
import config from '../../../../../config';

export interface ILoginUserUseCase {
  execute(loginParams: ILoginUserDTO): Promise<IAccessTokenDTO>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
  private usersRepo: IUsersRepo;

  constructor(usersRepo: IUsersRepo) {
    this.usersRepo = usersRepo;
  }

  public async execute(loginParams: ILoginUserDTO): Promise<IAccessTokenDTO> {
    const { email, password } = loginParams;
    const userFound = await this.usersRepo.getUserByEmail(email);

    if (!userFound) {
      throw new LoginUserErrors.userNotfound(email);
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isCorrectPassword) {
      throw new LoginUserErrors.passwordInvalid();
    }

    const token = jwt.sign(
      { id: userFound._id, email: userFound.email },
      config.tokenKey,
      {
        expiresIn: '10h',
      }
    );

    await this.usersRepo.saveUserToken(userFound._id, token);

    return { token };
  }
}
