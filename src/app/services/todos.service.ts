import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";


@Injectable()
export class TodosService {

  constructor(private http: HttpClient) { };

  getTodos(userId): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_todo2/get_todos?user_id=' + userId).map(data => JSON.parse(data));
  };

  createTodo(userId, title): Observable<any> {
	  const params = {
	  	'user_id': userId,
	  	'title': title
	  };

	  // const params2 = new HttpParams().set('user_id', userId).set('title', title);
	  
	  // console.log('params', params);
	  // console.log('params2', params2);

  	//return this.http.post('http://127.0.0.1:8000/app_todo2/create_todo', params).map(data => JSON.parse(data));
  	//return this.http.get('http://127.0.0.1:8000/app_todo2/create_todo2', params2).map(data => JSON.parse(data));
  	return this.http.get('http://127.0.0.1:8000/app_todo2/create_todo2?title=' + title + '&user_id=' + userId).map(data => JSON.parse(data));
  };

  updateTodo(todoId, state): Observable<any> {
  	let req = 'http://127.0.0.1:8000/app_todo2/update_todo?todo_id=' + todoId + '&state=' + state  	
  	return this.http.get(req).map(data => JSON.parse(data));
  };

}
