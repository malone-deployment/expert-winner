import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi/wifi.entity';
import { WifiModule } from './wifi/wifi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'wifi',
      password: 'wifi',
      database: 'wifi',
      entities: [WifiEntity],
      synchronize: true,
    }),
    WifiModule,
  ],
})
export class AppModule {}
