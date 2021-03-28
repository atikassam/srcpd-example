interface EmptyClassData {
}
declare class RpcServices {
    protected ___client: RpcClient;
    protected ___class_ctors: {};
    constructor(___client: RpcClient);
    _createInstance(class_name: any, state: any): Promise<any>;
}
declare class RpcClient<Service = undefined, ServicesType extends RpcServices = RpcServices> {
    protected url: string;
    protected headers: any;
    protected Services: any;
    protected services: ServicesType;
    private _map?;
    private _root?;
    private get map();
    private get root();
    constructor(url: string, headers: any, Services: any);
    init(): Promise<Service>;
    callMethod(instance: any, class_name: any, method_name: any, args: any): Promise<any>;
    private _decodeResponse;
    private decode;
    private _callMethod;
    private _encodeRequest;
    private _encodeWithType;
    private _getArgumentTypes;
    private _getRequestType;
    private _getReturnType;
    private _getMethodMetadata;
    private _getDataType;
}
export declare class Services extends RpcServices {
    protected ___client: RpcClient;
    constructor(___client: RpcClient);
    authservice: AuthService;
    drivefile: DriveFile;
    driveservice: DriveService;
    ___class_ctors: {
        AuthService: typeof AuthService;
        DriveFile: typeof DriveFile;
        DriveService: typeof DriveService;
    };
}
export interface User {
    name: string;
    email: string;
}
export interface AccessToken {
    jwt: string;
}
export declare class AuthServiceClient extends RpcClient<AuthService, Services> {
    protected url: string;
    protected headers: any;
    constructor(url: string, headers: any);
    init(): Promise<AuthService>;
}
export declare class AuthService {
    private __rpc_client;
    private callMethod;
    private $___class_state;
    getData(): EmptyClassData;
    __updateData(data: Partial<EmptyClassData>): void;
    register(user: User, password: string): Promise<User>;
    login(username: string, password: string): Promise<AccessToken>;
    forgotPassword(username: string): Promise<boolean>;
    resetPassword(username: string, password: string, otp: string): Promise<User>;
    verify(username: string, otp: string): Promise<User>;
    isValidSession(access: AccessToken): Promise<boolean>;
    refreshSession(access: AccessToken): Promise<AccessToken>;
}
export interface DriveFileDetails {
    id: string;
    name: string;
    path: string;
    directory: boolean;
    size: number;
}
export declare class DriveFile {
    private __rpc_client;
    private callMethod;
    private $___class_state;
    getData(): DriveFileDetails;
    __updateData(data: Partial<DriveFileDetails>): void;
    rename(name: string): Promise<boolean>;
    move(dest: string): Promise<boolean>;
    path(): Promise<string>;
    remove(): Promise<boolean>;
    files(): Promise<DriveFile[]>;
}
export declare class DriveServiceClient extends RpcClient<DriveService, Services> {
    protected url: string;
    protected headers: any;
    constructor(url: string, headers: any);
    init(): Promise<DriveService>;
}
export declare class DriveService {
    private __rpc_client;
    private callMethod;
    private $___class_state;
    getData(): EmptyClassData;
    __updateData(data: Partial<EmptyClassData>): void;
    rootFolder(): Promise<DriveFile>;
}
export {};
