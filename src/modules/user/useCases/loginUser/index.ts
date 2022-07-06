import { LoginUserController } from './login-user.controller';
import { MongoUserRepo } from '../../repos';
import { LoginUserUseCase } from './login-user.use-case';

const repo = new MongoUserRepo();
const usecase = new LoginUserUseCase(repo);
const loginUserController = new LoginUserController(usecase)

export { loginUserController }; 
