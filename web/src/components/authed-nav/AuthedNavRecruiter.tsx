import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useBreakpointValue,
  MenuDivider,
  Badge} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';
import { ImExit } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";


import useSubscription from '../../lib/useSubscription';
import { useUser } from "../../lib/useUser";

const CollapsedNavItems = ({ navItems }) => {


    return (
      <>
        <MenuList
        // bg="black.200"
        >
  
          {navItems.map((item) => (
            <MenuItem
              // bg="black.200"
              _focus={{
                //  bg: "black.200"
              }}>
  
              <Button variant="none" color="white" fontWeight={'light'} mt="1" key={item.name} mt="1" key={item.name}>
                <Link href={item.linkTo}>{item.name}</Link>
              </Button>
            </MenuItem>
  
          ))}
  
  
        </MenuList>
      </>
    )
  }
  
  const RecruiterMenuItems = ({ user }) => {
    const { isSubscribed } = useSubscription();
  
    return (
      <>
        <MenuDivider />
        <MenuItem>
          {isSubscribed ?
            <Badge borderRadius='full' px='2' colorScheme='teal'>subscribed</Badge> :
            <Badge borderRadius='full' px='2' colorScheme='red'>not-subscribed</Badge>
          }
          <p>company: {user?.company_name}</p>
        </MenuItem>
      </>
    )
  }
  
  const MenuItems = ({ navItems }) => {
    const { user, isLoading, isRecruiter, role } = useUser();
    const isDesktop = useBreakpointValue({ base: false, lg: true })
  
    return (
      <>
        {/* When the screen isn't desktop, collapse the main nav menu items into the burger  */}
        {!isDesktop && <CollapsedNavItems navItems={navItems} />}
        {/* When it's recruiter, show extra recruiter items */}
        {isRecruiter && <RecruiterMenuItems user={user} />}
  
        <MenuItem disabled>
          <Stack>
            <p>{user?.given_name} {user?.family_name}</p>
            <p>{user?.email}</p>
            <Badge borderRadius='full' px='2' colorScheme='red'>{role}</Badge>
          </Stack>
  
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<FaUserAlt />}>
          Profile
        </MenuItem>
        <MenuItem
          icon={<ImExit />}>
          <Link href="/api/auth/logout">
            Logout
          </Link>
        </MenuItem>
      </>
    )
  }
  
  const AuthedNavRecruiter = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
  
    const navMenuItems = [
      { name: "Hiring Dashboard", linkTo: "/hiring-dashboard" },
      { name: "View My Jobs", linkTo: "/hiring-dashboard/listings" },
      { name: "Create Job", linkTo: "/submit-job" },
    ];
  
    return (
      <Box width={'auto'}
      // bgColor={'black.200'}
      >
        <Box>
          <HStack spacing="10" py={{ base: '4', lg: '5' }} px={10} justify="space-between">
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <Link href={"/"}>
                  <a>
                    <Image src={"/tcc-clean.svg"} width={300} height={50} />
                  </a>
                </Link>
                <ButtonGroup variant="none" color="white" fontWeight={'light'} spacing="8">
                  {navMenuItems.map((item) => (
                    <Button mt="1" key={item.name}>
                      <Link href={item.linkTo}>{item.name}</Link>
                    </Button>
                  ))}
                </ButtonGroup>
                <Menu>
                  <MenuButton
                    pt='2'
                    color={"green.200"}
                    variant="ghost"
                    icon={<FiMenu fontSize="1.50rem" />}
                    aria-label="Open Menu"
                    as={IconButton}
  
                  />
                  <MenuList>
                    <MenuItems navItems={navMenuItems} />
                  </MenuList>
                </Menu>
              </Flex>
  
            ) : (
              <Flex justify="space-between" flex="1">
                <Link href={"/"}>
                  <a>
                    <Image src={"/tcc-clean.svg"} width={300} height={50} />
  
                  </a>
                </Link>
                <Menu>
                  <MenuButton
                    pt='2'
                    color={"green.200"}
                    variant="ghost"
                    icon={<FiMenu fontSize="1.50rem" />}
                    aria-label="Open Menu"
                    as={IconButton}
  
                  />
                  <MenuList>
                    <MenuItems navItems={navMenuItems} />
  
                  </MenuList>
                </Menu>
              </Flex>
            )}
          </HStack>
        </Box>
  
      </Box>
    )
  }

  export default AuthedNavRecruiter;