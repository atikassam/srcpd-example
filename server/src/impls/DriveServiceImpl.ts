import {DriveFileImpl} from "./DriveFileImpl";
import * as path from "path";
import {drive} from "../srpc.d/rpc.server.bundle";
import DriveService = drive.DriveService;
import DriveFileDetails = drive.DriveFileDetails;
import DriveFile = drive.DriveFile;

export class DriveServiceImpl extends DriveService {
  getDetails(): Promise<DriveFileDetails[]> {
    return Promise.resolve(new Array(2000).fill(9).map(() =>({
        id: '',
        name: 'root',
        path: 'sgeyzdfh ggvdu', // path.resolve(__dirname, '_temp'),
        // path: '',
        directory: true,
        size: 0,
      })));
  }

  async rootFolder(): Promise<DriveFile> {
    return new DriveFileImpl({
      id: '',
      name: 'root',
      path: 'yftzg', //path.resolve(__dirname, '_temp'),
      // path: '',
      directory: true,
      size: 0,
    })
  }
}