import {
  CognitoIdentityProviderClient,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const userRegistrationHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { username, password, email } = JSON.parse(event.body || '{}')

  const client = new CognitoIdentityProviderClient({})
  const command = new SignUpCommand({
    ClientId: process.env['COGNITO_CLIENT_ID'],
    Username: username,
    Password: password,
    UserAttributes: [{ Name: 'email', Value: email }]
  })

  const result = await client.send(command)
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}
