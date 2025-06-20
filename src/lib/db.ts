export interface IDBSettings {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export const db = (): IDBSettings => {
  const env = process.env.NODE_ENV;

  if (env === "development")
    return {
      host: process.env.DATABASE_HOST!,
      port: parseInt(process.env.DATABASE_PORT!),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
    };
  else
    return {
      host: process.env.DATABASE_HOST!,
      port: parseInt(process.env.DATABASE_PORT!),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
    };
};
