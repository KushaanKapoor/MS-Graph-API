import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Raleway",
  },
})

const config = {
  appId: process.env.REACT_APP_OAUTH_CLIENT_ID,
  redirectUri: 'http://localhost:3000',
  scopes: [
    'user.read',
    'mailboxsettings.read',
    'calendars.readwrite',
    'Mail.Read',
    'Mail.ReadBasic'
  ]
};
export default config;