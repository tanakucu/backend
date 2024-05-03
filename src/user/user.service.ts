import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/entities/user';
import { TableEntity } from 'src/entities/table';
import { TableDto } from 'src/dtos/table.dto';
import { HistoryLog } from 'src/entities/history-logs'; 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository : Repository<UsersEntity>,
    @InjectRepository(TableEntity)
    private tableRepository : Repository<TableEntity>,
    @InjectRepository(HistoryLog)
    private historyLogRepository: Repository<HistoryLog>
  ){
  }
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
async logHistoryAction(action: string, tableId: number, userId: string, details?: any): Promise<void> {
  console.log(`Logging history action: ${action}, Table ID: ${tableId}, User ID: ${userId}`);
  const logEntry = new HistoryLog();
  logEntry.action = action;
  logEntry.user_id = userId;
  await this.historyLogRepository.save(logEntry);
  console.log(`History action logged successfully.`);
}

async getUserHistoryLog(username: string): Promise<HistoryLog[]> {
  try {
    return this.historyLogRepository.find({ where: { user_id: username } });
  } catch (error) {
    console.error('Error fetching user history log:', error);
    return null;
  }
}

  async insertTable(payload : TableDto): Promise<boolean> {
    var response = false;

    try{
      if(payload){
        const object = new TableEntity();
        object.date = payload.date;
        object.owner = payload.owner;
        object.department = payload.department;
        object.complain = payload.complain;
        object.barcode = payload.barcode;
        object.type = payload.type;
        object.model = payload.model;
        object.serviceTag = payload.serviceTag;
        object.storage = payload.storage;
        object.ram = payload.ram;
        object.cpu = payload.cpu;
        object.mac = payload.mac;
        object.os = payload.os;
        object.pcName = payload.pcName;
        object.powerSupply = payload.powerSupply;
        object.user = payload.user;
        object.operation = payload.operation;
        object.description = payload.description;
        object.demand = payload.demand;
        
        const savedObject = await this.tableRepository.save(object);
        
        if(savedObject.id > 0) response = true;
      }
    }
    catch(err){
      return response;
    }
  
    return response;
  }
  async getTable(): Promise<TableEntity[]> {
  return this.tableRepository.find({ where: { deletedAt: null } });
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
    const entryToDelete = await this.tableRepository.findOne({where: { id },});
    if (!entryToDelete) {
      return false;
    }
    entryToDelete.deletedAt = new Date();
    entryToDelete.deletedBy = deletedBy;
    await this.tableRepository.save(entryToDelete);
    await this.logHistoryAction('delete', id, deletedBy, {});
    return true;
  } catch (error) {
    console.error('Error soft deleting table entry:', error);
    return false;
  }
}

async updateTable(id: number, payload: TableDto, updatedBy: string): Promise<boolean> {
  try {
    const existingEntry = await this.tableRepository.findOne({where: { id },});
    if (!existingEntry) {
      console.log('No existing entry found for ID:', id);
      return false;
    }
    this.tableRepository.merge(existingEntry, payload);
    existingEntry.updatedAt = new Date(); 
    existingEntry.updatedBy = updatedBy;
    await this.tableRepository.save(existingEntry);
    await this.logHistoryAction('update', id, updatedBy, payload);
    return true;
  } catch (error) {
    console.error('Error updating table entry:', error);
    return false;
  }
}
  
}