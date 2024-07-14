import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  constructor(private readonly i18n: I18nService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // const lang = request.headers['accept-language'] || 'en';
    const message = this.i18n.translate(exception.message, {
      lang: I18nContext.current().lang,
    });

    if (response.status && request.url) {
      // Check if it's an HTTP context
      const status = exception.getStatus();

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    } else {
      // Handle GraphQL context
      return {
        statusCode: exception.getStatus(),
        message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
