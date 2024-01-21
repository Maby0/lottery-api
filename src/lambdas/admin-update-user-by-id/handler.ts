import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient
} from '@aws-sdk/client-cognito-identity-provider'

interface UserUpdateInputs {
  userId: string
  updateField: string
  updateValue: string
}

export const handler = async (input: UserUpdateInputs): Promise<void> => {
  const client = new CognitoIdentityProviderClient({})
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: process.env['USER_POOL_ID'],
    Username: input.userId,
    UserAttributes: [{ Name: input.updateField, Value: input.updateValue }]
  })

  console.log(
    `Updating ${input.updateField} for user ${input.userId} to ${input.updateValue}`
  )
  await client.send(command)
}
