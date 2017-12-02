import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';

declare var google: any;


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

	private map: any;
	private originLat: number;
	private originLng: number;	

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  	this.initMap();
  }

	private initMap(): void {
		if (!navigator.geolocation) { 
      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: { title: 'Error!', message: 'Geolocation API не поддерживается в вашем браузере' }
      });
		}

		navigator.geolocation.getCurrentPosition((position) => {
			this.originLat = +position.coords.latitude;
			this.originLng = +position.coords.longitude;
			let coords = {lat: this.originLat, lng: this.originLng};

			let mapEl = document.getElementById('map');
			let mapOptions = {
				center: coords,
				zoom: 8
			};
			this.map = new google.maps.Map(mapEl, mapOptions);

			google.maps.event.addListener(this.map, 'click', (e) => {
				console.log(e);
			});				
		});		

	


	};  

}
