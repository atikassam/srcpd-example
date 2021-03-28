import {DriveFile} from '../srpc.d/rpc.server.bundle'

export class DriveFileImpl extends DriveFile {
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
    return Promise.resolve(new Array(10000).fill(9).map((m, i) => new DriveFileImpl({
        id: i.toString(),
        name: 'org-' + i,
        directory: false,
        size: i,
      }))
    );
  }
}