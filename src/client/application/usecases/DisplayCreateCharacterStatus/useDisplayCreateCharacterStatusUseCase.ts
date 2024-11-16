import {
    IDisplayCreateCharacterStatusPresenter
} from "@/src/client/application/ports/driven/IDisplayCreateCharacterStatusPresenter";
import {
    IDisplayCreateCharacterStatusUseCase
} from "@/src/client/application/ports/driver/IDisplayCreateCharacterStatusUseCase";
import {ICharacterRepository} from "@/src/client/application/ports/driven/ICharacterRepository";
import {useDependency} from "@/src/client/presentation/hooks/useDependency";

export const useDisplayCreateCharacterStatusUseCase = (): IDisplayCreateCharacterStatusUseCase => {
    const repository: ICharacterRepository = useDependency('characterRepository');
    return {
        execute: (presenter: IDisplayCreateCharacterStatusPresenter) => {
            const status = repository.getCreateCharacterStatus();
            presenter.presentStatus(status);
        }
    }
}