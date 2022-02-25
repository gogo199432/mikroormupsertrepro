import { Module, OnModuleInit, Logger, CacheInterceptor, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { BookingModule } from './booking/booking.module';
import { AppService } from './app.service';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useFactory: async () => config,
    }),
    WinstonModule.forRootAsync({
      useFactory: () => ({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
          winston.format.json(),
        ),
        transports: [
          new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            zippedArchive: true,
            maxFiles: 5,
            tailable: true,
            maxsize: 1000000,
          }),
          new winston.transports.File({
            filename: path.join('logs', 'all.log'),
            zippedArchive: true,
            maxFiles: 5,
            tailable: true,
            maxsize: 1000000,
          }),
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
        ],
      }),
    }),
    BookingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    // await this.orm.getMigrator().up();
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
