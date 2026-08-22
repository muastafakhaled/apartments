import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from '../infrastructure/database/typeorm.config';

/**
 * Owns the throwaway Postgres container shared by every integration spec.
 *
 * The first spec to call {@link PostgresFixture.start} builds the image and runs
 * the real migrations; all later specs reuse the same instance (the suite runs
 * single-worker, in-band). The container itself is reaped by the testcontainers
 * Ryuk sidecar when the Jest process exits, so no global teardown is required.
 *
 * Each spec calls {@link clean} in `beforeEach` to work against an empty schema.
 */
export class PostgresFixture {
  private static instance: Promise<PostgresFixture> | null = null;

  private constructor(
    readonly container: StartedPostgreSqlContainer,
    readonly dataSource: DataSource,
  ) {}

  static start(): Promise<PostgresFixture> {
    return (this.instance ??= this.boot());
  }

  private static async boot(): Promise<PostgresFixture> {
    const container = await new PostgreSqlContainer(
      'postgres:16-alpine',
    ).start();

    // The Nest app (via buildDataSourceOptions) reads connection details from
    // the environment, so point it at the freshly-started container.
    process.env.DB_HOST = container.getHost();
    process.env.DB_PORT = String(container.getPort());
    process.env.DB_USERNAME = container.getUsername();
    process.env.DB_PASSWORD = container.getPassword();
    process.env.DB_DATABASE = container.getDatabase();

    const dataSource = new DataSource(buildDataSourceOptions());
    await dataSource.initialize();
    await dataSource.runMigrations();

    return new PostgresFixture(container, dataSource);
  }

  /** Truncates every table so a spec starts from a known-empty schema. */
  async clean(): Promise<void> {
    const tables = this.dataSource.entityMetadatas
      .map((m) => `"${m.tableName}"`)
      .join(', ');
    await this.dataSource.query(`TRUNCATE ${tables} RESTART IDENTITY CASCADE`);
  }
}
