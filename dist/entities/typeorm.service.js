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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const entities_1 = require("./");
let TypeOrmConfigService = class TypeOrmConfigService {
    constructor() {
        this.logging = ["prod", "preprod"].includes(process.env.NODE_ENV)
            ? ["error", "warn"]
            : ["query"];
    }
    createTypeOrmOptions() {
        return {
            type: "postgres",
            host: this.config.get("DB_POSTGRE_HOST"),
            port: this.config.get("DB_POSTGRE_PORT"),
            database: this.config.get("DB_POSTGRE_NAME"),
            username: this.config.get("DB_POSTGRE_USER"),
            password: this.config.get("DB_POSTGRE_PASSWORD"),
            synchronize: false,
            extra: { charset: "utf8" },
            entities: entities_1.default,
        };
    }
};
exports.TypeOrmConfigService = TypeOrmConfigService;
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], TypeOrmConfigService.prototype, "config", void 0);
exports.TypeOrmConfigService = TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)()
], TypeOrmConfigService);
//# sourceMappingURL=typeorm.service.js.map