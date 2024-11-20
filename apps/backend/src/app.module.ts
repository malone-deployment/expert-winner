import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.INSTANCE_UNIX_SOCKET, // This will pull the socket path from environment variable
      port: 5432,
      extra: {
        socketPath: process.env.INSTANCE_UNIX_SOCKET, // Using the environment variable for socket path
      },
      username: process.env.DB_USER, // Use environment variable for DB user
      database: process.env.DB_NAME, // Use environment variable for DB name
      password: process.env.DB_PASS, // Use environment variable for DB password
      entities: [WifiEntity],
      synchronize: true,
    }),
    WifiModule,
  ],
})
export class AppModule {}
