import { Component, OnInit } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	private newTodo: string = '';
	private todos: Todo[] = [];
	private checkboxes: Object = {};

  constructor(private todosService: TodosService,
  						private globalVarsService: GlobalVarsService) { }

  ngOnInit() {
  	this.getTodos();
  }

  private toggleTodoState(todoId, state): void {
  	// console.log(todoId, state);
  	this.todos.forEach((todo) => {
  		if(todo.pk === todoId) {
  			todo.isChecked = state;
  			this.todosService.updateTodo(todoId, state).subscribe(
		      data => {   
		      	// console.log(data);
		      }, 
		      err => {
		        // console.log('err', err)         
		      }	      
		    );

  			return;
  		}
  	});
  };  

  private getTodos(): void {
  	let userId = this.globalVarsService.getVar('authorizedPk');

  	// console.log('userId', userId);

  	this.todosService.getTodos(userId).subscribe(
      data => {   
      	// console.log(data);
        this.todos = data;                 
        // console.log('this.todos', this.todos);

        this.todos.forEach((todo) => {
        	this.checkboxes[todo.pk] = todo.fields.isCompleted;
        });
      }, 
      err => {
        // console.log('err', err)         
      })  	
  };

  private createTodo(): void {
  	let title = this.newTodo;
  	let userId = this.globalVarsService.getVar('authorizedPk');

  	// console.log(title, userId);

  	this.todosService.createTodo(userId, title).subscribe(
      data => {   
      	// console.log(data);

      	if(data.request_status === 0) {
      		alert(data.error_message);
      	} else if(data.request_status === 1) {
      		alert('todo create');
      	}

      	this.getTodos();
      }, 
      err => {
        // console.log('err', err)         
      })
  }; 
}
