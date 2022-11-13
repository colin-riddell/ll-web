import {
    Box,
    Button,
    Center,
    Stack,
    useBreakpointValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
import { useUser } from '../lib/useUser'

const BannerSplash = () => {
    

    return (
        <Box width={'auto'}
            bgSize={"100%"}
            bgImage={"/alt-index-banner.png"}
            bgRepeat={'no-repeat'}
        >
            <Box h={200}  >
                
            </Box>
            <Stack mt={{ sm: 10, lg: 0 }}>
                <Center >
                    <Button
                        backgroundColor="green.200"
                        color="gray.500"
                        my={{ sm: "0px", md: "30px" }}
                    >
                        <Link href="/dashboard" >
                            Search roles
                        </Link>
                    </Button>
                </Center>
            </Stack>
        </Box>
    )
}
export default BannerSplash;