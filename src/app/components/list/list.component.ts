import { Component, OnInit } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { GlobalVarsService } from '../../services/global-vars.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	private newTodo: string = '';
	private todos: any[] = [];
	private checkboxes: Object = {};
  private isAllChecked: boolean = false;

  constructor(private todosService: TodosService,
  						private globalVarsService: GlobalVarsService) { }

  ngOnInit() {
  	this.getTodos();
  }

  private toggleAllChecked(): void {
    let userId = this.globalVarsService.getVar('authorizedPk');   

    this.todosService.updateTodos(userId, this.isAllChecked).subscribe(
      data => {   
        // console.log(data);
        this.getTodos();
      }, 
      err => {
        // console.log('err', err)         
      }        
    );
  };  

  private toggleTodoState(todoId, state): void {
    this.todosService.updateTodo(todoId, state).subscribe(
      data => {   
        // console.log(data);
        this.getTodos();
      }, 
      err => {
        // console.log('err', err)         
      }        
    );
  };  

  private getTodos(): void {
  	let userId = this.globalVarsService.getVar('authorizedPk');

  	// console.log('userId', userId);

  	this.todosService.getTodos(userId).subscribe(
      data => {   
      	// console.log(data);
        this.todos = JSON.parse(data);                 
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
        let data_ = JSON.parse(data);

      	if(data_.request_status === 0) {
      		alert(data_.error_message);
      	}

      	this.getTodos();
        this.newTodo = '';
      }, 
      err => {
        // console.log('err', err)         
      })
  }; 

  private removeTodo(todoId): void {
    this.todosService.removeTodo(todoId).subscribe(
      data => {   
        // console.log(data);
        this.getTodos();
      }, 
      err => {
        // console.log('err', err)         
      }        
    );
  };
}
