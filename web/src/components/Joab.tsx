import {
    Box,
    Badge,
    useColorModeValue,
    HStack,
    Stack,
    Avatar,
    Button,
    useBreakpointValue,
    Flex
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { Job } from '../lib/types/jobSchema';
import Link from 'next/link';
import Image from 'next/image'


interface JoabProps {
  job: Job;
}

const format = (x): string => {
    return Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(x);
}


const Joab = ({ job }: JoabProps) => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })

    return (
        <Box bg="bg-surface"
            maxHeight={120}
            bgColor={'gray.100'}
            rounded={{lg:'md'}}
            boxShadow={useColorModeValue('lg', '2xl')}>
            <HStack py={{ base: '4', lg: '5' }} px={10} justify="space-around">
                {isDesktop ? 
                  <Avatar size='md' name={job.companyName} src={job.logoUrl} />
                  :
                  <Avatar size='sm' name={job.companyName} src={job.logoUrl} />
                }
                <Stack 
                  isTruncated={!isDesktop} 
                  spacing="0" 
                  width={{sm:300, lg: 200}}
                >
                    <p>{job.companyName}</p>
                    <b>{job.title}</b>
                    <HStack>
                        <Badge textTransform={'none'} size={"xs"} borderRadius='full' colorScheme={'telegram'}>
                            {`📍 ${job.location}`}
                        </Badge>

                        <Badge textTransform={'none'} size={"xs"} borderRadius='full' colorScheme={'telegram'}>
                            {`🤑 ${format(job.minSalary)} - ${format(job.maxSalary)}`}
                        </Badge>
                    </HStack>

                </Stack>
                {isDesktop &&
                    <Flex justify={"flex-start"} width={{ sm: 0, md: 100, lg: 400 }}>
                        {job?.techTags?.map((tag) => {
                            return (
                                <Badge borderRadius='full' px='2' colorScheme='teal'>
                                    {tag}
                                </Badge>
                            );
                        }).filter((element, index) => index < 3)}
                    </Flex>

                }

                <p>{job.dateAdded}</p>
                <Button
                    backgroundColor="green.200"
                    color="gray.500"
                >
                    <Link href={`/jobs/${job._id}`}>View</Link>

                </Button>

            </HStack>
        </Box>
    );
}

export default Joab;
