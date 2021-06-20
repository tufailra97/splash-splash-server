import { IAppConfig } from 'types';

class AppConfig {
  private static port: number = Number(process.env.PORT);
  private static dbPort: number = Number(process.env.DB_PORT);
  private static host: string | null = process.env.DB_HOST || null;
  private static user: string | null = process.env.DB_ROOT_USER || null;
  private static database: string | null = process.env.DB_NAME || null;
  private static jwtSecretKey: string | null =
    process.env.BCRYPT_SALT_ROUNDS || null;
  private static bCryptSaltRounds: number = Number(
    process.env.BCRYPT_SALT_ROUNDS
  );
  private static password: string | null =
    process.env.DB_ROOT_USER_PASSWORD || null;

  public static getConfigs = () =>
    ({
      port: AppConfig.port,
      user: AppConfig.user,
      host: AppConfig.host,
      dbPort: AppConfig.dbPort,
      database: AppConfig.database,
      password: AppConfig.password,
      bCryptSaltRounds: AppConfig.bCryptSaltRounds,
      jwtSecretKey: AppConfig.jwtSecretKey
    } as IAppConfig);

  public static validateConfigs = () => {
    if (isNaN(AppConfig.bCryptSaltRounds)) {
      throw new Error('BCRYPT_SALT_ROUNDS is not defined');
    }

    if (isNaN(AppConfig.dbPort)) {
      throw new Error('PORT is not defined');
    }

    if (!AppConfig.jwtSecretKey || !AppConfig.jwtSecretKey.length) {
      throw new Error('JWT_SECRET_KEY is not defined');
    }

    if (!AppConfig.database || !AppConfig.database.length) {
      throw new Error('DB_NAME is not defined');
    }

    if (!AppConfig.user || !AppConfig.user.length) {
      throw new Error('DB_ROOT_USER is not defined');
    }

    if (!AppConfig.host || !AppConfig.host.length) {
      throw new Error('DB_HOST is not defined');
    }

    if (!AppConfig.password || !AppConfig.password.length) {
      throw new Error('DB_ROOT_USER_PASSWORD is not defined');
    }
  };
}

export default AppConfig;
