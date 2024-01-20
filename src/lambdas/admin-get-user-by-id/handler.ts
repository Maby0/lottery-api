import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  GetUserCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const username = event.pathParameters?.id

  const client = new CognitoIdentityProviderClient({})
  const command = new AdminGetUserCommand({
    UserPoolId: process.env['USER_POOL_ID'],
    Username: username
  })

  try {
    const result = await client.send(command)
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error)
    }
  }
}
