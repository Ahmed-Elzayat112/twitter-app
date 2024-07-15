import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { enErrors } from 'src/translation/enErrors';
import { arErrors } from 'src/translation/arErrors';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  constructor() {}
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    // const context = gqlHost.getContext();
    // const response = gqlHost.getContext().res;

    const gqlHost = GqlArgumentsHost.create(host);
    const request = gqlHost.getContext().req;

    const lang = request.headers['lang'];
    let errors = lang === 'ar' ? arErrors : enErrors;

    let message = 'Internal server error';
    let status = 500;

    const res = exception.getResponse();
    status = exception.getStatus();
    message = errors[res.message];

    message = typeof res === 'string' ? res : message;

    this.logger.error(`Status: ${status}, Error: ${JSON.stringify(exception)}`);

    // Return a GraphQL-friendly error without exposing the stack trace
    return new ApolloError(message, `${status}`, {
      timestamp: new Date().toISOString(),
      path: request ? request.url : null,
      code: `${status}`,
    });
  }
}
