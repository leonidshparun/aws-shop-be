import { middyfy } from "@libs/lambda";

const basicAuthorizer = async (event) => {
  const token = event?.headers?.Authorization;

  if (!token) {
    return "Unauthorized!";
  }

  try {
    const encodedCredentials = token.split(" ").pop();
    const buff = Buffer.from(encodedCredentials, "base64");
    const plainCredentials = buff.toString("utf-8").split(":");
    const [username, password] = plainCredentials;

    if (!username || !password) {
      return "Unauthorized!";
    }

    const storedUserPassword = process.env[username];

    const effect =
      !storedUserPassword || storedUserPassword !== password ? "Deny" : "Allow";

    return generatePolicy(encodedCredentials, event.methodArn, effect);
  } catch (e) {
    return `"Unauthorized: ${e.message}`;
  }
};

const generatePolicy = (principalId, resource, effect = "Allow") => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    },
  },
});

export const main = middyfy(basicAuthorizer);
