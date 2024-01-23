# lottery-api

## Objective

Create a serverless application for lottery services using AWS services. Implement user management with AWS Cognito, use DynamoDB as the database resource, and build an event-driven infrastructure using API Gateway, Lambdas, and Step Functions.

## Framework used

AWS SAM [https://aws.amazon.com/serverless/sam/](https://aws.amazon.com/serverless/sam/)

## Endpoints

NOTE: Auth endpoints are not yet secured. Avoid submitting any personal information with your requests.

Path: /auth/signup<br>
Method: POST<br>
Description: Create a user account for lottery participants. Returns an error message if the user already exists.<br>
Request body:

```
{
  "username": "testUser",
  "password": "testPassword1$",
  "email": "test@email.com",
  "givenName": "Test",
  "familyName": "McTester"
}
```

<br>
Path: /auth/confirm<br>
Method: POST<br>
Description: Confirm user registration with the provided confirmation code.<br>
Request body:

```
{
  "username": "testUser",
  "confirmationCode": "123456"
}
```

<br>
Path: /admin/users<br>
Method: GET<br>
Description: Serves a list of users from Cognito with their confirmation status information<br>

<br>
Path: /admin/users/{id}<br>
Method: GET<br>
Description: Serves a user from Cognito based on the given ID<br>

<br>
Path: /admin/users/{id}<br>
Method: PATCH<br>
Description: Executes the AdminUpdateUserStateMachine and returns an execution ID<br>

<br>
Path: /admin/users/{id}<br>
Method: DELETE<br>
Description: Executes the AdminDeleteUserStateMachine<br>

<br>
Path: /admin/lottery<br>
Method: POST<br>
Description: Executes the AdminCreateLotteryStateMachine and returns an execution ID. The winner of the lottery will be sent an email to let them know that they've won.<br>
Request body: empty <br>

<br>
Path: /public/lottery/winner<br>
Method: POST<br>
Description: check if a given email address has won the lottery.<br>
Request body:

```
{
  "userEmail": "test@email.com"
}
```
