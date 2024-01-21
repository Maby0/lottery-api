import {
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient
} from '@aws-sdk/client-cognito-identity-provider'

export const handler = async (input: { userId: string }) => {
  const username = input.userId

  const client = new CognitoIdentityProviderClient({})
  const command = new AdminDeleteUserCommand({
    UserPoolId: process.env['USER_POOL_ID'],
    Username: username
  })

  await client.send(command)
}
