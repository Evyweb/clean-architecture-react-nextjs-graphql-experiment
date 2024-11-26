'use client';

import {useAutoAnimate} from '@formkit/auto-animate/react';
import {useGetCharactersController} from "@/app/_hooks/useGetCharactersController";
import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {Avatar, Box, Card, Flex, Text} from '@radix-ui/themes';
import {PersonIcon} from '@radix-ui/react-icons';

interface CharactersListProps {
    initialData: GetCharactersViewModel
}

const CharactersList = ({initialData}: CharactersListProps) => {
    const {data, isLoading, isError} = useGetCharactersController(initialData);
    const [animationParent] = useAutoAnimate();

    if (isLoading) return <Text size="3">Loading...</Text>;
    if (isError) return <Text size="3" color="red">Error fetching characters</Text>;

    return (
        <Flex direction="column" gap="2" ref={animationParent}>
            {data?.characters.map((character: {
                id: string;
                name: string;
                description: string;
                loadedFrom: string;
            }) => (
                <Card
                    key={character.id}
                    size="1">
                    <Flex gap="3" align="center">
                        <Avatar
                            size="3"
                            fallback={<PersonIcon/>}
                            style={{
                                backgroundColor: 'var(--color-background-translucent)',
                            }}
                        />
                        <Box width="100%">
                            <Flex align="center" justify="between">
                                <div>
                                    <Text as="div" size="3" weight="bold" color="iris">
                                        {character.name}
                                    </Text>
                                    <Text as="div" size="2" color="gray">
                                        {character.description}
                                    </Text>
                                </div>
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

