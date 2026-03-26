export interface User {
  id: number;
  username: string;
  password: Buffer;
}

export interface ClientSafeUser {
  id: number;
  name: string;
}
