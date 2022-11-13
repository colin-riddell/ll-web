import {
    Button,
    Center,
    Stack
} from "@chakra-ui/react";
import Link from "next/link";

const PodcastCTA = () => {

    return (
        <Center h='96' bg='black.200'>
            <Stack>
                <Center fontWeight={"bold"} color={'white'} mt={4} mb={1} fontSize='lg'>
                    Listen now!
                </Center>
                <Center fontSize='lg' color={'white'}>
                    <Stack>
                        <p color={'white'}>Want even more career tips and help?</p>
                        <Button
                            my={4}
                            backgroundColor="green.200"
                            color="gray.600"
                        >
                            <Link href="/podcast" >
                                Listen to the podcast
                            </Link>
                        </Button>
                    </Stack>
                </Center>
            </Stack>
        </Center>




    );
}
export default PodcastCTA;