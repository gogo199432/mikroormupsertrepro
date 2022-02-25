import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');

const config : Options = {
    type: 'postgresql',
    host: process.env.URL || 'localhost',
    port: (Number(process.env.PORT) || 5432),
    user: 'postgres',
    password: process.env.PASSWORD || 'test',
    dbName: process.env.DATABASE || 'reproDB',
    entities: process.env.NODE_ENV === 'production' ? ['/dist/**/*.entity.js'] :  ['dist/**/*.entity.js'],
    entitiesTs: process.env.NODE_ENV === 'production' ? ['/src/**/*.entity.ts'] : ['src/**/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    migrations:{
        tableName: 'migrations', // name of database table with log of executed transactions
        path: process.env.NODE_ENV === 'production' ? 'dist/migrations' : './migrations', // path to the folder with migrations
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
    },
    debug: process.env.NODE_ENV !== 'production',
    logger: logger.log.bind(logger),
}

export default config