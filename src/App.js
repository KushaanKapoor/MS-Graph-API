import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import {theme} from './Config';
import Routing from './Routes/Routes';
import NavBar from './Components/NavBar/Index';
import ProvideAppContext from './AppContext';
import { useMsal, MsalProvider } from "@azure/msal-react";


function App({pca}) {
  return (
    <ChakraProvider theme={theme}>
      <MsalProvider instance={pca}>
      <ProvideAppContext>
      <NavBar />
      <Routing />
      </ProvideAppContext>
      </MsalProvider>
    </ChakraProvider>
  );
}

export default App;
