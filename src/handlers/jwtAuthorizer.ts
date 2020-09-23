import { APIGatewayRequestAuthorizerEvent, Callback, Context } from 'aws-lambda';
import * as jsonwebtoken from 'jsonwebtoken';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import { IJwt } from '../interfaces/IJwt';

const buildIAMPolicy = (effect: string, principalId: string | number, context?: object) => {
  const buildPolicyDocument = { principalId, context };

  if (context) {
    buildPolicyDocument.context = context;
  }

  return Object.assign(buildPolicyDocument, {
    policyDocument: {
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
  });
};

export const jwtHandler = (event: APIGatewayRequestAuthorizerEvent, _context: Context, callback: Callback) => {
  try {
    const { Authorization } = event.headers;
    const { userId } = jsonwebtoken.verify(Authorization, process.env.JWT_SECRET) as IJwt;
    const response = buildIAMPolicy('Allow', userId);

    callback(null, response);
  } catch (err) {
    throw new UnauthorizedException();
  }
};
