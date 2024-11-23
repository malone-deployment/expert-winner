import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: parseInt(configService.get('PG_PORT'), 10),
        username: configService.get('PG_USER'),
        database: configService.get('PG_DB'),
        password: configService.get('PG_PASSWORD'),
        entities: [WifiEntity],
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),
    }),
    WifiModule,
  ],
})
export class AppModule {}
