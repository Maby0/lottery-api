import {
  AttributeType,
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
  if (!lotteryWinner.Attributes?.length) {
    throw Error('No attributes found associated with user')
  }
  const winnerEmailAddress = getEmailAddress(lotteryWinner.Attributes)

  console.log('The lottery winner is: ', lotteryWinner.Username)
  return {
    userId: lotteryWinner.Username,
    userStatus: lotteryWinner.UserStatus,
    userEmail: winnerEmailAddress
  }
}

const pickRandomUserFromArray = (arrayOfUsers: UserType[]) => {
  return arrayOfUsers[Math.floor(Math.random() * arrayOfUsers.length)]
}

const getEmailAddress = (listOfAttributes: AttributeType[]) => {
  return listOfAttributes.find((att) => att.Name === 'email')?.Value
}
