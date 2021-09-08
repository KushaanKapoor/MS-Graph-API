import React, {
    useContext,
    createContext,
    useState,
    MouseEventHandler,
    useEffect} from 'react';
  import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
  import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
  import { useMsal } from '@azure/msal-react';
  import config from './Config';
  import { getUser, getPhoto } from './GraphService';



  const appContext = createContext({
    user: undefined,
    profilePhoto: undefined,
    error: undefined,
    signIn: undefined,
    signOut: undefined,
    displayError: undefined,
    clearError: undefined,
    authProvider: undefined,
    authenticated: undefined,
  });
  
  export function useAppContext() {
    return useContext(appContext);
  }
  
  function useProvideAppContext() {
    const msal = useMsal();
    const [user, setUser] = useState(undefined);
    const [profilePhoto, setPhoto] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [authenticated, setAuthenticated] = useState(undefined);
    const [loading, setLoading] = useState(true);
  
    const displayError = (message, debug) => {
      setError({message, debug});
    }
  
    const clearError = () => {
      setError(undefined);
    }
  

    useEffect(() => {
      const checkUser = async() => {
        if (!user) {
          try {
            // Check if user is already signed in
            const account = msal.instance.getActiveAccount();
            if (account) {
              // Get the user from Microsoft Graph
              

              const user = await getUser(authProvider)
              console.log('user data', user);
              setUser({
                displayName: user.displayName || '',
                email: user.mail || user.userPrincipalName || '',
                timeFormat: user.mailboxSettings?.timeFormat || '',
                timeZone: user.mailboxSettings?.timeZone || 'UTC'
              })

              const photo = await getPhoto(authProvider);
              console.log('photo effect',photo);
              setPhoto(URL.createObjectURL(photo));
              

            }
          } catch (err) {
            displayError(err.message);
          }
        }
      };
      checkUser();
    },[]);

      const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
      msal.instance,
      {
        account: msal.instance.getActiveAccount(),
        scopes: config.scopes,
        interactionType: InteractionType.Popup
      }
    );  
      
    const signIn = async () => {
      // TODO
      console.log('clicked sign in')

      const result = await msal.instance.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
      })
    
    //   console.log('result', result);
      // TEMPORARY: Show the access token
    //   displayError('Access token retrieved', result.accessToken);
    const user = await getUser(authProvider);
    console.log('auth providerr', authProvider);
    setUser({
      displayName: user.displayName || '',
      email: user.mail || user.userPrincipalName || '',
      timeFormat: user.mailboxSettings?.timeFormat || '',
      timeZone: user.mailboxSettings?.timeZone || 'UTC'
    });

    const photo = await getPhoto(authProvider);
    console.log('photo',photo);
    console.log('photo blober',URL.createObjectURL(photo));
    setPhoto(URL.createObjectURL(photo));
    // setLoading(false);

    };
  
    const signOut = async () => {
      // TODO
      await msal.instance.logoutPopup();
      setUser(undefined);
      setAuthenticated(undefined);
      console.log('clicked log out')
    };
  
    return {
      user,
      profilePhoto,
      error,
      signIn,
      signOut,
      displayError,
      clearError,
      authProvider,
      authenticated,
      loading
    };
  }

  export default function ProvideAppContext({ children }) {
    const auth = useProvideAppContext();
    return (
      <appContext.Provider value={auth}>
        {children}
      </appContext.Provider>
    );
  }

  