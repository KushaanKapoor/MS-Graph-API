import React, {useEffect, useState} from 'react';
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Spinner,
    Button,
  } from '@chakra-ui/react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import {useAppContext} from '../../AppContext';
import { getMailData } from '../../GraphService';
import Mail from '../../Components/Mail/Index';
import SearchBar from '../../Components/SearchBar/Index';

  function Dashboard(props)
  {

    const [mailData, setMailData] = useState([])
    const [isLoading, setLoading] = useState(true);

    console.log('dashboard props', props);

    const app = useAppContext();

    const getData = async (searchString) => {
      // TODO
      console.log('infinite call?')
      try
      {
        const data = await getMailData(app.authProvider, searchString);

        setMailData(data);
        setLoading(false);
      }
      catch (err)
      {
        console.log('error', err);
        setLoading(false);
      }

    };

    // useEffect(() => {
      

    //   getData();
    // }, [])

   
      return(
        <Container maxW={'5xl'} >
            <Container marginY={5} centerContent>Dashboard</Container>
            <SearchBar searchEmail={(searchString) => getData(searchString)}/>
           {!isLoading ? <Mail mailData={mailData}/>:<Container centerContent>
             <Spinner size={'lg'} color="blue.500" /></Container>}
      </Container>
      );
  }
  export default Dashboard;