import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Heading,
  SimpleGrid,
  Center,
  Divider,
  Button,
  Stack, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Collapse,
  useDisclosure
} from '@chakra-ui/react'

import { getStripeSubscription, selectStripeSubscription, selectStripeSubscriptionLoading } from "../features/stripe/stripeSlice";
import { useRouter } from "next/router";
import SubmitJob from "../components/SubmitJob";
import { useEffect } from "react";
import { getUsersJobListings, selectJobs } from "../features/jobs/jobsSlice";
import Link from "next/link";

const newSubMessage = () => {
  return (
    <Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Subscription created!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Thanks for subscribing, you can now promote your roles to our thriving community.
      </AlertDescription>
    </Alert>
  )
}

const Dashboard = () => {
  // todo get the query newSub and render the  newSubscribedMessage if it's true
  const subscription = useSelector(selectStripeSubscription);
  const subscriptionStatusLoading = useSelector(selectStripeSubscriptionLoading)
  const dispatch = useDispatch();
  const { query } = useRouter();
  const jobs = useSelector(selectJobs)
  const isSubscribed = subscription?.subscriptionObject?.status == "active"

  useEffect(() => {
    dispatch(getUsersJobListings())
    dispatch(getStripeSubscription());

  }, []);


  const renderSubscriptionStatus = () => {
    if (isSubscribed) {
      if (query.newSub) {
        return newSubMessage();
      }
      return null
    }
    return (
      <Alert status='warning'>
        <AlertIcon />
        <AlertTitle>Your not subscribed yet!</AlertTitle>
        <AlertDescription>Your TCC experience may be degraded.
          <Button colorScheme='green' variant='solid' backgroundColor='green.200' color='gray.600' >
            <Link href="/pricing" ><em>Subscribe Now</em></Link>
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Container maxW='900px'>
      {renderSubscriptionStatus()}
      <Heading mt='50'>Hiring Dashboard</Heading>
      <p color='grey.600'>View and create job listings, track their performance in the market.</p>

      <SimpleGrid columns={2} spacing={10} my='10'>

        <Box p={4} borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Box
            mt='1'
            fontWeight='bold'
            as='h4'
            lineHeight='tight'
            isTruncated
            ml={5}
          >
            Live job ad's
          </Box>
          <StatGroup>
            <Stat p={5}>
              <StatLabel>Created</StatLabel>
              <StatNumber>12</StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                23.36%
              </StatHelpText>
            </Stat>

            <Stat p={5} w='10'>
              <StatLabel>Total Views</StatLabel>
              <StatNumber>45</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                9.05% - over 7 days
              </StatHelpText>
            </Stat>
          </StatGroup>

          <Center height='25px'>
            <Divider orientation='horizontal' />
          </Center>

          <Stack direction='row' spacing={110} align='center'>

          </Stack>
        </Box>

        <Box p={4} borderWidth='1px' borderRadius='lg' overflow='hidden'>


          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>role</Th>
                  <Th>views</Th>
                  <Th isNumeric>applied</Th>
                </Tr>
              </Thead>
              <Tbody>
                {jobs.map((job) => {
                  return (
                    <Tr key={job.id}>
                      <Td maxW='36' isTruncated>{job.title}</Td>
                      <Td isNumeric>{job.viewCount}</Td>
                      <Td isNumeric>10</Td>
                    </Tr>
                  )
                }).slice(0, 3)}
              </Tbody>

            </Table>



            <Stack mt={5} direction='row' spacing={110} align='center'>
              <Button colorScheme='green' variant='outline' color='gray.600'>
                View all
              </Button>
              <Button variant='solid' backgroundColor='green.200' color='gray.600'>
                {isSubscribed ?
                  <Link href={"/submit-job"}>Create Ad</Link>
                  :
                  <Link href={"/pricing"}>Create Ad</Link>
                }
              </Button>
            </Stack>

          </TableContainer>
        </Box>

      </SimpleGrid>
    </Container>
  );
};

Dashboard.auth = { roles: ["recruiter"], error: () => (<h2>Nope</h2>) }


export default Dashboard;
