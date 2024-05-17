import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('log_item_collection')
export class HistoryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column()
  detail_id: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  username: string;
}
