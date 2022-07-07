import { RegisterUserErrors } from './register-user.errors';
import { IRegisterUserUseCase } from './register-user.use-case';
import { Request, Response } from 'express';

export class RegisterUserController {
  private registerUserUseCase: IRegisterUserUseCase;

  constructor(registerUserUseCase: IRegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
  }

  public async execute(res: Response, req: Request) {
    const newUser = {
      email: req.body.email as string,
      password: req.body.password as string,
    };

    try {
      const useCaseResponse = await this.registerUserUseCase.execute(newUser);
      res.send(useCaseResponse);
    } catch (error: any) {
      switch (error) {
        case RegisterUserErrors.UserAlreadyRegistered:
          res.send(409).send({ message: error.message });
          break;
        default:
          res.sendStatus(500);
      }
    }
  }
}
