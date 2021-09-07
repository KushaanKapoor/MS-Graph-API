import { Client, GraphRequestOptions, PageCollection, PageIterator } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { endOfWeek, startOfWeek } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
// import { User, Event } from 'microsoft-graph';

let graphClient = undefined;

function ensureClient(authProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }

  return graphClient;
}

export async function getUser(authProvider) {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user = await graphClient.api('/me').get();
    // Only retrieve the specific fields needed
    // .select('displayName,mail,mailboxSettings,userPrincipalName')
    // .get();
console.log('user graph waala', user);
  return user;
}

export async function getPhoto(authProvider)
{
    ensureClient(authProvider);

    const photo = await graphClient.api('me/photo/$value').get();
    // console.log('photo',photo);

    return photo;
}