import {
    DisplayCreateCharacterStatusPresenter
} from "@/src/client/presentation/presenters/DisplayCreateCharacterStatusPresenter";
import {
    DisplayCreateCharacterStatusViewModel
} from "@/src/client/presentation/viewModels/DisplayCreateCharacterStatusViewModel";
import {useDependency} from "@/src/client/presentation/hooks/useDependency";

export interface IDisplayCreateCharacterStatusController {
    displayCreateCharacterStatus: () => DisplayCreateCharacterStatusViewModel;
}

export const useDisplayCreateCharacterStatusController = (): IDisplayCreateCharacterStatusController => {
    const displayCreateCharacterStatusUseCase = useDependency('displayCreateCharacterStatusUseCase');

    return {
        displayCreateCharacterStatus: () => {
            const presenter = DisplayCreateCharacterStatusPresenter();
            displayCreateCharacterStatusUseCase.execute(presenter);
            return presenter.getViewModel();
        }
    }
}