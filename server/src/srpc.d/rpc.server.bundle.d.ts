/// <reference types="node" />
import * as protobufjs from 'protobufjs';
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
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
export declare type RpcErrorHandler = (e: any) => Promise<{
    code: number;
    message: string;
    error: any;
}>;
declare class SrpcServer<SrpcClasses> {
    private implementations;
    private options?;
    private _map?;
    private _root?;
    private errorHandler?;
    private get map();
    private get root();
    constructor(implementations: SrpcClasses);
    setErrorHandler(fnc: RpcErrorHandler): void;
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
interface SrpcClasses {
    'drive.AuthService': typeof drive.AuthService;
    'drive.SecureClass': typeof drive.SecureClass;
    'drive.DriveFile': typeof drive.DriveFile;
    'drive.DriveService': typeof drive.DriveService;
}
export declare namespace io.srpcd.types {
    interface EmptyClassData {
    }
}
export declare namespace drive {
    interface User {
        name: string;
        email: string;
    }
    interface AccessToken {
        jwt: string;
    }
    abstract class AuthService {
        protected getCtx(): any;
        private $___class_state;
        constructor(data: io.srpcd.types.EmptyClassData);
        getData(): io.srpcd.types.EmptyClassData;
        updateData(data: Partial<io.srpcd.types.EmptyClassData>): void;
        abstract remove(): Promise<boolean>;
        abstract register(user: drive.User, password: string): Promise<drive.User>;
        abstract login(username: string, password: string): Promise<drive.AccessToken>;
        abstract forgotPassword(username: string): Promise<boolean>;
        abstract resetPassword(username: string, password: string, otp: string): Promise<drive.User>;
        abstract verify(username: string, otp: string): Promise<drive.User>;
        abstract isValidSession(access: drive.AccessToken): Promise<boolean>;
        abstract refreshSession(access: drive.AccessToken): Promise<drive.AccessToken>;
    }
    class AuthServiceSrpc extends SrpcServer<SrpcClasses> {
        constructor(classes: SrpcClasses);
    }
    abstract class SecureClass {
        protected ctx: RpcProcessCtx;
        constructor(ctx: RpcProcessCtx);
        abstract intercept(): Promise<any>;
    }
    interface DriveFileDetails {
        id: string;
        name: string;
        path: string;
        directory: boolean;
        size: number;
    }
    abstract class DriveFile {
        protected getCtx(): any;
        private $___class_state;
        constructor(data: drive.DriveFileDetails);
        getData(): DriveFileDetails;
        updateData(data: Partial<drive.DriveFileDetails>): void;
        abstract rename(name: string): Promise<boolean>;
        abstract move(dest: string): Promise<boolean>;
        abstract path(): Promise<string>;
        abstract remove(): Promise<boolean>;
        abstract files(): Promise<drive.DriveFile[]>;
        abstract getFilename(): Promise<string>;
    }
    abstract class DriveService {
        protected getCtx(): any;
        private $___class_state;
        constructor(data: io.srpcd.types.EmptyClassData);
        getData(): io.srpcd.types.EmptyClassData;
        updateData(data: Partial<io.srpcd.types.EmptyClassData>): void;
        abstract rootFolder(): Promise<drive.DriveFile>;
        abstract getDetails(): Promise<drive.DriveFileDetails[]>;
    }
    class DriveServiceSrpc extends SrpcServer<SrpcClasses> {
        constructor(classes: SrpcClasses);
    }
}
export {};
