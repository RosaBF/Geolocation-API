import { IRegisterUserDTO } from './../../dto/register-user.dto';
import { RegisterUserErrors } from './register-user.errors';
import { RegisterUserUseCase } from './register-user.use-case';
import { Request, Response } from 'express';

export class RegisterUserController {
  private registerUserUseCase: RegisterUserUseCase;

  constructor(registerUserUseCase: RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
  }

  public async execute(req: Request, res: Response) {
    const newUser: IRegisterUserDTO = {
      email: req.body.email,
      password: req.body.password,
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
