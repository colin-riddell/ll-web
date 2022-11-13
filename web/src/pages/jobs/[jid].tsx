import { useEffect } from 'react';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import DevIcon from "devicon-react-svg";
import { 
  Avatar,
  Badge, 
  Box, 
  Button, 
  Center, 
  Container, 
  Flex, 
  HStack, 
  Heading,
  Link, 
  ListItem, 
  SimpleGrid, 
  Stack, 
  UnorderedList, 
  useBreakpointValue, 
  useColorModeValue 
} from '@chakra-ui/react';

import { getJobByJobId } from '../../lib/mongodb';
import { Job } from '../../lib/types/jobSchema';
import AuthedNav from '../../components/authed-nav/AuthedNav';

type JobPageProps = {
  jid?: string;
  job: Job,
  mdDescription: MDXRemoteProps;

};

const format = (x): string => {
  return Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 1
  }).format(x);
}


const JobInfo = ({job}) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  return (
    <Box bg="bg-surface"
      maxHeight={300}
      bgColor={'gray.100'}
      rounded={{ lg: 'md' }}
      boxShadow={useColorModeValue('lg', '2xl')}
    >
      <HStack>
        <Heading px={{sm:1, lg: 20}} py={5}>{job.title}</Heading>
        
      </HStack>
      <HStack py={{ base: '4', lg: '5' }} px={10} justify="space-around">
        {isDesktop ?
          <Avatar size='2xl' name={job.companyName} src={job.logoUrl} />
          :
          <Avatar size='sm' name={job.companyName} src={job.logoUrl} />
        }
        <Stack
          isTruncated={!isDesktop}
          // spacing="0"
          width={{ sm: 300, lg: 200 }}
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
                <Badge key={tag} borderRadius='full' px='2' colorScheme='teal'>
                  {tag}
                </Badge>
              );
            })}
          </Flex>

        }

        <p>{job.dateAdded}</p>
        <Button
          backgroundColor="green.200"
          color="gray.500"
        >
          <Link href={`/jobs/${job.id}`}>Apply</Link>

        </Button>

      </HStack>
    </Box>
  )
}

const JobPage = ({ jid, job, mdDescription }: JobPageProps) => {
 
  useEffect(() => { // increase view count on this article
    fetch(`/api/stats/jobs/${jid}`, { method: "POST" });
  }, [])

  const minSalaryFormatted: string = job.minSalary.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
  const maxSalaryFormatted: string = job.maxSalary.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

  return (
    <>

      <Container my={'24'} maxW='900px'>
        <JobInfo job={job} />
        <Center>
          <Stack>

            {/* Note: modify tailwind.config.js typography section to customise prose section */}
            <Box my={10}>
              <article className="prose lg:prose-md">
                <MDXRemote {...mdDescription} />
              </article>
            </Box>

            <Center>

              {/* <HStack>

                {job.techTags.map((tag) => (<DevIcon style={{
                  width: "150px",
                }} icon={tag} />))}

              </HStack> */}
            </Center>
            <Box p={4} borderWidth='1px' borderRadius='lg' overflow='hidden'>

              <SimpleGrid columns={2} spacing={10} my='10'>

                <Box mt='1' as='h4' lineHeight='10' isTruncated ml={5}>
                  <UnorderedList>
                    <ListItem>Salary range: {minSalaryFormatted} - {maxSalaryFormatted}</ListItem>
                    <ListItem>Location: {job.location}</ListItem>
                  </UnorderedList>
                </Box>

                <Box mt='1' as='h4' lineHeight='10' isTruncated ml={5}>
                  <UnorderedList>
                    {job.techTags.map((tag) => (<ListItem key={tag}>{tag}</ListItem>))}
                  </UnorderedList>
                </Box>

              </SimpleGrid>

            </Box>

          </Stack>

        </Center>
      </Container>
    </>
  )
}

export default JobPage;

JobPage.auth = { roles: ["jobseeker","recruiter"], error: () => (<h2>403: Job page: nope :)</h2>) }


export async function getServerSideProps({ params }) {
  
  const job = await getJobByJobId(params.jid)

  const mdDescription = await serialize(job.description);

  return {
    props: { jid: params.jid, job, mdDescription }
  }
}
