import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ExtendedSocket extends Socket {
  name: string | string[];
  admin: boolean | boolean[];
}

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
  namespace: '/chat',
  // path: '/chat',
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  private users = {};
  private userCount = 0;

  handleConnection(@ConnectedSocket() socket: ExtendedSocket) {
    socket.name = socket.handshake.query.name;
    socket.admin = socket.handshake.query.admin === 'true' ? true : false;

    console.log(`${socket.name} is connected!`);
    console.log(`COUNT: ${++this.userCount}`);

    this.users[socket.id] = socket.name;

    if (socket.admin) {
      this.server.emit('joinAdmin');
    }

    this.server.emit('joinUsers', this.users, socket.id);
  }

  handleDisconnect(@ConnectedSocket() socket: ExtendedSocket) {
    console.log(`${socket.name} is disconnected...`);
    console.log(`COUNT: ${--this.userCount}`);

    delete this.users[socket.id];

    if (socket.admin) {
      this.server.emit('exitAdmin');
    }
    this.server.emit('exitUsers', { id: socket.id });
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log({ data, client: socket.id });
    this.server.emit('message', data);
  }
}
