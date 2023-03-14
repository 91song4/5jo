import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ExtendedSocket extends Socket {
  namespace: string | string[];
  name: string | string[];
  admin: boolean | boolean[];
}

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  users = 0;

  handleConnection(@ConnectedSocket() socket: ExtendedSocket) {
    console.log('connection users: ', ++this.users);

    ///////////////////////////////////////////

    socket.name = socket.handshake.query.name;
    socket.namespace = socket.handshake.query.namespace;
    socket.admin = socket.handshake.query.admin === 'true' ? true : false;

    console.log(`${socket.name} is connected!`);

    if (socket.namespace === 'chatting' && socket.admin) {
      this.server.emit('joinAdmin');
    }
  }

  handleDisconnect(@ConnectedSocket() socket: ExtendedSocket) {
    console.log(`${socket.id} is disconnected...`);
    console.log('connection users: ', --this.users);

    //////////////////////////////////////////

    // console.log('@@@@@@@@@@@@@@', socket.user);
    if (socket.namespace === 'chatting' && socket.admin) {
      this.server.emit('exitAdmin');
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log({ data, client: socket.id });
    this.server.emit('message', data);
  }
}
