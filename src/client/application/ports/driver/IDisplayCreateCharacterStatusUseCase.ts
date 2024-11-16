import {
    IDisplayCreateCharacterStatusPresenter
} from "@/src/client/application/ports/driven/IDisplayCreateCharacterStatusPresenter";

export interface IDisplayCreateCharacterStatusUseCase {
    execute:(presenter: IDisplayCreateCharacterStatusPresenter) => void;
}