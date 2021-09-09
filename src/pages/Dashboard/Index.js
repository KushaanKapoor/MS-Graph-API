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
import { getEmailFromSender, getMailData } from '../../GraphService';
import Mail from '../../Components/Mail/Index';
import SearchBar from '../../Components/SearchBar/Index';

  function Dashboard(props)
  {

    const [mailData, setMailData] = useState(undefined)
    const [isLoading, setLoading] = useState(false);

    console.log('dashboard props', props);

    const app = useAppContext();


    const searchEmail = async (searchString) => {
      setLoading(true);

      var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      
     if(searchString.match(emailRegex))
      {
        console.log('it is an email');

        try{

          const data = await getEmailFromSender(app.authProvider, searchString);
          
          setMailData(data);
          setLoading(false);
        }
        catch (err)
        {
          console.log('error', err);
          setLoading(false);
        }
      }
      else
      {

        // const number = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
        
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
        
      }
    };

    // useEffect(() => {
      

    //   getData();
    // }, [])

   
      return(
        <Container maxW={'5xl'} >
            <Container marginY={5} centerContent>Dashboard</Container>
            <SearchBar searchEmail={(searchString) => searchEmail(searchString)}/>
           {!isLoading ? (mailData ? <Mail mailData={mailData}/>:<Text>No Items</Text>):<Container centerContent>
             <Spinner size={'lg'} color="blue.500" /></Container>}
      </Container>
      );
  }
  export default Dashboard;