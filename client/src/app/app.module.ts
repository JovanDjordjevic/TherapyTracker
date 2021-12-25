import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';     
import { HttpClientModule } from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { BiopsyFormComponent } from './components/biopsy-form/biopsy-form.component';
import { TumorFormComponent } from './components/tumor-form/tumor-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    PatientListComponent,
    PatientComponent,
    PatientFormComponent,
    BiopsyFormComponent,
    TumorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,         
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
