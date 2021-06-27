import { PrismaClient } from '@prisma/client';

class Database {
  public static prisma = new PrismaClient();
}

export default Database;
