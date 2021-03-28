/// <reference types="node" />
import * as protobufjs from 'protobufjs';
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
interface EmptyClassData {
}
export interface SrpcServerOptions {
    enable_cors: boolean;
}
interface RpcProcessCtx {
    rpc_processor: RpcProcessor;
    protocol: 'http';
    headers: any;
    raw: {
        class: string;
        method: string;
        state: protobufjs.Buffer;
        args: protobufjs.Buffer;
    };
    protobuf: protobufjs.Root;
    def_map: any;
    [key: string]: any;
}
declare class RpcProcessor {
    private def_map;
    private root;
    createCtx(_class: any, _method: any, _state: any, _args: any, _opts: {
        headers: any;
    }): RpcProcessCtx;
    use(method: any): void;
    process(...args: any[]): void;
}
declare class SrpcServer<SrpcClasses> {
    private implementations;
    private options?;
    private _map?;
    private _root?;
    private get map();
    private get root();
    constructor(implementations: SrpcClasses);
    private init;
    createServer(options?: {
        enable_cors: boolean;
    }): http.Server;
    useExpressHandler: (req: IncomingMessage, res: ServerResponse) => void;
    useKoaHandler: (ctx: {
        req: IncomingMessage;
        res: ServerResponse;
    }) => void;
    private requestHandler;
    private enableCors;
    protected callMethod(ctx: RpcProcessCtx): Promise<any>;
    private _runInterceptors;
    private _decodeRequest;
    private decode;
    private _callMethod;
    private _encodeResponse;
    private _getArgumentTypes;
    private _getRequestType;
    private _getReturnType;
    private _getMethodMetadata;
    private _getDataType;
}
export interface User {
    name: string;
    email: string;
}
export interface AccessToken {
    jwt: string;
}
export declare abstract class AuthService {
    protected getCtx(): any;
    private $___class_state;
    constructor(data: EmptyClassData);
    getData(): EmptyClassData;
    updateData(data: Partial<EmptyClassData>): void;
    abstract register(user: User, password: string): Promise<User>;
    abstract login(username: string, password: string): Promise<AccessToken>;
    abstract forgotPassword(username: string): Promise<boolean>;
    abstract resetPassword(username: string, password: string, otp: string): Promise<User>;
    abstract verify(username: string, otp: string): Promise<User>;
    abstract isValidSession(access: AccessToken): Promise<boolean>;
    abstract refreshSession(access: AccessToken): Promise<AccessToken>;
}
export declare class AuthServiceSrpc extends SrpcServer<SrpcClasses> {
    constructor(classes: SrpcClasses);
}
export declare abstract class SecureClass {
    protected ctx: RpcProcessCtx;
    constructor(ctx: RpcProcessCtx);
    abstract intercept(): Promise<any>;
}
export interface DriveFileDetails {
    id: string;
    name: string;
    path: string;
    directory: boolean;
    size: number;
}
export declare abstract class DriveFile {
    protected getCtx(): any;
    private $___class_state;
    constructor(data: DriveFileDetails);
    getData(): DriveFileDetails;
    updateData(data: Partial<DriveFileDetails>): void;
    abstract rename(name: string): Promise<boolean>;
    abstract move(dest: string): Promise<boolean>;
    abstract path(): Promise<string>;
    abstract remove(): Promise<boolean>;
    abstract files(): Promise<DriveFile[]>;
}
export declare abstract class DriveService {
    protected getCtx(): any;
    private $___class_state;
    constructor(data: EmptyClassData);
    getData(): EmptyClassData;
    updateData(data: Partial<EmptyClassData>): void;
    abstract rootFolder(): Promise<DriveFile>;
}
export declare class DriveServiceSrpc extends SrpcServer<SrpcClasses> {
    constructor(classes: SrpcClasses);
}
interface SrpcClasses {
    AuthService: typeof AuthService;
    SecureClass: typeof SecureClass;
    DriveFile: typeof DriveFile;
    DriveService: typeof DriveService;
}
export {};
