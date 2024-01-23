import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent) => {
  const { userEmail } = JSON.parse(event.body || '{}')
  const dynamoClient = new DynamoDBClient({})
  const documentClient = DynamoDBDocumentClient.from(dynamoClient)

  const result = await documentClient.send(
    new GetCommand({
      TableName: process.env['LOTTERY_WINNERS_TABLE_NAME'],
      Key: { userEmail }
    })
  )

  if (result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: `User ${userEmail} has won the lottery! :D`
      })
    }
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: `User ${userEmail} has not won the lottery :(`
      })
    }
  }
}
