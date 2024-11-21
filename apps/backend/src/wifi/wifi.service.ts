import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as QRCode from 'qrcode';

import { WifiEntity } from './wifi.entity';
import { getMinutes, minutesByToken, Token } from './wifi.type';

type TokenId = string;

@Injectable()
export class WifiService {
  constructor(
    @InjectRepository(WifiEntity)
    private wifiRepository: Repository<WifiEntity>,
  ) {}

  async generateQR(text: string) {
    try {
      const result = await QRCode.toDataURL(text);
      //   console.log({ result });
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //   async getToken(minuteByToken: Token): Promise<Buffer> {
  async getToken(
    minuteByToken: Token,
  ): Promise<{ qrCode: string; url: string }> {
    const currentTimestamp = Date.now();
    const id = crypto.randomUUID();
    const wifiEntity = new WifiEntity();

    if (minutesByToken.hasOwnProperty(minuteByToken)) {
      wifiEntity.tokenId = id;
      wifiEntity.minuteCredits = getMinutes(minuteByToken);
      wifiEntity.date = null;

      try {
        // const baseUrl = 'http://localhost:5173';
        const baseUrl =
          'https://web-service-422041495987.asia-southeast1.run.app/wifi';
        // const baseUrl = 'http://192.168.100.57:5173';
        // console.log({ baseUrl });
        const timeoutRedirectUrl = new URL(
          `/timeoutPage?minuteByToken=${id}`,
          baseUrl,
        );
        // console.log({ timeoutRedirectUrl });
        const qrCode = await this.generateQR(String(timeoutRedirectUrl));
        // console.log({ qrCode });
        await this.wifiRepository.save(wifiEntity);
        return {
          qrCode,
          url: String(timeoutRedirectUrl),
        };
        // return wifiEntity;
      } catch (error) {
        console.error('Error saving WifiEntity:', error);
        throw new Error('Failed to save token information');
      }
    } else {
      throw new Error(`Token does not exist in enum: ${minuteByToken}`);
    }
  }

  async setStartSession(tokenId: string): Promise<WifiEntity> {
    const wifiEntity = await this.wifiRepository.findOne({
      where: { tokenId },
    });
    if (wifiEntity.date !== null) return wifiEntity;
    const startDate = Date.now();
    wifiEntity.date = String(startDate);
    try {
      await this.wifiRepository.save(wifiEntity);
      return wifiEntity;
    } catch (error) {
      console.error('Error saving WifiEntity:', error);
      throw new Error('Failed to save token information');
    }
  }
}
