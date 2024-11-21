import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { WifiService } from './wifi.service';
import { Token } from './wifi.type';
import { GenerateQRCodeBodyDTO, WifiTokenDTO } from './wifi.dto';

@Controller('wifi')
export class WifiController {
  constructor(private readonly wifiService: WifiService) {}

  //   @Get(':id')
  //   findOne(@Param('id') id: string): string {
  //     return `This action returns a #${id} cat`;
  //   }

  @Get('fck')
  fck() {
    return 'fck this shit';
  }

  @Put(':id')
  startSession(@Param('id') id: string) {
    console.log({ id });
    return this.wifiService.setStartSession(id);
  }

  @Get()
  getToken(@Query('minuteByToken') token: Token) {
    const wifiToken = new WifiTokenDTO(token);

    return this.wifiService.getToken(wifiToken.token);
  }
}
