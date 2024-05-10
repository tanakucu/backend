"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("../entities/user");
const table_1 = require("../entities/table");
const history_logs_1 = require("../entities/history-logs");
let UserService = class UserService {
    constructor(userRepository, tableRepository, historyLogRepository) {
        this.userRepository = userRepository;
        this.tableRepository = tableRepository;
        this.historyLogRepository = historyLogRepository;
    }
    async loginService(username, password) {
        try {
            const user = await this.userRepository.findOne({
                where: { username, password }
            });
            return user || null;
        }
        catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    }
    async logHistoryAction(action, tableId, userId, details) {
        console.log(`Logging history action: ${action}, Table ID: ${tableId}, User ID: ${userId}`);
        const logEntry = new history_logs_1.HistoryLog();
        logEntry.action = action;
        logEntry.user_id = userId;
        await this.historyLogRepository.save(logEntry);
        console.log(`History action logged successfully.`);
    }
    async getUserHistoryLog(username) {
        try {
            return this.historyLogRepository.find({ where: { user_id: username } });
        }
        catch (error) {
            console.error('Error fetching user history log:', error);
            return null;
        }
    }
    async insertTable(payload) {
        var response = false;
        try {
            if (payload) {
                const object = new table_1.TableEntity();
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
                if (savedObject.id > 0)
                    response = true;
            }
        }
        catch (err) {
            return response;
        }
        return response;
    }
    async getTable() {
        return this.tableRepository.find({ where: { deletedAt: null } });
    }
    async getHistoryLog() {
        try {
            const historyLogs = await this.historyLogRepository.find();
            return historyLogs;
        }
        catch (error) {
            console.error('Error fetching history log:', error);
            return null;
        }
    }
    async deleteTable(id, deletedBy) {
        try {
            const entryToDelete = await this.tableRepository.findOne({ where: { id }, });
            if (!entryToDelete) {
                return false;
            }
            entryToDelete.deletedAt = new Date();
            entryToDelete.deletedBy = deletedBy;
            await this.tableRepository.save(entryToDelete);
            await this.logHistoryAction('delete', id, deletedBy, {});
            return true;
        }
        catch (error) {
            console.error('Error soft deleting table entry:', error);
            return false;
        }
    }
    async updateTable(id, payload, updatedBy) {
        try {
            const existingEntry = await this.tableRepository.findOne({ where: { id }, });
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
        }
        catch (error) {
            console.error('Error updating table entry:', error);
            return false;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_1.UsersEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(table_1.TableEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(history_logs_1.HistoryLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map