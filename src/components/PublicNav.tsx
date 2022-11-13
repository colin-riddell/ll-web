import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useUser } from "../lib/useUser";

const PublicNav = () => {
  const { user, isLoading, isRecruiter, isJobseeker, authenticated } = useUser();
  const isDesktop = useBreakpointValue({ base: false, lg: true })


  const navMenuItems = [
    { name: "Blog", linkTo: "/blog" },
    { name: "Podcast", linkTo: "/podcast" },
    { name: "Join Community", linkTo: "/discord" },
    { name: "About TCC", linkTo: "/about" },
  ];

  const showAuthButtons = () => {
    if (authenticated && isRecruiter) {
      return (
        <HStack spacing="3">

          <Button color="gray.600" variant="primary">
            <Link href="/hiring-dashboard" >
              Hiring Dashboard
            </Link>
          </Button>
          <Button
            my={4}
            backgroundColor="green.200"
            color="gray.600"
          >
            <Link href="/api/auth/logout">
              Logout
            </Link>
          </Button>
        </HStack>
      )
    }

    if (authenticated && isJobseeker) {
      return (
        <HStack spacing="3">

          <Button color="gray.600" variant="primary">
            <Link href="/dashboard" >
              Dashboard
            </Link>
          </Button>
          <Button
            my={4}
            backgroundColor="green.200"
            color="gray.600"
          >
            <Link href="/api/auth/logout">
              Logout
            </Link>
          </Button>
        </HStack>
      )
    }
    if (!authenticated) {
      return (
        <HStack spacing="3">
{/* turn this on when going live with community login etc */}
          <Button color="gray.600" variant="primary">
            <Link href="/api/auth/login?role=recruiter&returnTo=/hiring-dashboard" >
              Hiring
            </Link>
          </Button>
          <Button
            my={4}
            backgroundColor="green.200"
            color="gray.600"
          >
            <Link href="/api/auth/login?role=jobseeker&returnTo=/dashboard" >
              Login
            </Link>
          </Button>
        </HStack>
      )
    }
    return null;
  }



  return (
    <Box width={'auto'}
      bgColor={'black.200'}
    >
      <Box >
        <HStack spacing="10" py={{ base: '4', lg: '5' }} px={10} justify="space-between">
          {isDesktop ? (
            <Flex justify="space-between" flex="1">
              <Image src={"/tcc2.png"} width={300} height={50} />

              <ButtonGroup variant="none" color="white" spacing="8">
                {navMenuItems.map((item) => (
                  <Button mt="1" key={item.name}>
                    <Link href={item.linkTo}>{item.name}</Link>
                  </Button>
                ))}
              </ButtonGroup>

              {showAuthButtons()}

            </Flex>

          ) : (
            <Flex justify="space-between" flex="1">
              <Link href={"/"}>
                <a>
                  <Image src={"/tcc1.png"} width={30} height={30} />
                </a>
              </Link>              
              <Menu>
                <MenuButton
                  pt='1'
                  color={"green.200"}
                  variant="ghost"
                  icon={<FiMenu fontSize="1.50rem" />}
                  aria-label="Open Menu"
                  as={IconButton}

                />
                <MenuList bg="black.200">

                  {navMenuItems.map((item) => (
                    <MenuItem bg="black.200" _focus={{ bg: "black.200" }}>
                      <Button variant="none" color="white" fontWeight={'light'} mt="1" key={item.name}>
                        <Link href={item.linkTo}>{item.name}</Link>
                      </Button>
                    </MenuItem>
                  ))}
                  {showAuthButtons()}
                </MenuList>

              </Menu>


            </Flex>
          )}
        </HStack>
      </Box>

    </Box>
  )

}

export default PublicNav;
