import * as jwt from 'jsonwebtoken';
import {drive} from "../srpc.d/rpc.server.bundle";
import User = drive.User;
import AuthService = drive.AuthService;
import AccessToken = drive.AccessToken;

const users: Map<string, (User & { password: string })> = new Map<string, User & {password: string}>();
export const jwt_secret = 'my_secret';

export class AuthServiceImpl extends AuthService {
  remove(): Promise<boolean> {
    return Promise.resolve(false);
  }

  async register(user: User, password: string): Promise<User> {
    users.set(user.email, { ...user, password });

    return user
  }
  verify(username: string, otp: string): Promise<User> {
    return Promise.resolve(undefined);
  }
  async login(username: string, password: string): Promise<AccessToken> {
    if (!users.has(username)) throw new Error('User not found');

    return {
      jwt: jwt.sign(users.get(username), jwt_secret)
    }
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