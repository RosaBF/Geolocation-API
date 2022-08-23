import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ILoginUserDTO } from '../modules/users/dto/login-user.dto';

function validateUserCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userLoginParams: ILoginUserDTO = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!userLoginParams) {
    return res.status(401).send({ msg: 'E-mail and password required' });
  }

  try {
    jwt.verify(userLoginParams.email, userLoginParams.password);
    next();
  } catch (error) {
    res.status(401).send({ msg: 'login not valid' });
  }

  return userLoginParams;
}

export { validateUserCredentials };
