import { ReadStream } from "fs"

export interface IFile {
  filename: string,
  mimetype: string,
  encoding: string,
  createReadStream: () => ReadStream,
}
