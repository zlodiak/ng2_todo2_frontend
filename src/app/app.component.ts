import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router'

import { Config } from './config';
import { GlobalVarsService } from './services/global-vars.service';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	private userIdAuthorized: number;
	private author: string;
	private createdDate: string;
	private gitHub: string;

	constructor(private matDialog: MatDialog,
							private router: Router,
							private globalVarsService: GlobalVarsService) 
	{
		this.author = Config.author;
		this.createdDate = Config.createdDate;	
	};

	ngOnInit() {

	}
  
	private logout() {		
		console.log('logout');
		this.globalVarsService.setVar('authorizedPk', undefined);
		this.globalVarsService.setVar('authorizedLogin', undefined);
		this.router.navigate(['/login']);
	};

	private closeSidenav(sidenav) {		
		sidenav.close();
	};	

	private sidenavOpen(sidenav) {
		this.userIdAuthorized = this.globalVarsService.getVar('authorizedPk'); 
		if(this.userIdAuthorized) {
			sidenav.open();
		} else {
      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: { title: 'Error!', message: 'You need to login to open the menu' }
      });			
		}
	};	
  
}
