import {
    DisplayCreateCharacterStatusViewModel
} from "@/src/client/presentation/viewModels/DisplayCreateCharacterStatusViewModel";
import {Status} from "@/src/client/domain/Status";

export interface IDisplayCreateCharacterStatusPresenter {
    presentStatus(status: Status): void;

    getViewModel(): DisplayCreateCharacterStatusViewModel;
}