export interface User {
  fields: {
    created_date: Date;
    published_date: Date;
    login: string;
    password: string;
  };

  model: string;
  pk: number;
}