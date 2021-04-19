import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function addItem(event, context) {
  const { title, link } = event.body;

  const video = {
    id: `video#${uuid()}`,
    status: "OPEN",
    title,
    link,
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.VIDEOS_TABLE_NAME,
        Item: video,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(video),
  };
}

export const handler = commonMiddleware(addItem);
