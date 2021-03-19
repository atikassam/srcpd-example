declare class RpcClient<ServicesType = undefined> {
    protected url: string;
    protected headers: any;
    protected Services: any;
    private services;
    constructor(url: string, headers: any, Services: any);
    init(): ServicesType;
    callMethod(class_name: any, method_name: any, args: any[]): Promise<any>;
}
export declare class SimpleRpcClient extends RpcClient<Services> {
    protected url: string;
    protected headers: any;
    constructor(url: string, headers: any);
}
export declare class Services {
    private ___client;
    constructor(___client: RpcClient);
    conversation: Conversation;
    conversation1: Conversation1;
    message: Message;
    chat: Chat;
}
export interface CreateConversationArg {
    userId: string[];
    name: string;
    name_song: string;
    nameSong: string;
}
export declare class Conversation {
    private __rpc_client;
    private callMethod;
    getMessages(): Promise<CreateConversationArg>;
    getMessageCount(): Promise<number>;
    sendMessage(): Promise<CreateConversationArg[]>;
}
export declare class Conversation1 {
    private __rpc_client;
    private callMethod;
    getMessages(): Promise<CreateConversationArg[]>;
    getMessageCount(): Promise<string[]>;
    sendMessage(): Promise<CreateConversationArg>;
}
export declare class Message {
    private __rpc_client;
    private callMethod;
    getMessages(k: string[], name: CreateConversationArg): Promise<CreateConversationArg>;
    getMessageCount(): Promise<number>;
    sendMessage(): Promise<CreateConversationArg>;
}
export declare class Chat {
    private __rpc_client;
    private callMethod;
    deleteConversation(id: string): Promise<string>;
    setName(name: string): Promise<string[]>;
    getConversationById(id: string): Promise<CreateConversationArg[]>;
    getConversations(): Promise<CreateConversationArg>;
    getConversationCount(): Promise<CreateConversationArg>;
    createConversation(userId: string): Promise<CreateConversationArg>;
}
export {};
