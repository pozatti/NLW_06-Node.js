import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const userRepositories = getCustomRepository(UserRepositories);

        const userExist = await userRepositories.findOne({ email });

        if (!userExist) {
            throw new Error('Email/Password incorrect!!!');
        }

        const passwordMatch = await compare(password, userExist.password);

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect!!!');
        }

        const token = sign({
            email: userExist.email
        }, '668685580583b0b9a11565ce6d59a570', {
            subject: userExist.id,
            expiresIn: '1d'
        });

        return token;
    }
}

export { AuthenticateUserService };