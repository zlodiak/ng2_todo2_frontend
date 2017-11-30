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

  private getAllUsersData(): void {
  	this.usersService.getUsers().subscribe(
      data => {   
        //console.log(data);  
        this.allUsersData = JSON.parse(data.json());                 
        console.log(this.allUsersData);
      }, 
      err => {
        console.log('err')         
      })

  };   

}
