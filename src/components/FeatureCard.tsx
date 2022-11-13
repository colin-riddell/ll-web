import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button
  } from '@chakra-ui/react';
  
  const IMAGE =
    'https://assets-global.website-files.com/6257adef93867e50d84d30e2/625eb604bb8605784489d361_Discord-Logo%2BWordmark-Color%20(1).png';
  
  export default function FeatureCard() {

    return (
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          {/* <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'50px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `./resume-icon.png`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}> */}
            <Image
              rounded={'lg'}
         
              objectFit={'cover'}
              src={'./resume-icon.png'}
            />
          {/* </Box> */}
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Build your CV
            </Text>
            {/* <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              Connect to the community
            </Heading> */}
            <Text>Start now and save your progress as you go..</Text>
            <Stack direction={'row'} align={'center'}>
            <Button>Start</Button>

            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }