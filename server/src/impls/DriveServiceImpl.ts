import {DriveFileImpl} from "./DriveFileImpl";
import {DriveService, DriveFile} from "../srpc.d/rpc.server.bundle";
import * as path from "path";

export class DriveServiceImpl extends DriveService {
  async rootFolder(): Promise<DriveFile> {
    return new DriveFileImpl({
      id: '',
      name: 'root',
      path: path.resolve(__dirname, '_temp'),
      // path: '',
      directory: true,
      size: 0,
    })
  }
}