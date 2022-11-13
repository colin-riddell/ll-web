import Image from "next/image";
import Console from "./console/Console";
import { Text, Heading, Button, VStack, HStack, Center, Flex, Box, Image as ChakraImage, Wrap, WrapItem, Avatar, AvatarGroup } from "@chakra-ui/react";

const Splash = () => {
  // return (
  //   <section className="flex  h-auto w-screen bg-tccblack">
  //     <div className="hidden lg:block w-3/6">
  //       <div className="flex-row ml-32">
  //         <Image src={"/tcc-large.png"} width={400} height={400} />
  //       </div>
  //     </div>
  //     <div className="hidden lg:block w-3/6">
  //       <div className="flex justify-center items-center mt-12 mr-32">
  //         <Console />
  //       </div>
  //     </div>
  //   </section>
  // );
  // NEW SPASH HERE:
  return (
    <Box w={'100%'} h={{ sm: 300, md: 400, lg: 600 }} background={'black.200'}>
      <Flex>
        <Center >
         {/* NOTE. weird padding with the Header, Text and AvatarGroup had to componsate for it with PR's etc */}
          <VStack spacing='24px' align={'start'} pl={20}>
            
            <Heading color={'gray.300'} as='h1' size='2xl'  width={{ sm: 300, md: 600, lg: 800 }}>
            Accelerate your career.
            </Heading>
            <Text color={'gray.400'} pr={20} fontSize='xl'>Join the fastest growing careers network for Software Engineers.</Text>

            <HStack>
            <AvatarGroup pr={'80'} size='lg' max={7}>
              <Avatar name='Colin' src='./avatars/colin.png' />
              <Avatar name='Luke' src='./avatars/luke.png' />
              <Avatar name='San' src='./avatars/sandra.png' />
              <Avatar name='Lou' src='./avatars/louise.png' />
              <Avatar name='Laura' src='./avatars/laura.png' />
              <Avatar name='Kayla' src='./avatars/kayla.png' />
              <Button
            my={4}
            ml={20}
            backgroundColor="green.200"
            color="gray.600"
          >
              Join 
          </Button>
            </AvatarGroup>
           
          </HStack>
          </VStack>
        </Center>
        <Center>
          <ChakraImage src={"/computer-girl-unedited.svg"} width={{ lg: 500 }} height={{lg: 400}} />
        </Center>
      </Flex>
    </Box>
  );
};

export default Splash;
