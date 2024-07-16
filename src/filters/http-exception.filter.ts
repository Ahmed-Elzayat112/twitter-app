import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { arErrors } from 'src/translation/arErrors';
import { enErrors } from 'src/translation/enErrors';

@Catch()
export class GqlHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GqlHttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const request = context.req;
    const response = context.res;

    // Extract the error message and status
    let message = 'Internal server error';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      message =
        typeof response === 'string'
          ? response
          : (response as any).message || message;
    } else if (exception.message) {
      message = exception.message;
    }

    // Get the language from the request headers
    const lang = request.headers['lang'];
    const errors = lang === 'ar' ? arErrors : enErrors; // Assume arErrors and enErrors are defined elsewhere

    // Translate the error message if applicable
    message = errors[message] || message;

    this.logger.error(`Status: ${status}, Error: ${JSON.stringify(exception)}`);

    // Return a GraphQL-friendly error without exposing the stack trace
    throw new ApolloError(message, `${status}`, {
      timestamp: new Date().toISOString(),
      path: request.url,
      code: `${status}`,
    });
  }
}
