import { Box, Center, chakra, Flex, HStack, useColorModeValue, Text} from "@chakra-ui/react";
import Image from "next/image";

const WhatIsTcc = () => {
    return (
        <Center bg={'blue.200'} py={28}>
            <HStack>
                <Box px={8}><Image src={"/engineers-community.svg"} width={400} height={300} /></Box>

                <Box px={8}>
                    <chakra.h1
                        py={5}
                        fontSize={48}
                        fontWeight={'bold'}
                        color={'gray.100'}
                        >
                        A supportive community
                    </chakra.h1>
                    <chakra.h2
                        margin={'auto'}
                        width={'70%'}
                        fontWeight={'medium'}
                        color={'gray.300'}
                        >
                    </chakra.h2>
                    <Text 
                        color={'gray.300'}
                         margin={'auto'}
                         width={'70%'}>
                        <chakra.ul>
                            <chakra.li> Build and share a beautiful CV</chakra.li>
                            <chakra.li> The best tech and career tips</chakra.li>
                            <chakra.li> Invalueable, honest CV help</chakra.li>


                        </chakra.ul>
                    </Text>
                </Box>
            </HStack>
        </Center>
    );

    // return (
    //     <Flex
    //         textAlign={'center'}
    //         pt={10}
    //         justifyContent={'center'}
    //         direction={'column'}
    //         width={'full'}>
    //         <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
    //             <chakra.h3
    //                 // fontFamily={'Work Sans'}
    //                 fontWeight={'bold'}
    //                 fontSize={20}
    //                 textTransform={'uppercase'}
    //                 color={'blue.200'}>
    //                 our members ❤️ TCC
    //             </chakra.h3>
    // <chakra.h1
    //     py={5}
    //     fontSize={48}
    //     // fontFamily={'Work Sans'}
    //     fontWeight={'bold'}
    //     color={useColorModeValue('gray.700', 'gray.50')}>
    //     You're in good company
    // </chakra.h1>
    // <chakra.h2
    //     margin={'auto'}
    //     width={'70%'}
    //     // fontFamily={'Inter'}
    //     fontWeight={'medium'}
    //     color={useColorModeValue('gray.500', 'gray.400')}>
    //     Hear what our members have to say about

    //     {' '}
    //     <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
    //         The Coder Career
    //     </chakra.strong>{' '}
    // </chakra.h2>
    //         </Box>


    //     </Flex>
    // );

}

export default WhatIsTcc;