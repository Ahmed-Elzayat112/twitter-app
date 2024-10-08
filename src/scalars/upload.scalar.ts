import { Scalar } from '@nestjs/graphql';
import * as  GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Scalar('Upload')
export class Upload {
  description = 'Upload files';

  parseValue(value) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast) {
    return GraphQLUpload.parseLiteral(ast, ast.value);
  }
}
