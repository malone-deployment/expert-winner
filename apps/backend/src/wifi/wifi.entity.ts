import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WifiEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tokenId: string;

  @Column()
  minuteCredits: string;

  @Column({
    nullable: true,
  })
  date: string;
}
