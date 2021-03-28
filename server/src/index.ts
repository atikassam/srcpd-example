import { DriveServiceServer } from "./srpc_server/rpc.server.bundle";
import {DriveServiceImpl} from "./impls/DriveServiceImpl";
import {FileImpl} from "./impls/FileImpl";

const service = new DriveServiceServer({
  File: FileImpl,
  DriveService: DriveServiceImpl
});

service.createServer({ enable_cors: true })
  .listen(9090);