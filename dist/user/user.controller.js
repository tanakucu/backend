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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const table_dto_1 = require("../dtos/table.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(body) {
        const userEntity = await this.userService.loginService(body.username, body.password);
        if (userEntity) {
            return { status: 'success' };
        }
        else {
            return { status: 'failed' };
        }
    }
    async getHistoryLog(username) {
        if (username === 'admin') {
            return this.userService.getHistoryLog();
        }
        else {
            return this.userService.getUserHistoryLog(username);
        }
    }
    async getTable() {
        return this.userService.getTable();
    }
    async insertTable(payload) {
        var response = {
            message: "failed"
        };
        const res = await this.userService.insertTable(payload);
        if (res === true) {
            response.message = 'success';
        }
        return response;
    }
    async deleteTable(id, username) {
        const response = { message: 'failed' };
        try {
            const result = await this.userService.deleteTable(id, username);
            if (result) {
                await this.userService.logHistoryAction('delete', id, username);
                response.message = 'success';
            }
        }
        catch (error) {
            console.error('Error deleting table entry:', error);
        }
        return response;
    }
    async updateTable(id, payload, username) {
        const response = { message: 'failed' };
        try {
            const result = await this.userService.updateTable(id, payload, username);
            if (result) {
                await this.userService.logHistoryAction('update', id, username, payload);
                response.message = 'success';
            }
        }
        catch (error) {
            console.error('Error updating table entry:', error);
        }
        return response;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('historyLog'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getHistoryLog", null);
__decorate([
    (0, common_1.Get)('getTable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getTable", null);
__decorate([
    (0, common_1.Post)('insertTable'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [table_dto_1.TableDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "insertTable", null);
__decorate([
    (0, common_1.Delete)('deleteTable/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteTable", null);
__decorate([
    (0, common_1.Put)('updateTable/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, table_dto_1.TableDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateTable", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map