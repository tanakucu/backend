import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  let port = parseInt(process.env.APP_PORT) || 9100;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.enableCors();
  await app.listen(port);

  console.log(
    "\x1b[41m%s\x1b[0m",
    "TANA  back-end server started on port : " + port + " at " + Date()
  );
}
bootstrap();
