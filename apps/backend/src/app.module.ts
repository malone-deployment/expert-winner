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
      extra: {
        socketPath: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
      },
      username:
        'estavillofretz-developer-rpi-h@rpi-hub-438905.iam.gserviceaccount.com',
      database: 'postgres',
      password: '9DPx*:O=S3rDL.:l', // Use environment variable if available
      entities: [WifiEntity],
      synchronize: true,
    }),
    WifiModule,
  ],
})
export class AppModule {}
