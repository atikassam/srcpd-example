import {SimpleRpcServer} from "./srpc_server/rpc.server.bundle";
import {ChatImpl} from "./impls/ChatImpl";

const rpc = new SimpleRpcServer({
  Chat: ChatImpl
});

rpc.setOptions({
  enable_cors: true
})

rpc.listen(9090);