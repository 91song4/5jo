import {
  ConnectedSocket,
  // ConnectedSocket,
  // MessageBody,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { string } from 'joi';
import { Server, Socket } from 'socket.io';

interface ExtendedSocket extends Socket {
  day: string;
}

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
  namespace: '/reserve',
})
export class ReserveGateway {
  @WebSocketServer()
  server: Server;
  private userCount = {};

  handleConnection(@ConnectedSocket() socket: ExtendedSocket) {
    socket.day = socket.handshake.query.day as string;

    if (Object.keys(this.userCount).includes(socket.day) === false) {
      this.userCount[socket.day] = 0;
    }

    this.userCount[socket.day] += 1;

    this.server.emit(socket.day, this.userCount[socket.day]);
  }

  handleDisconnect(@ConnectedSocket() socket: ExtendedSocket) {
    this.userCount[socket.day] -= 1;

    this.server.emit(socket.day, this.userCount[socket.day]);
  }

  // @SubscribeMessage('message')
  // async handleMessage(@MessageBody() data, @ConnectedSocket() socket: Socket) {}
}
