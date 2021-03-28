import {SecureClass} from '../srpc.d/rpc.server.bundle'
import {decode, verify} from "jsonwebtoken";
import {jwt_secret} from "./AuthServiceImpl";

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