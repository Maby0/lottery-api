import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient
} from '@aws-sdk/client-cognito-identity-provider'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const username = event.pathParameters?.id
  const attributesToUpdate = JSON.parse(event.body || '{}')
  if (!Array.isArray(attributesToUpdate)) {
    return {
      statusCode: 400,
      body: 'Attributes to update should be an array of objects e.g. [{"Name": "email", "Value": "test@email.com"}]'
    }
  }

  const client = new CognitoIdentityProviderClient({})
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: process.env['USER_POOL_ID'],
    Username: username,
    UserAttributes: attributesToUpdate
  })

  try {
    const result = await client.send(command)
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 404,
      body: JSON.stringify(error)
    }
  }
}
