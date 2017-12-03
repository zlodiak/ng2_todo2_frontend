import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule,
          MatInputModule,
          MatCardModule,
          MatCheckboxModule,
          MatDialogModule,
          MatSidenavModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { MarkersService } from './services/markers.service';
import { UsersService } from './services/users.service';
import { TodosService } from './services/todos.service';
import { GlobalVarsService } from './services/global-vars.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    PageNotFoundComponent,
    LoginComponent,
    InfoDialogComponent
  ],
  imports: [
    MatSidenavModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDT2NO8RgOBPpi3Hph-sjfyE1zyRPAoMnQ'
    })     
  ],
  providers: [
    MarkersService,
    AuthGuardService,
    GlobalVarsService,
    TodosService,
    UsersService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InfoDialogComponent
  ]  
})
export class AppModule { }
