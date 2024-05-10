import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
export declare class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private readonly config;
    private readonly logging;
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
