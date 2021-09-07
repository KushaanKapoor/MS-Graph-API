import React from 'react';
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
  } from '@chakra-ui/react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Illustration } from '../../Assets/Illustrations/Illustration';
import {useAppContext} from '../../AppContext';

  function Main(props)
  {

    const app = useAppContext();
    console.log('name', app)
      return(
        <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={'black'}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Finding Emails{' '}
            <Text as={'span'} color={'blue.400'}>
              made easy.
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Never miss an email. Keep track of your
            meetings and receive smart reminders in appropriate times.
          </Text>
          <Stack spacing={6} direction={'row'}>
          <AuthenticatedTemplate>
          <div>
            <h4>Welcome {app.user?.displayName || ''}!</h4>
            <p>Use the navigation bar at the top of the page to get started.</p>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button 
          rounded={'xl'}
              px={6}
              colorScheme={'blue'}
              bg={'blue.600'}
              _hover={{ bg: 'blue.300' }} 
              onClick={app.signIn}>Sign in to get started!</Button>
        </UnauthenticatedTemplate>
          </Stack>
          <Flex w={'full'}>
            <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex>
        </Stack>
      </Container>
      );
  }
  export default Main;