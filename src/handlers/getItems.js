import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getItems(event, context) {
  const { status } = event.queryStringParameters;

  const params = {
    TableName: process.env.VIDEOS_TABLE_NAME,
    IndexName: "status",
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeValues: {
      ":status": status,
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  };
  let items;

  try {
    const result = await dynamodb.query(params).promise();

    items = result.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
}

export const handler = commonMiddleware(getItems);
