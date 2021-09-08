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
  return user;
}

export async function getPhoto(authProvider)
{
    ensureClient(authProvider);

    const photo = await graphClient.api('me/photo/$value').get();
    // console.log('photo',photo);

    return photo;
}

export async function getMailData(authProvider, searchString)
{
  var str =searchString;
  
  console.log('AUTH',authProvider)
    ensureClient(authProvider);
    try
    {

    const mailData = await graphClient.api('me/messages/')
    .header('Prefer', 'outlook.body-content-type="text"')
    .query({search: str})
    .select('subject,body,bodyPreview,uniqueBody,from,sentDateTime')
    .get();

      if (mailData["@odata.nextLink"]) {
       
        var events = [];
    
        var options = {

          headers : {'Prefer' : 'outlook.body-content-type="text"'}
        };
    
        var pageIterator = new PageIterator(graphClient, mailData, (event) => {
          events.push(event);
          return true;
        }, options);
        await pageIterator.iterate();
    
        return events;
      } else {
        console.log('mailData', mailData.value)
        return mailData.value;
      }
    }
    catch(err)
    {
      console.log('error',err);
    }

    //GET /me/messages?$filter=(from/emailAddress/address) eq 'MiriamG@M365x214355.onmicrosoft.com'
    //GET /me/messages?$search="kushaanKapoor"
    // const photo = await graphClient.api('me/photo/$value').get();
    // console.log('photo',photo);

    // return photo;
}