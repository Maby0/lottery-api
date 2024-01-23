import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

interface LotteryWinnerEmail {
  winnerEmail: string
}

export const handler = async (input: LotteryWinnerEmail) => {
  const subject = 'Big Congrats'
  const message = 'Congratulations! You have won the lottery!'

  const client = new SESClient({})
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [input.winnerEmail]
    },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Text: {
          Data: message
        }
      }
    },
    // throw away email
    // best practice is store in secrets manager or SSM
    Source: 'mabyo.dev@gmail.com'
  })

  const result = await client.send(command)
}
