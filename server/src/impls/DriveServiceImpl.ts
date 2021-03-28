import {DriveService, File} from "../srpc_server/rpc.server.bundle";
import {FileImpl} from "./FileImpl";

export class DriveServiceImpl extends DriveService {
  async rootFolder(): Promise<File> {
    return new FileImpl({
      name: 'root',
      directory: true
    })
  }
}