import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValdidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: configValdidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        database: configService.get('PG_DATABASE'),
        password: configService.get('PG_PASSWORD'),
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
