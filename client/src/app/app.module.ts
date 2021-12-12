import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { PatientTabComponent } from './components/patient-tab/patient-tab.component';
import { BiopsyTabComponent } from './components/biopsy-tab/biopsy-tab.component';
import { TreatmentTabComponent } from './components/treatment-tab/treatment-tab.component';
import { MedicalStateTabComponent } from './components/medical-state-tab/medical-state-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    PatientInfoComponent,
    PatientTabComponent,
    BiopsyTabComponent,
    TreatmentTabComponent,
    MedicalStateTabComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
