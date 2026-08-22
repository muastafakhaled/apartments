import 'reflect-metadata';
import 'dotenv/config';
import { runSeeders } from 'typeorm-extension';
import dataSource from './data-source';

async function main(): Promise<void> {
  await dataSource.initialize();
  try {
    await runSeeders(dataSource);
  } finally {
    await dataSource.destroy();
  }
}

main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
