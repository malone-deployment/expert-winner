import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DATABASE'),
        entities: [WifiEntity],
        synchronize: true,
      }),
    }),
    WifiModule,
  ],
})
export class AppModule {}

// @Module({
//     imports: [
//       TypeOrmModule.forRoot({
//         type: 'postgres',
//         host: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
//         port: 5432,
//         username: 'postgres',
//         database: 'postgres',
//         password: '9DPx*:O=S3rDL.:l',
//         entities: [WifiEntity],
//         synchronize: true,
//       }),
//       WifiModule,
//     ],
//   })
//   export class AppModule {}
