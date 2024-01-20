import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { username, confirmationCode } = JSON.parse(event.body || '{}')

  const client = new CognitoIdentityProviderClient({})
  const command = new ConfirmSignUpCommand({
    ClientId: process.env['COGNITO_CLIENT_ID'],
    Username: username,
    ConfirmationCode: confirmationCode
  })

  const result = await client.send(command)
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}
