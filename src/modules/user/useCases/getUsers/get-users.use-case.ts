import { IUserDO } from '../../../../models/user.model';
import { IUsersRepo } from '../../repos/loginUser.repo'


export interface IGetUsersUseCase {
    execute(): Promise<IUserDO[]>;
}

class GetUsersUseCase implements IGetUsersUseCase{
    private usersRepo: IUsersRepo;

    constructor(usersRepo: IUsersRepo) {
        this.usersRepo = usersRepo;
    }

    public async execute(): Promise<IUserDO[]> {
        return this.usersRepo.getAllUsers();
    }
}

export default GetUsersUseCase;