import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('history_logs')
export class HistoryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  action: string;

  @Column()
  created_at: Date;
}
