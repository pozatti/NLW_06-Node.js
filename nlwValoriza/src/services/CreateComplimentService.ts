import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositories";


interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentRepositories = getCustomRepository(ComplimentsRepositories);
        const userRepositories = getCustomRepository(UserRepositories);

        if (user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver!");
        }

        const userReceiverExist = await userRepositories.findOne(user_receiver);

        if (!userReceiverExist) {
            throw new Error("User Receiver does not exist!");
        }

        const compliment = complimentRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };