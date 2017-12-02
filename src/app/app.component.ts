import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GlobalVarsService } from './services/global-vars.service';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private matDialog: MatDialog,
							private globalVarsService: GlobalVarsService) {};
  
	private closeSidenav(sidenav) {		
		sidenav.close();
	};	

	private sidenavOpen(sidenav) {
		let userIdAuthorized = this.globalVarsService.getVar('authorizedPk'); 
		if(userIdAuthorized) {
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
