import { INestApplicationContext, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { Server, ServerOptions } from 'socket.io'
import { SocketWithAuth } from './types'

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name)
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService
  ) {
    super(app)
  }

  createIOServer(port: number, options?: ServerOptions) {
    const clientPort = parseInt(this.configService.get('CLIENT_PORT'))

        const cors = {
            origin: [
                `http://localhost:${clientPort}`,
                new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
            ],
        };

    this.logger.log('Configuring SocketIO server with custom CORS options', {
      cors
    })

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors
    }

    const jwtService = this.app.get(JwtService)
    const server: Server = super.createIOServer(port, optionsWithCORS)

    // console.log(this.logger);

    server.of('chats').use(this.createTokenMiddleware(jwtService, this.logger))

    return server
  }

    createTokenMiddleware = (jwtService: JwtService, logger: Logger) => async (socket: SocketWithAuth, next) => {
        // for Postman testing support, fallback to token header
        const token = socket.handshake.auth.token || socket.handshake.headers['token'];
    
    
        logger.debug(`Validating auth token before connection: ${token}`);
    
        try {
            const payload = await jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SOCKET_SECRET'),
            });
            socket.user = payload.user;
        next();
        } catch {
            next(new Error('FORBIDDEN'));
        }
    };
}
