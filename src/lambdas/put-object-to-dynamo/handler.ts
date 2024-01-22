import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

interface PutToDynamoInputs {
  tableName: string
  data: Record<string, unknown>
}

export const handler = async (event: PutToDynamoInputs) => {
  const dynamoClient = new DynamoDBClient({})
  const documentClient = DynamoDBDocumentClient.from(dynamoClient)

  const result = await documentClient.send(
    new PutCommand({
      TableName: event.tableName,
      Item: event.data
    })
  )
  return result
}
