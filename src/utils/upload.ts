import { NotFoundException } from '@nestjs/common';
import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';
import { finished } from 'stream/promises';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export const uploadFileStream = async (readStream :() => ReadStream, uploadDir : string, filename : string) => {
  const fileName = filename;
  const filePath = join(uploadDir, fileName);
  console.log(`file path: ${filePath}`);
  mkdirSync(uploadDir, { recursive: true });
  const inStream = readStream();
  const outStream = createWriteStream(filePath);
  inStream.pipe(outStream);
  await finished(outStream)
    .then(() => {
      console.log('file uploaded');
    })
    .catch((err) => {
      console.log(err.message);
      throw new NotFoundException(err.message);
    });
    return `${uploadDir}/${fileName}`
};
