import { Token, minutesByToken } from './wifi.type';

import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class WifiTokenDTO {
  constructor(private readonly rawToken: string) {}
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsEnum(minutesByToken)
  token: Token = this.rawToken as Token;
}

export class GenerateQRCodeBodyDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  tokenId: string;
}
