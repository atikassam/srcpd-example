import * as uuid from 'uuid'
import * as faker from 'faker'
import {drive} from "../srpc.d/rpc.server.bundle";
import DriveFile = drive.DriveFile;

export class DriveFileImpl extends DriveFile {
  async getFilename() {
    return 'Demo session'
  }

  rename(name: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  path(): Promise<string> {
    return Promise.resolve("");
  }

  remove(): Promise<boolean> {
    return Promise.resolve(false);
  }

  move(dest: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  files(): Promise<DriveFile[]> {
    console.log(this.getCtx().user)
    try {

      return Promise.resolve(new Array(faker.random.number(100) + 1).fill(9).map((m, i) => new DriveFileImpl({
          id: uuid.v4(),
          name: faker.name.findName(),
          path: '',
          directory: false,
          size: i,
        }))
      );
    } catch (e) {
      console.log(e)
    }
  }
}