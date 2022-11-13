import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

const DiscordCTA = () => {
  return (
    <Center mt={10}>
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        {/* <AlertIcon boxSize='40px' mr={0} /> */}
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Join us!
        </AlertTitle>
        <AlertDescription fontSize="lg">
          <Stack>
            <p>
              Want even more career tips and help? Join our growing community...
            </p>
            <Button my={4} backgroundColor="green.200" color="gray.600">
              <Link href="/discord">Join the Discord Community</Link>
            </Button>
          </Stack>
        </AlertDescription>
      </Alert>
    </Center>
  );
};
export default DiscordCTA;
