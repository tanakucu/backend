import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { UsersEntity } from 'src/entities/user';
import { TableEntity } from 'src/entities/table';
import { TableDto } from 'src/dtos/table.dto';
import { HistoryLog } from 'src/entities/history-logs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(TableEntity)
    private tableRepository: Repository<TableEntity>,
    @InjectRepository(HistoryLog)
    private historyLogRepository: Repository<HistoryLog>
  ) {}

  async loginService(username: string, password: string): Promise<UsersEntity | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { username, password }
      });
      return user || null;
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }

  async logHistoryAction(action: string, detailId: number, username: string): Promise<void> {
    console.log(`Logging history action: ${action}, Table ID: ${detailId}, Username: ${username}`);
    const logEntry = new HistoryLog();
    logEntry.action = action;
    logEntry.username = username;
    logEntry.detail_id = detailId;
    await this.historyLogRepository.save(logEntry);
    console.log(`History action logged successfully.`);
  }

  async getUserHistoryLog(username: string): Promise<HistoryLog[]> {
    try {
      return this.historyLogRepository.find({ where: { username: username } });
    } catch (error) {
      console.error('Error fetching user history log:', error);
      return null;
    }
  }

  async insertTable(payload: TableDto): Promise<boolean> {
    try {
      const object = new TableEntity();
      Object.assign(object, payload);
      console.log("OBJECT IS", object);
      const savedObject = await this.tableRepository.save(object);
      return savedObject.id > 0;
    } catch (err) {
      console.error('Error inserting table:', err);
      return false;
    }
  }

  async getTable(): Promise<TableEntity[]> {
    const deletionThreshold = new Date('2100-01-01');
    return this.tableRepository.find({
      where: [
        { modifiedDate: null },
        { modifiedDate: null },
        { modifiedDate: LessThan(deletionThreshold) }
      ]
    });
  }

  async getHistoryLog(): Promise<HistoryLog[]> {
    try {
      const historyLogs = await this.historyLogRepository.find();
      return historyLogs;
    } catch (error) {
      console.error('Error fetching history log:', error);
      return null;
    }
  }

  async deleteTable(id: number, deletedBy: string): Promise<boolean> {
    try {
      const entryToDelete = await this.tableRepository.findOne({ where: { id } });
      if (!entryToDelete) {
        console.error('Entry not found.');
        return false;
      }
      entryToDelete.modifiedDate = new Date('2100-01-01');
      await this.tableRepository.save(entryToDelete);

      const logEntry = new HistoryLog();
      logEntry.action = 'delete';
      logEntry.username = deletedBy;
      logEntry.detail_id = id;
      await this.historyLogRepository.save(logEntry);

      return true;
    } catch (error) {
      console.error('Error logging delete action:', error);
      return false;
    }
  }

  async updateTable(id: number, payload: TableDto, updatedBy: string): Promise<boolean> {
    try {
      const existingEntry = await this.tableRepository.findOne({ where: { id } });
      if (!existingEntry) {
        console.error('Entry not found.');
        return false;
      }


      const { createdDate } = existingEntry;
      Object.assign(existingEntry, payload);
      existingEntry.createdDate = createdDate;
      existingEntry.modifiedDate = new Date();

      console.log(existingEntry);
      await this.tableRepository.save(existingEntry);

      const logEntry = new HistoryLog();
      logEntry.action = 'update';
      logEntry.username = updatedBy;
      logEntry.detail_id = id;
      logEntry.createdDate = new Date();
      await this.historyLogRepository.save(logEntry);

      return true;
    } catch (error) {
      console.error('Error updating table entry:', error);
      return false;
    }
  }
}
