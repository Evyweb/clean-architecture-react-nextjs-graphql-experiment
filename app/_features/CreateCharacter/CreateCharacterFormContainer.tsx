import CreateCharacterForm from "@/app/_features/CreateCharacter/CreateCharacterForm";
import {CreateCharacterFormViewModel} from "@/src/client/presentation/viewModels/CreateCharacterFormViewModel";

const CreateCharacterFormContainer = () => {
    const viewModel: CreateCharacterFormViewModel = {
        name: {
            initialValue: '',
            placeholder: 'Enter character name'
        },
        species: {
            initialValue: '',
            placeholder: 'Enter character species'
        },
        homeworld: {
            initialValue: '',
            placeholder: 'Enter character homeworld'
        },
        button: {
            text: '+ Add character'
        },
        isLoading: {
            initialValue: false
        }
    };

    return (
       <CreateCharacterForm viewModel={viewModel}/>
    );
};

export default CreateCharacterFormContainer;
