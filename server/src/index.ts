import {AuthServiceSrpc, DriveServiceSrpc, SecureClass } from "./srpc.d/rpc.server.bundle";
import {DriveFileImpl} from "./impls/DriveFileImpl";
import {DriveServiceImpl} from "./impls/DriveServiceImpl";
import {AuthServiceImpl} from "./impls/AuthServiceImpl";
import {SecureClassImpl} from "./impls/SecureClassImpl";
import * as express from 'express';

const classes = {
  DriveService: DriveServiceImpl,
  AuthService: AuthServiceImpl,
  DriveFile: DriveFileImpl,
  SecureClass: SecureClassImpl
};

const drive_service = new DriveServiceSrpc(classes);
drive_service.createServer({ enable_cors: true })
  .listen(9000);

const auth_service = new AuthServiceSrpc(classes);
auth_service.createServer({ enable_cors: true })
  .listen(9001);

// const app = express()
//
// app.use('/drive', drive_service.useExpressHandler)
// app.use('/auth', auth_service.useExpressHandler)
// app.listen(9003)
