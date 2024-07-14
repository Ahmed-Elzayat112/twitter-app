import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ApolloError } from 'apollo-server-errors';

@Catch(HttpException)
export class HttpExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  constructor(private readonly i18n: I18nService) {}
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message = 'Internal server error';

    message = this.i18n.translate(exception.message, {
      lang: I18nContext.current().lang,
    });

    console.log(message);

    let status = 500;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message;
    }

    this.logger.error(`Status: ${status}, Error: ${JSON.stringify(exception)}`);

    // Return a GraphQL-friendly error without exposing the stack trace
    return new ApolloError(message, `${status}`, {
      timestamp: new Date().toISOString(),
      path: request ? request.url : null,
      code: `${status}`,
    });
  }
}
