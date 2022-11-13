import Joab from "./Joab";
import { Box, Badge, Image, Stack, Container } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

const Teaser = ({ jobs }) => {

  // List a couple of roles
  return (
    <Stack my={5} mx={{base:0, md: 32}} spacing={5}>
      {jobs?.map((job) => <Joab job={job} />)}
      <p className="flex right-32 justify-end pr-6">view all . .  </p>
    </Stack>
  );
}


export async function getServerSideProps() {

  // TODO: fetch these
  const jobs = [
    {
      companyName: "Amazon",
      title: "Frontend Developer",
      salary: "$25000-$35000",
      description:
        "We are looking for talented computer scientists/software engineers to support the development of a suite of GUI-based interactive tools at blah blah. This software is crucial in the design and analysis of state-of-the-art semiconductor devices by companies and academic institutions worldwide.",
      location: "London, UK",
      remote: true,
      companyId: 1234,
      dateAdded: "27th March 2022",
      logoUrl: "https://avatars.githubusercontent.com/u/38852603?v=4",
      techTags: ["js", "Java", "k8s"]
    },
    {
      companyName: "Netflix",
      title: "DevOps Engineer",
      salary: "$55000-$75000",
      description:
        "We are looking for talented computer scientists/software engineers to support the development of a suite of GUI-based interactive tools at blah blah. This software is crucial in the design and analysis of state-of-the-art semiconductor devices by companies and academic institutions worldwide.",
      location: "London, UK",
      remote: false,
      companyId: 5678,
      dateAdded: "27th March 2022",
      logoUrl: "https://avatars.githubusercontent.com/u/38852603?v=4",
      techTags: ["terraform", "k8s", "aws", "jenkins"]

    },
  ];

  return {
    props: {
      jobs
    }
  }


}


export default Teaser;