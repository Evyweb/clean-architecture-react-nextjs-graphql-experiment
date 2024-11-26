import CharactersListContainer from "@/app/_components/CharactersListContainer";
import CreateCharacterForm from "@/app/_components/CreateCharacterForm";
import {Card, Container, Flex, Heading, ScrollArea} from "@radix-ui/themes";

const CharactersPage = () => {
    return (
        <Container size="2" py="6">
            <Flex direction="column" gap="6">
                <Flex direction="column" gap="2">
                    <Heading size="8" align="center" mb="4">Star Wars Characters</Heading>
                    <Heading size="3" align="center" mb="2">Clean Architecture is applied on both React (front-end) and
                        NextJS (back-end).</Heading>
                    <Heading size="3" align="center" mb="4">Tanstack Query is used for data fetching using optimistic
                        updates and caching.</Heading>
                </Flex>
                <Flex
                    direction="column"
                    gap="4">
                    <Card>
                        <CreateCharacterForm/>
                    </Card>

                    <ScrollArea type="hover" scrollbars="vertical" style={{height: 400}}>
                        <Card>
                            <CharactersListContainer/>
                        </Card>
                    </ScrollArea>
                </Flex>
            </Flex>
        </Container>
    );
};

export default CharactersPage;