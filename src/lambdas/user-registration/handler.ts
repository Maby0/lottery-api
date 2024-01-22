import {
  CognitoIdentityProviderClient,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { username, password, email, givenName, familyName } = JSON.parse(
    event.body || '{}'
  )

  const client = new CognitoIdentityProviderClient({})
  const command = new SignUpCommand({
    ClientId: process.env['COGNITO_CLIENT_ID'],
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'given_name', Value: givenName },
      { Name: 'family_name', Value: familyName }
    ]
  })

  try {
    const result = await client.send(command)
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(`Error creating user: ${error}`)
    }
  }
}
