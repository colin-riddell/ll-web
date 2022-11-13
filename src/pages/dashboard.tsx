import {
  Box,
  Text,
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
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Collapse,
  useDisclosure,
  GridItem,
  Grid
} from "@chakra-ui/react";
import {
  FiInfo
} from 'react-icons/fi';

import { useRouter } from "next/router";
import FeatureCard from "../components/FeatureCard";
import Profile from "../components/Profile";
import { useUser } from "../lib/useUser";


const Dashboard = () => {
  const { query } = useRouter();
  const { user } = useUser();
  console.log(user)


  return (
    <>

      <Grid
        templateAreas={`
                  "nav header"
                  "nav main"
                  `}
        gridTemplateRows={'max-content 1fr'}
        gridTemplateColumns={'auto 1fr'}
        h='1000px'
        gap='1'
        // px={"24"}
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' h={'max'} area={'header'}>

        <Box
          p='20px'
          color='white'
          mt='4'
          bg='blue.200'
          rounded='md'
          shadow='md'
        >
          <Stack direction={"row"}>
          <FiInfo color="white" />
          <Text> Welcome to The Coder Career. Connect your discord account to upgrade.</Text>
          </Stack>

        </Box>

         
        </GridItem>
        <GridItem pl='2' area={'nav'}>
          {/* <Profile /> */}

        </GridItem>
        <GridItem  pl='2' area={'main'}>
          <SimpleGrid
            columns={{ base: 2, xl: 3 }}
            spacing={'20'}
            // mt={16 }
            mx={'auto'}>
            {/* {testimonials.map((cardInfo, index) => ( */}
            <FeatureCard />
            {/* ))} */}
          </SimpleGrid>
        </GridItem>

      </Grid>


    </>
  );
};
Dashboard.auth = { roles: ["jobseeker"], error: () => (<h2>Dashboard unauthorized</h2>) };

export default Dashboard;
