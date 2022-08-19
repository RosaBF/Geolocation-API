import { Request, Response } from 'express';
import { ILoginUserDTO } from '../../dto/login-user.dto';
import { LoginUserErrors } from './login-user.errors';
import { LoginUserUseCase } from './login-user.use-case';

export class LoginUserController {
  private loginUserUsecase: LoginUserUseCase;

  constructor(loginUserUsecase: LoginUserUseCase) {
    this.loginUserUsecase = loginUserUsecase;
  }

  public async execute(req: Request, res: Response) {
    const userLoginParams: ILoginUserDTO = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const loginUserUseCaseResponse = await this.loginUserUsecase.execute(
        userLoginParams
      );
      res.send(loginUserUseCaseResponse);
    } catch (error: any) {
      switch (error.constructor) {
        case LoginUserErrors.userNotfound:
          res.status(404).send({ message: error.message });
          break;
        case LoginUserErrors.passwordInvalid:
          res.status(401).send({ message: error.message });
          break;
        default:
          res.sendStatus(500);
      }
    }
  }
}
