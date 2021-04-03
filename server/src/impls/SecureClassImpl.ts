import {verify} from "jsonwebtoken";
import {jwt_secret} from "./AuthServiceImpl";
import {drive} from "../srpc.d/rpc.server.bundle";
import SecureClass = drive.SecureClass;

export class SecureClassImpl extends SecureClass {
  async intercept(): Promise<any> {
    const token = this.ctx.headers.authorization.replace(/bearer/ig, '').trim();

    try {
      this.ctx.user = verify(token, jwt_secret);
    } catch (e) {
      throw e;
    }
  }
}