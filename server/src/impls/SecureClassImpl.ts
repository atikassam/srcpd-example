import {AccessToken, AuthService, DriveFile, User} from '../srpc.d/rpc.server.bundle'

export class AuthServiceImpl extends AuthService {
  register(user: User, password: string): Promise<User> {
    return Promise.resolve(undefined);
  }
  verify(username: string, otp: string): Promise<User> {
    return Promise.resolve(undefined);
  }
  login(username: string, password: string): Promise<AccessToken> {
    return Promise.resolve(undefined);
  }
  forgotPassword(username: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  resetPassword(username: string, password: string, otp: string): Promise<User> {
    return Promise.resolve(undefined);
  }
  refreshSession(access: AccessToken): Promise<AccessToken> {
    return Promise.resolve(undefined);
  }
  isValidSession(access: AccessToken): Promise<boolean> {
    return Promise.resolve(false);
  }
}