'use client';

import {Avatar, Box, Card, Flex, Text} from '@radix-ui/themes';
import {PersonIcon} from '@radix-ui/react-icons';
import {useCharactersList} from "@/app/_features/GetCharacters/useCharactersList";
import {CharactersListViewModel} from "@/src/client/presentation/viewModels/CharactersListViewModel";
import {CharacterViewModel} from "@/src/client/presentation/viewModels/CharacterViewModel";

interface CharactersListProps {
    viewModel: CharactersListViewModel
}

const CharactersList = ({viewModel}: CharactersListProps) => {
    const {isLoading, isError, characters, animationParent} = useCharactersList(viewModel);

    if (isLoading) return <Text size="3">{viewModel.loadingMessage}</Text>;
    if (isError) return <Text size="3" color="red">{viewModel.errorMessage}</Text>;

    return (
        <Flex direction="column" gap="2" ref={animationParent}>
            {characters.map((character: CharacterViewModel) => (
                <Card
                    key={character.id}
                    size="1">
                    <Flex gap="3" align="center">
                        <Avatar
                            size="3"
                            fallback={<PersonIcon/>}
                        />
                        <Box width="100%">
                            <Flex align="center" justify="between">
                                <Box>
                                    <Text as="div" size="3" weight="bold" color="iris">
                                        {character.name}
                                    </Text>
                                    <Text as="div" size="2" color="gray">
                                        {character.description}
                                    </Text>
                                </Box>
                                <Text as="div" size="2" color="plum">
                                    {character.loadedFrom}
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default CharactersList;

