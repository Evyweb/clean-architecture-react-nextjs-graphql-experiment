import CharactersListContainer from "@/app/_components/CharactersListContainer";
import CreateCharacterForm from "@/app/_components/CreateCharacterForm";
import {Callout, Card, Container, Flex, Heading, ScrollArea} from "@radix-ui/themes";
import {InfoCircledIcon} from "@radix-ui/react-icons";

const CharactersPage = () => {
    return (
        <Container size="2" py="6">
            <Flex direction="column" gap="6">
                <Flex direction="column" gap="2">
                    <Heading size="8" align="center" mb="4">Star Wars Application</Heading>

                    <Callout.Root>
                        <Callout.Icon>
                            <InfoCircledIcon/>
                        </Callout.Icon>
                        <Callout.Text>
                            <b>Clean Architecture</b> is applied on both <b>React (front-end)</b> and <b>NextJS (back-end)</b>.
                        </Callout.Text>
                    </Callout.Root>
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