import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';
import { MarkersService } from '../../services/markers.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

	private originLat: number;
	private originLng: number;	
  private todoId: number;
  private sub: any;	
  private markers: any[] = [];

  constructor(private matDialog: MatDialog,
  						private markersService: MarkersService,
  						private activatedRoute: ActivatedRoute) { };

  ngOnInit() {
  	this.sub = this.activatedRoute.params.subscribe(params => {
       this.todoId = +params['todo_id']; 
       console.log(this.todoId);
       this.initMap();
    });  	
  };

  ngOnDestroy() {
    this.sub.unsubscribe();
  };  

	private renderMarker(lat, lng, title = ''): void {
			console.log('renderMarker', lat);

			let newMarker = {
				title: title,
				lat: lat,
				lng: lng
			};

			this.markers.push(newMarker);	
			console.log('this.markers', this.markers);
	};

	private generateMarker(ev): void {
		this.markersService.createMarker(this.todoId, ev.coords.lat, ev.coords.lng).subscribe(
			(data) => {
				console.log(data);
				this.renderMarker(ev.coords.lat, ev.coords.lng);			
			},
			(err) => {
				console.log('err', err);
			}
		);		
	};

	private initMarkers(): void {
		console.log(this.todoId);
		this.markersService.getMarkers(this.todoId).subscribe(
			(data) => {
				let markers = JSON.parse(data);
				console.log(markers);	

				markers.forEach((m) => {
					console.log('markers', m);
					this.renderMarker(+m.fields.lat, +m.fields.lng, m.fields.desc);	
				});						
			},
			(err) => {
				console.log('err', err);
			}
		);
	};

	private initMap(): void {
		if (!navigator.geolocation) { 
      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: { title: 'Error!', message: 'Geolocation API is not support in this browser' }
      });
		}

		navigator.geolocation.getCurrentPosition((position) => {
			this.originLat = +position.coords.latitude;
			this.originLng = +position.coords.longitude;	
			this.initMarkers();		
		});				
	};  

}
