import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiEntity } from './wifi.entity';
import { WifiService } from './wifi.service';
import { WifiController } from './wifi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WifiEntity])],
  providers: [WifiService],
  controllers: [WifiController],
})
export class WifiModule {}
