import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
  UserType
} from '@aws-sdk/client-cognito-identity-provider'

export const handler = async () => {
  const client = new CognitoIdentityProviderClient({})
  const command = new ListUsersCommand({
    UserPoolId: process.env['USER_POOL_ID']
  })

  const listOfAllUsers = await client.send(command)
  if (!listOfAllUsers.Users?.length) {
    throw Error('No users found in User Pool')
  }
  const listOfConfirmedUsers = listOfAllUsers.Users.filter(
    (user) => user.UserStatus === 'CONFIRMED'
  )
  if (!listOfConfirmedUsers.length) {
    throw Error('No confirmed users found in User Pool')
  }

  const lotteryWinner = pickRandomUserFromArray(listOfConfirmedUsers)
  console.log('The lottery winner is: ', lotteryWinner.Username)
  return {
    userId: lotteryWinner.Username,
    userStatus: lotteryWinner.UserStatus,
    userAttributes: lotteryWinner.Attributes
  }
}

const pickRandomUserFromArray = (arrayOfUsers: UserType[]) => {
  return arrayOfUsers[Math.floor(Math.random() * arrayOfUsers.length)]
}
