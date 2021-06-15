import { Pool } from 'pg';
import AppConfig from './appConfig';

class Database {
  private static pool: Pool = new Pool({
    database: AppConfig.getConfigs().database,
    password: AppConfig.getConfigs().password,
    user: AppConfig.getConfigs().user,
    host: AppConfig.getConfigs().host,
    port: AppConfig.getConfigs().port
  });

  public static getPool = (): Pool => {
    return Database.pool;
  };
}

export default Database;
