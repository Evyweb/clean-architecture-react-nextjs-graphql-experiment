import CharactersListContainer from "@/app/_components/CharactersListContainer";
import CreateCharacterForm from "@/app/_components/CreateCharacterForm";

const CharactersPage = () => {
    return (
        <div className="max-w-2xl mx-auto p-5 bg-gray-100 text-gray-900 rounded-lg shadow-md mt-6">
            <h1 className="text-center text-3xl font-bold mb-6">Star Wars characters</h1>
            <CharactersListContainer />
            <hr className="my-4 border-t border-gray-300"/>
            <CreateCharacterForm />
        </div>
    );
};

export default CharactersPage;