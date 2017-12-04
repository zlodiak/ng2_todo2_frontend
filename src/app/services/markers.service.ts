import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class MarkersService {

  constructor(private http: HttpClient) { };

  getMarkers(todoId): Observable<any> {
    let req = 'http://127.0.0.1:8000/app_todo2/get_markers?todo_id=' + todoId;
  	return this.http.get(req);
  };  

  createMarker(todoId, lat, lng): Observable<any> {
    let req = 'http://127.0.0.1:8000/app_todo2/create_marker?todo_id=' + todoId +'&lat=' + lat + '&lng=' + lng;
  	return this.http.get(req);
  };  

}
