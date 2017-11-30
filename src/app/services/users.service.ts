import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class UsersService {

  constructor(private http: Http) { };

  getUsers(): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_todo2/users_list');

    /*return Observable 
      .interval(1000)
      .flatMap((i) => this.http.get('http://127.0.0.1:8000/users/users_list');  */	
  };

}
