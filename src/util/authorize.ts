import { google } from "googleapis";

const { CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

const REDIRECT_URI = "http://localhost:3000";
const OAUTH_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";

/**
 * Get an initialized OAuth2 client
 */
export default function getOAuthClient() {
  const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  client.setCredentials({
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN,
    token_type: "Bearer",
    scope: OAUTH_SCOPE,
  });

  return client;
}
