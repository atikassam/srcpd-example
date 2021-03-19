import {SimpleRpcClient} from "./srpc_client/rpc.client.bundle";

const client = new SimpleRpcClient('http://localhost:9090', {})
const services = client.connect();
services.chat.createConversation('kkk').then(console.log);