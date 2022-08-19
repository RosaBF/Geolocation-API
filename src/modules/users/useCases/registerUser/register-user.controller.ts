import { Request, Response } from 'express';
import { IRegisterUserDTO } from '../../dto/register-user.dto';
import { RegisterUserUseCase } from './register-user.use-case';
import { RegisterUserErrors } from './register-user.errors';

export class RegisterUserController {
  private registerUserUseCase: RegisterUserUseCase;

  constructor(registerUserUseCase: RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
  }

  public async execute(req: Request, res: Response) {
    const newUser: IRegisterUserDTO = {
      email: req.body.email as string,
      password: req.body.password as string,
    };

    try {
      const useCaseResponse = await this.registerUserUseCase.execute(newUser);
      res.send(useCaseResponse);
      console.log('heyyyyy', useCaseResponse);
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
