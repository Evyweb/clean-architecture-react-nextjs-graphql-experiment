import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {GetCharactersUseCase} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCase";
import {GetCharactersController} from "@/src/client/presentation/controllers/GetCharacters/GetCharactersController";
import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";

export interface IGetCharactersController {
    getCharacters(): GetCharactersViewModel;
}

export const useGetCharactersController = (repository: ICharacterRepository): IGetCharactersController => {
    const useCase = GetCharactersUseCase(repository);
    return GetCharactersController(useCase);
}