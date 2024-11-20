import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.87.160.189', // Use public IP if no environment variable is set
      port: 5432, // Default PostgreSQL port
      username:
        'estavillofretz-developer-rpi-h@rpi-hub-438905.iam.gserviceaccount.com',
      password: '9DPx*:O=S3rDL.:l', // Use environment variable if available
      database: 'postgresql',
      entities: [WifiEntity],
      synchronize: true,
    }),
    WifiModule,
  ],
})
export class AppModule {}
