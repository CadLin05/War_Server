
export interface Config {
  server: Server;
  database: Database;
}

interface Server {
  host: string;
  port: number;
}

interface Database {
  host: string;
  port: number;
  username: string;
  password: string;
  schema: string;
}
