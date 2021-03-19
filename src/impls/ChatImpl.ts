import {ChatSrpcd, CreateConversationArg} from "../srpc_server/rpc.server.bundle";

export class ChatImpl extends ChatSrpcd {
  async getConversations(): Promise<CreateConversationArg> {
    return { nameSong: '', name_song: 'dd', name: 'eddw', userId: ['dadqca'] };
  }

  async getConversationCount(): Promise<CreateConversationArg> {
    return { nameSong: '', name_song: 'dd', name: 'eddw', userId: ['dadqca'] };
  }

  async createConversation(userId: string): Promise<CreateConversationArg> {
    return { nameSong: '', name_song: 'dd', name: 'eddw', userId: ['dadqca'] };
  }

  async deleteConversation(id: string): Promise<string> {
    return Promise.resolve("ddd");
  }

  async setName(name: string): Promise<string[]> {
    return ['dd'];
  }

  async getConversationById(id: string): Promise<CreateConversationArg[]> {
    return new Array(2000).fill({ nameSong: 'a', name_song: 'dd', name: 'eddw', userId: ['dadqca'] })
  }
}