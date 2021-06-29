import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";



class CreateTagService {
    async execute(name: string) {
        const tagRepositories = getCustomRepository(TagsRepositories);

        if (!name) {
            throw new Error('Incorrect name!');
        }

        const tagAlreadyExist = await tagRepositories.findOne({ name });

        if (tagAlreadyExist) {
            throw new Error('Tag already exist!!!');
        }

        const tag = tagRepositories.create({
            name
        });

        await tagRepositories.save(tag);

        return tag;
    }
}

export { CreateTagService };