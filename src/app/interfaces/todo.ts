export interface Todo {
  fields: {
    created_date: Date;
    published_date: Date;
    title: string;
    user_id: string;
    isCompleted: boolean;
  };

  model: string;
  pk: number;	
}
