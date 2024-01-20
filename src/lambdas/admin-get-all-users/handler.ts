import {
  CognitoIdentityProviderClient,
  ListUsersCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const client = new CognitoIdentityProviderClient({})
  const command = new ListUsersCommand({
    UserPoolId: process.env['USER_POOL_ID']
  })

  const result = await client.send(command)
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}
