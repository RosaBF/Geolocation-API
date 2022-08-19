import { IUserDO } from "../../../models/user.model";
import { IRegisterUserDTO } from "../dto/register-user.dto";


interface IUsersRepo {
    getAllUsers(): Promise<IUserDO[]>;
    getUserByEmail(email: string): Promise<IUserDO | null>;
    createUser(newUser: IRegisterUserDTO): Promise<IUserDO>;
    saveUserToken(id: string, token: string): Promise<IUserDO | null>; 
}

export { IUsersRepo }; 