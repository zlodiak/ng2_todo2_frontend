import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { TodosService } from '../../services/todos.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';


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
  private completedTodosCnt: number = 0;
  private userIdAuthorized = this.globalVarsService.getVar('authorizedPk');  
  private modeDisplay: string = 'all';

  constructor(private todosService: TodosService,
  						private globalVarsService: GlobalVarsService,
              private matDialog: MatDialog) { }

  ngOnInit() {
  	this.getTodos();
  }

  private checkModeDisplay(isCompleted): boolean {
    let hidden = false;

    if(this.modeDisplay == 'active' && isCompleted) {
      hidden = true;
    } 

    if(this.modeDisplay == 'completed' && !isCompleted) {
      hidden = true;
    }     

    return hidden;
  };

  private setModeDisplay(mode): void {
    this.modeDisplay = mode;
  };

  private toggleAllChecked(): void {
    this.todosService.updateTodos(this.userIdAuthorized, this.isAllChecked).subscribe(
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
  	this.todosService.getTodos(this.userIdAuthorized).subscribe(
      data => {   
      	// console.log(data);
        this.todos = JSON.parse(data);                 

        this.completedTodosCnt = 0;
        this.todos.forEach((todo) => {          
        	this.checkboxes[todo.pk] = todo.fields.isCompleted;          
          if(!todo.fields.isCompleted) {
            this.completedTodosCnt++;
          }
        });
      }, 
      err => {
        // console.log('err', err)         
      })  	
  };

  private createTodo(): void {
  	let title = this.newTodo;

  	this.todosService.createTodo(this.userIdAuthorized, title).subscribe(
      data => {   
      	// console.log(data);
        let data_ = JSON.parse(data);

      	if(data_.request_status === 0) {
          this.matDialog.open(InfoDialogComponent, {
            width: '300px',
            hasBackdrop: true,
            data: { title: 'Error!', message: data_.error_message }
          });           
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

  private removeTodosCompleted(userId): void {
    this.todosService.removeTodosCompleted(this.userIdAuthorized).subscribe(
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
