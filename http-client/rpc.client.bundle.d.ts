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
    'drive.AuthService': drive.AuthService;
    'drive.DriveFile': drive.DriveFile;
    'drive.DriveService': drive.DriveService;
    ___class_ctors: {
        'drive.AuthService': typeof drive.AuthService;
        'drive.DriveFile': typeof drive.DriveFile;
        'drive.DriveService': typeof drive.DriveService;
    };
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
    class AuthServiceClient extends RpcClient<AuthService, Services> {
        protected url: string;
        protected headers: any;
        constructor(url: string, headers: any);
        init(): Promise<drive.AuthService>;
    }
    class AuthService {
        private __rpc_client;
        private callMethod;
        private $___class_state;
        getData(): io.srpcd.types.EmptyClassData;
        __updateData(data: Partial<io.srpcd.types.EmptyClassData>): void;
        remove(): Promise<boolean>;
        register(user: drive.User, password: string): Promise<drive.User>;
        login(username: string, password: string): Promise<drive.AccessToken>;
        forgotPassword(username: string): Promise<boolean>;
        resetPassword(username: string, password: string, otp: string): Promise<drive.User>;
        verify(username: string, otp: string): Promise<drive.User>;
        isValidSession(access: drive.AccessToken): Promise<boolean>;
        refreshSession(access: drive.AccessToken): Promise<drive.AccessToken>;
    }
    interface DriveFileDetails {
        id: string;
        name: string;
        path: string;
        directory: boolean;
        size: number;
    }
    class DriveFile {
        private __rpc_client;
        private callMethod;
        private $___class_state;
        getData(): drive.DriveFileDetails;
        __updateData(data: Partial<drive.DriveFileDetails>): void;
        rename(name: string): Promise<boolean>;
        move(dest: string): Promise<boolean>;
        path(): Promise<string>;
        remove(): Promise<boolean>;
        files(): Promise<drive.DriveFile[]>;
        getFilename(): Promise<string>;
    }
    class DriveServiceClient extends RpcClient<DriveService, Services> {
        protected url: string;
        protected headers: any;
        constructor(url: string, headers: any);
        init(): Promise<drive.DriveService>;
    }
    class DriveService {
        private __rpc_client;
        private callMethod;
        private $___class_state;
        getData(): io.srpcd.types.EmptyClassData;
        __updateData(data: Partial<io.srpcd.types.EmptyClassData>): void;
        rootFolder(): Promise<drive.DriveFile>;
        getDetails(): Promise<drive.DriveFileDetails[]>;
    }
}
export {};
