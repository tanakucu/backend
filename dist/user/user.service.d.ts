import { Repository } from 'typeorm';
import { UsersEntity } from 'src/entities/user';
import { TableEntity } from 'src/entities/table';
import { TableDto } from 'src/dtos/table.dto';
import { HistoryLog } from 'src/entities/history-logs';
export declare class UserService {
    private userRepository;
    private tableRepository;
    private historyLogRepository;
    constructor(userRepository: Repository<UsersEntity>, tableRepository: Repository<TableEntity>, historyLogRepository: Repository<HistoryLog>);
    loginService(username: string, password: string): Promise<UsersEntity | null>;
    logHistoryAction(action: string, tableId: number, userId: string, details?: any): Promise<void>;
    getUserHistoryLog(username: string): Promise<HistoryLog[]>;
    insertTable(payload: TableDto): Promise<boolean>;
    getTable(): Promise<TableEntity[]>;
    getHistoryLog(): Promise<HistoryLog[]>;
    deleteTable(id: number, deletedBy: string): Promise<boolean>;
    updateTable(id: number, payload: TableDto, updatedBy: string): Promise<boolean>;
}
