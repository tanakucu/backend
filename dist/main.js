"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    let port = parseInt(process.env.APP_PORT) || 9100;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
    app.enableCors();
    await app.listen(port);
    console.log("\x1b[41m%s\x1b[0m", "TANA  back-end server started on port : " + port + " at " + Date());
}
bootstrap();
//# sourceMappingURL=main.js.map