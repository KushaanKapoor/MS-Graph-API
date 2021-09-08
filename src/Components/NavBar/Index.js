import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useMediaQuery,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAppContext } from '../../AppContext';

const Links = [
  { name: 'Dashboard', path: '/Dashboard' },
  { name: 'Search', path: '/' },
];

const NavLink = ({ children, path }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    color={useColorModeValue('white', 'gray.50')}
    _hover={{
      textDecoration: 'none',
      color: useColorModeValue('white', 'gray.50'),
      bg: useColorModeValue('blue.500', 'blue.600'),
    }}
    href={path}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const app = useAppContext();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  // const photo = URL.createObjectURL(app.profilePhoto);
  return (
    <div style={{ position: '-webkit-sticky', position: 'sticky', top: 0 }}>
      <Box bg={useColorModeValue('blue.300', 'blue.400')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            {isLargerThan768 ? (
              <Box>Microsoft Graph App</Box>
            ) : (
              <Box>Graph App</Box>
            )}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
                {app.user && Links.map(({ name, path }) => (
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {app.user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={
                      // 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      app.profilePhoto
                    }
                  />
                </MenuButton>
                <MenuList>
                  {/* <MenuItem>Link 1</MenuItem> */}
                  {/* <MenuDivider /> */}
                  <MenuItem onClick={app.signOut}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                rounded={'xl'}
                px={6}
                colorScheme={'blue'}
                bg={'blue.500'}
                _hover={{ bg: 'blue.600' }}
                onClick={app.signIn}
              >
                {isLargerThan768 ? 'Sign in with Microsoft' : 'Sign In'}
              </Button>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  );
}
