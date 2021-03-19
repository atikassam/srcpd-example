/// <reference types="node" />
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
export interface SrpcServerOptions {
    enable_cors: boolean;
}
declare class SrpcServer<SrpcClasses> {
    private classes;
    private options?;
    constructor(classes: SrpcClasses);
    setOptions(options: SrpcServerOptions): this;
    listen(port: number): http.Server;
    withExpress(req: IncomingMessage, res: ServerResponse): void;
    protected requestHandler(req: IncomingMessage, res: ServerResponse): void;
    private enableCors;
    protected callMethod(class_name: any, method_name: any, data: any): Promise<Uint8Array>;
}
export interface CreateConversationArg {
    userId: string[];
    name: string;
    name_song: string;
    nameSong: string;
}
export declare abstract class ConversationSrpcd {
    abstract getMessages(): Promise<CreateConversationArg>;
    abstract getMessageCount(): Promise<number>;
    abstract sendMessage(): Promise<CreateConversationArg[]>;
}
export declare abstract class Conversation1Srpcd {
    abstract getMessages(): Promise<CreateConversationArg[]>;
    abstract getMessageCount(): Promise<string[]>;
    abstract sendMessage(): Promise<CreateConversationArg>;
}
export declare abstract class MessageSrpcd {
    abstract getMessages(k: string[], name: CreateConversationArg): Promise<CreateConversationArg>;
    abstract getMessageCount(): Promise<number>;
    abstract sendMessage(): Promise<CreateConversationArg>;
}
export declare abstract class ChatSrpcd {
    abstract deleteConversation(id: string): Promise<string>;
    abstract setName(name: string): Promise<string[]>;
    abstract getConversationById(id: string): Promise<CreateConversationArg[]>;
    abstract getConversations(): Promise<CreateConversationArg>;
    abstract getConversationCount(): Promise<CreateConversationArg>;
    abstract createConversation(userId: string): Promise<CreateConversationArg>;
}
interface SrpcClasses {
    Conversation?: typeof ConversationSrpcd;
    Conversation1?: typeof Conversation1Srpcd;
    Message?: typeof MessageSrpcd;
    Chat?: typeof ChatSrpcd;
}
export declare class SimpleRpcServer extends SrpcServer<SrpcClasses> {
    constructor(classes: SrpcClasses);
}
export {};
