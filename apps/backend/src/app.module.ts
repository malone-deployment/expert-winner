import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_INSTANCE_UNIX_SOCKET, // Cloud SQL instance connection
      port: parseInt(process.env.POSTGRES_DB_PORT, 10),
      username: process.env.POSTGRES_DB_USER,
      password: process.env.POSTGRES_DB_PASS,
      database: process.env.POSTGRES_DB_NAME,
      entities: [WifiEntity],
      synchronize: true, // Set to false in production for safety
    }),
    WifiModule,
  ],
})
export class AppModule {}

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
//       port: 5432,
//       username: 'postgres',
//       database: 'postgres',
//       password: '9DPx*:O=S3rDL.:l',
//       entities: [WifiEntity],
//       synchronize: true,
//     }),
//     WifiModule,
//   ],
// })
// export class AppModule {}
