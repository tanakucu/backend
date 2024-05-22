import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { LoggerOptions } from "typeorm";
import entities from "src/entities";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  private readonly logging: LoggerOptions = ["prod", "preprod"].includes(
    process.env.NODE_ENV
  )
    ? ["error", "warn"]
    : ["query"];

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.config.get<string>("DB_POSTGRE_HOST"),
      port: this.config.get<number>("DB_POSTGRE_PORT"),
      database: this.config.get<string>("DB_POSTGRE_NAME"),
      username: this.config.get<string>("DB_POSTGRE_USER"),
      password: this.config.get<string>("DB_POSTGRE_PASSWORD"),
      synchronize: false,
      extra: { charset: "utf8" },
      entities,
    };
  }
}
