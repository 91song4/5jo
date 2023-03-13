import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  users = 0;

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} is connected!`);

    ++this.users;
    console.log('connection users: ', this.users);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} is disconnected...`);
    this.server.emit('socketId', this.users);

    --this.users;
    console.log('connection users: ', this.users);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log({ data, client: socket.id });
    this.server.emit('message', data);
  }
}
