import {
    IDisplayCreateCharacterStatusPresenter
} from "@/src/client/application/ports/driven/IDisplayCreateCharacterStatusPresenter";
import {
    DisplayCreateCharacterStatusViewModel
} from "@/src/client/presentation/viewModels/DisplayCreateCharacterStatusViewModel";
import {Status} from "../../domain/Status";

export const DisplayCreateCharacterStatusPresenter = (): IDisplayCreateCharacterStatusPresenter => {
    let viewModel: DisplayCreateCharacterStatusViewModel = {
        successMessage: '',
        isLoading: false,
        hasError: false,
        errorMessage: '',
        isSuccessful: false
    };

    return {
        presentStatus(status: Status) {
            viewModel = {
                isLoading: status.loading,
                hasError: !!status.error,
                errorMessage: `Error: ${status.error?.message}` || '',
                isSuccessful: !!status.character,
                successMessage: `Character ${status.character?.name} created successfully!`
            };
        },
        getViewModel() {
            return viewModel;
        }
    }
}