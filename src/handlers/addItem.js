async function addItem(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Nick Wang" }),
  };
}

export const handler = addItem;
