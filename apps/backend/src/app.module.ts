import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.87.160.189',
      //   host: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
      port: 5432,
      //   host: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
      //   host: '34.87.160.189',
      //   extra: {
      //     socketPath: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
      //   },
      username:
        'estavillofretz-developer-rpi-h@rpi-hub-438905.iam.gserviceaccount.com',
      password: '9DPx*:O=S3rDL.:l',
      database: 'postgresql',
      entities: [WifiEntity],
      synchronize: true,
    }),
    WifiModule,
  ],
})
export class AppModule {}
