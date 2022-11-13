import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';
  
  export default function Profile() {
    const user = useAppSelector(selectUser)

    return (
      <Center py={6}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          
          <Flex justify={'center'} >
            <Avatar
              size={'xl'}
              src={
                user.image
              }
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {user.given_name}
              </Heading>
              <Text color={'gray.500'}>Frontend Developer</Text>
            </Stack>
  
            
  
        
          </Box>
        </Box>
      </Center>
    );
  }