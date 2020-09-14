import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userID = :userID': only return items with matching 'userID'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userID': defines 'userID' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userID = :userID",
    ExpressionAttributeValues: {
      ":userID": event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});
