import { UsersEntity } from "./user";
import { TableEntity } from "./table";
import { HistoryLog } from "./history-logs";
declare const entities: (typeof UsersEntity | typeof TableEntity | typeof HistoryLog)[];
export default entities;
