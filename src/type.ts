export interface IUser {
  id: string;
  name: string;
  username: string,
  role: string;
  email: string;
  password: string;
  profile?: string
}

export interface Projet {
  id:         number;
  name:       string;
  callback:   string;
  api_key:    string;
  room:       string;
  user_id:    number;
  created_at: Date;
  updated_at: Date;
}

