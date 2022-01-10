import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { PatientFormComponent } from './components/patient/patient-form/patient-form.component';
import { BiopsyFormComponent } from './components/biopsy/biopsy-form/biopsy-form.component';
import { TumorFormComponent } from './components/tumor/tumor-form/tumor-form.component';
import { TherapyFormComponent } from './components/treatment/therapy-form/therapy-form.component';
import { PatientInfoComponent } from './components/patient/patient-info/patient-info.component';
import { PatientTabComponent } from './components/patient/patient-tab/patient-tab.component';
import { BiopsyTabComponent } from './components/biopsy/biopsy-tab/biopsy-tab.component';
import { TreatmentTabComponent } from './components/treatment/treatment-tab/treatment-tab.component';
import { TreatmentListComponent } from './components/treatment/treatment-list/treatment-list.component';
import { TumorTabComponent } from './components/tumor/tumor-tab/tumor-tab.component';
import { TumorListComponent } from './components/tumor/tumor-list/tumor-list.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { BiopsyListComponent } from './components/biopsy/biopsy-list/biopsy-list.component';
import { ClinicalStateFormComponent } from './components/patient/clinical-state-form/clinical-state-form.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfFormComponent } from './components/pdf-form/pdf-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    PatientListComponent,
    PatientFormComponent,
    BiopsyFormComponent,
    TumorFormComponent,
    TherapyFormComponent,
    PatientInfoComponent,
    PatientTabComponent,
    BiopsyTabComponent,
    TreatmentTabComponent,
    TumorTabComponent,
    TabsComponent,
    BiopsyListComponent,
    ClinicalStateFormComponent,
    TumorListComponent,
    TreatmentListComponent,
    PdfFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
