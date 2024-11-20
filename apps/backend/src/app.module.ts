import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
      port: 5432,
      username: 'postgres', // Use environment variable for DB user
      database: 'postgres', // Use environment variable for DB name
      password: '9DPx*:O=S3rDL.:l', // Use environment variable for DB password
      entities: [WifiEntity],
      synchronize: true,
    }),
    WifiModule,
  ],
})
export class AppModule {}
