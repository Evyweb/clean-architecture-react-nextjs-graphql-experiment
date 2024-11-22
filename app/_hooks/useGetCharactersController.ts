import {useDependency} from "@/app/_hooks/useDependency";

import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {GetCharactersUseCase} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCase";
import {GetCharactersController} from "@/src/client/presentation/controllers/GetCharacters/GetCharactersController";

export interface IGetCharactersController {
    getCharacters(): GetCharactersViewModel;
}

export const useGetCharactersController = (): IGetCharactersController => {
    const repository = useDependency('characterRepository');
    const useCase = GetCharactersUseCase(repository);
    return GetCharactersController(useCase);
}