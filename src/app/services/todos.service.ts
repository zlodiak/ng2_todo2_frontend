import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//import { HttpParams } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';


@Injectable()
export class TodosService {

  constructor(private http: HttpClient) { };

  getTodos(userId): Observable<any> {
    let req = 'http://127.0.0.1:8000/app_todo2/get_todos?user_id=' + userId;
  	return this.http.get(req);
  };

  createTodo(userId, title): Observable<any> {
	  /*const params = {
	  	'user_id': userId,
	  	'title': title
	  };*/
	  // const params2 = new HttpParams().set('user_id', userId).set('title', title);
	  
	  // console.log('params', params);
	  // console.log('params2', params2);

  	//return this.http.post('http://127.0.0.1:8000/app_todo2/create_todo', params).map(data => JSON.parse(data));
  	//return this.http.get('http://127.0.0.1:8000/app_todo2/create_todo2', params2).map(data => JSON.parse(data));
    let req = 'http://127.0.0.1:8000/app_todo2/create_todo2?title=' + title + '&user_id=' + userId;
  	return this.http.get(req);
  };

  updateTodo(todoId, state): Observable<any> {
    let req = 'http://127.0.0.1:8000/app_todo2/update_todo?todo_id=' + todoId + '&state=' + state    
    return this.http.get(req);
  };

  updateTodos(userId, state): Observable<any> {
    let req = 'http://127.0.0.1:8000/app_todo2/update_todos?user_id=' + userId + '&state=' + state    
    return this.http.get(req);
  };  

  removeTodo(todoId): Observable<any> {
    let req = 'http://127.0.0.1:8000/app_todo2/remove_todo?todo_id=' + todoId  
    return this.http.get(req);
  };  

  removeTodosCompleted(userId): Observable<any> {
    let req = 'http://127.0.0.1:8000/app_todo2/remove_todos_completed?user_id=' + userId   
    return this.http.get(req);
  };   

}
