import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

import { UsersService } from '../../services/users.service';
import { GlobalVarsService } from '../../services/global-vars.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private login: string = '';
  private password: string = '';
	private allUsersData: Object = {};	

  constructor(private usersService: UsersService, 
              private globalVarsService: GlobalVarsService,
              private router: Router) { }

  ngOnInit() {
  	this.getAllUsersData();
  }

  private checkAuth(): void {
  	if(this.login) { this.login = this.login.trim(); }
  	if(this.password) { this.password = this.password.trim(); }

  	if(!this.login || !this.password) {
  		alert('enter auth data');
  		return;
  	}

  	let isAuthOk = false;

    this.allUsersData.forEach((user) => {
    	console.log(user);    	

    	if(user.fields.login == this.login && user.fields.password == this.password) {
    		isAuthOk = true;   		
    	}
    });

    if(isAuthOk) {
      this.globalVarsService.setVar('authorizedLogin', this.login);
      this.router.navigate(['/list']); 
    } else {
      alert('auth failed');
    }
  };

  private getAllUsersData(): void {
  	this.usersService.getUsers().subscribe(
      data => {   
        this.allUsersData = data;                 
        console.log(this.allUsersData, typeof this.allUsersData);
      }, 
      err => {
        console.log('err')         
      })
  };   

}
