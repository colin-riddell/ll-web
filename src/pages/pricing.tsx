import { ReactNode } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { setPriceChoice } from "../features/stripe/stripeSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

interface PriceOptionCompProps {
  priceOptionData: any;
}

const PriceOptionComp = ({ priceOptionData }: PriceOptionCompProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSelectProduct = async (priceChoiceId: string) => {
    await dispatch(setPriceChoice(priceChoiceId));
    router.push("/buy");
  };

  return (
    <PriceWrapper>
      <Box position="relative">
        <Box
          position="absolute"
          top="-16px"
          left="50%"
          style={{ transform: "translate(-50%)" }}
        >
          <Text
            textTransform="uppercase"
            bg={useColorModeValue("green.300", "green.700")}
            px={3}
            py={1}
            color={useColorModeValue("gray.900", "gray.300")}
            fontSize="sm"
            fontWeight="600"
            rounded="xl"
          >
            {priceOptionData.name}
          </Text>
        </Box>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            {priceOptionData.topDescription}
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              £
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              {priceOptionData.price}
            </Text>
            <Text fontSize="3xl" color="gray.500">
              /month
            </Text>
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            {priceOptionData.features.map((featureLine) => {
              return (
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {featureLine}
                </ListItem>
              );
            })}
          </List>
          <Box w="80%" pt={7}>
            <Button
              w="full"
              colorScheme="red"
              onClick={() => handleSelectProduct(priceOptionData.priceId)}
            >
              {priceOptionData.cta}
            </Button>
          </Box>
        </VStack>
      </Box>
    </PriceWrapper>
  );
};

export default function ThreeTierPricing() {
  const priceOptionData = {
    priceId: "price_1KnUhGJcHGs0CjyhihqJnxJO",
    name: "Alpha Offer",
    topDescription: "Exclusive",
    price: 5,
    features: [
      "Unlimited job posts",
      "Reach into healthy Coder Career community",
      "Unique introductory offer",
    ],
    cta: "Get Going",
  };

  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Buy our thing please, it's really good
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Lorem ipsum something lebrem dul.
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceOptionComp priceOptionData={priceOptionData} />
      </Stack>
    </Box>
  );
}
