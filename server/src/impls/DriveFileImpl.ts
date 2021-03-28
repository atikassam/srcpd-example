import { File } from '../srpc.d/rpc.server.bundle'
export class FileImpl extends File {
  rename(name: string): Promise<boolean> {
    return Promise.resolve(false);
  }
  remove(): Promise<boolean> {
    return Promise.resolve(false);
  }
  move(source: string, dest: string): Promise<boolean> {
    return Promise.resolve(false);
  }
  files(): Promise<File[]> {
    return Promise.resolve(new Array(10000).fill(9).map((m, i) => new FileImpl({
        name: 'org-' + i,
        directory: false
      }))
    );
  }
}