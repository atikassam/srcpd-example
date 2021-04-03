import { drive } from "./srpc.d/rpc.server.bundle";
import {DriveFileImpl} from "./impls/DriveFileImpl";
import {DriveServiceImpl} from "./impls/DriveServiceImpl";
import {AuthServiceImpl} from "./impls/AuthServiceImpl";
import {SecureClassImpl} from "./impls/SecureClassImpl";
// import * as express from 'express';

const classes  = {
  'drive.AuthService': AuthServiceImpl, //typeof drive.AuthService,
  'drive.SecureClass': SecureClassImpl, //typeof drive.SecureClass,
  'drive.DriveFile': DriveFileImpl, // typeof drive.DriveFile,
  'drive.DriveService': DriveServiceImpl, //typeof drive.DriveService,
};
const errHandler = async e => {
  console.log(e)
  return {
    code: 500,
    message: 'mmm',
    error: []
  }
}

const drive_service = new drive.DriveServiceSrpc(classes);
drive_service.setErrorHandler(errHandler)
drive_service.createServer({ enable_cors: true })
  .listen(9000);

const auth_service = new drive.AuthServiceSrpc(classes);
auth_service.setErrorHandler(errHandler);
auth_service.createServer({ enable_cors: true })
  .listen(9001);

// const app = express()
//
// app.use('/drive', drive_service.useExpressHandler)
// app.use('/auth', auth_service.useKoaHandler)
// app.listen(9003)
