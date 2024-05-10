import { UserService } from './user.service';
import { TableDto } from 'src/dtos/table.dto';
import { TableEntity } from 'src/entities/table';
import { HistoryLog } from 'src/entities/history-logs';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        status: string;
    }>;
    getHistoryLog(username: string): Promise<HistoryLog[]>;
    getTable(): Promise<TableEntity[]>;
    insertTable(payload: TableDto): Promise<{
        message: string;
    }>;
    deleteTable(id: number, username: string): Promise<{
        message: string;
    }>;
    updateTable(id: number, payload: TableDto, username: string): Promise<{
        message: string;
    }>;
}
