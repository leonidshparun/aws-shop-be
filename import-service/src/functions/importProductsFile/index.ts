import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "import",
        cors: true,
        response: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        authorizer: {
          name: "basicAuthorizer",
          arn: "${param:basicAuthorizer}",
          identitySource: "method.request.header.Authorization",
          type: "request",
        },
      },
    },
  ],
};
