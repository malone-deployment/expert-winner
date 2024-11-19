import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
      extra: {
        socketPath: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
      },
      port: 5432,
      username: process.env.DB_USER || 'wifi',
      password: process.env.DB_PASS || '9DPx*:O=S3rDL.:l',
      database: process.env.DB_NAME || 'wifi',
      entities: [WifiEntity],
      synchronize: true,
    }),
    WifiModule,
  ],
})
export class AppModule {}
