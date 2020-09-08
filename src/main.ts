import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	await app.listen(process.env.PORT || 3000);
	const logger = new Logger('App');
	logger.log(process.env.PORT || 3000);
}
bootstrap();
