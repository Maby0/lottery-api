# lottery-api

## Objective

Create a serverless application for lottery services using AWS services. Implement user management with AWS Cognito, use DynamoDB as the database resource, and build an event-driven infrastructure using API Gateway, Lambdas, and Step Functions.

## Framework used

AWS SAM [https://aws.amazon.com/serverless/sam/](https://aws.amazon.com/serverless/sam/)

## Endpoints

NOTE: Auth endpoints are not yet secured. Avoid submitting any personal information with your requests.

Path: /auth/signup

Method: POST

Description: Create a user account for lottery participants. Returns an error message if the user already exists.

Request body:

```
{
  "username": "testUser",
  "password": "testPassword1$",
  "email": "test@email.com",
  "givenName": "Test",
  "familyName": "McTester"}
```

<br>
Path: /auth/confirm

Method: POST

Description: Confirm user registration with the provided confirmation code.

Request body:

```
{
  "username": "testUser",
  "confirmationCode": "123456"
}
```

<br>
Path: /admin/users

Method: GET

Description: Serves a list of users from Cognito with their confirmation status information

<br>
Path: /admin/users/{id}

Method: GET

Description: Serves a user from Cognito based on the given ID

<br>
Path: /admin/users/{id}

Method: PATCH

Description: Executes the AdminUpdateUserStateMachine and returns an execution ID

<br>
Path: /admin/users/{id}

Method: DELETE

Description: Executes the AdminDeleteUserStateMachine

<br>
Path: /admin/lottery

Method: POST

Description: Executes the AdminCreateLotteryStateMachine and returns an execution ID. The winner of the lottery will be sent an email to let them know that they've won.

Request body: {}

<br>
Path: /public/lottery/winner

Method: POST

Description: check if a given email address has won the lottery.

Request body:

```
{
  { "userEmail": "test@email.com" }
}
```
