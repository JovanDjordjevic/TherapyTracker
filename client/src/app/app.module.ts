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
import { TherapyFormComponent } from './components/therapy-form/therapy-form.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { PatientTabComponent } from './components/patient-tab/patient-tab.component';
import { BiopsyTabComponent } from './components/biopsy-tab/biopsy-tab.component';
import { TreatmentTabComponent } from './components/treatment-tab/treatment-tab.component';
import { TumorTabComponent } from './components/tumor-tab/tumor-tab.component';

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
    TumorFormComponent,
    TherapyFormComponent,
    PatientInfoComponent,
    PatientTabComponent,
    BiopsyTabComponent,
    TreatmentTabComponent,
    TumorTabComponent
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
