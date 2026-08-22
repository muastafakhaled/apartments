import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SeederOptions } from 'typeorm-extension';
import { entities } from '../../domain';

// fast-glob (used by typeorm-extension for migrations/seeds discovery) treats
// backslashes as escape chars, so Windows __dirname paths must be normalised.
const dir = __dirname.replace(/\\/g, '/');

export function buildDataSourceOptions(): DataSourceOptions & SeederOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_DATABASE ?? 'apartments',
    entities,
    migrations: [dir + '/migrations/*.{ts,js}'],
    seeds: [dir + '/seeds/**/*.seeder{.ts,.js}'],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
  };
}
