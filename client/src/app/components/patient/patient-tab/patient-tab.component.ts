import { formatDate } from '@angular/common';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { Page, tabComponent } from 'src/app/models/enums.model';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { Therapy } from 'src/app/models/therapy.model';
import { Tumor } from 'src/app/models/tumor.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { CommonService } from 'src/app/services/common.service';
import { PatientService } from 'src/app/services/patient-service.service';
import { TherapyService } from 'src/app/services/therapy.service';
import { TumorService } from 'src/app/services/tumor.service';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['../../../styles/tab.css'],
})
export class PatientTabComponent implements OnInit, OnDestroy {
  patient: Patient;
  sub: Subscription = new Subscription();

  tabComponent = tabComponent;
  component = tabComponent.PatientInfo;

  patientFormUsedForUpdating: boolean = false;
  clinicalStateFormUsedForUpdating: boolean = false;

  @Input() lastBiopsyDate: string = "";
  @Input() numberOfBiopsies: number = 0;
  @Input() lastTumorDate: string = "";
  @Input() numberOfTumors: number = 0;
  @Input() lastTherapyDate: string = "";
  @Input() numberOfTherapies: number = 0;

  // kada se ovo desi, ostali tabovi moraju da ponovo dohvate current patienta iz patient servisa
  @Output() patientHasBeenUpdated = new EventEmitter<void>();

  constructor(private patientService: PatientService, private biopsyService: BiopsyService,
    private tumorService: TumorService, private therapyService: TherapyService, private commonService: CommonService) {
    this.patient = this.patientService.getCurrentPatient();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onClinicalStateUpdated() {
    this.backToPatient();
  }

  confirmDeletion() {
    if (confirm("Da li ste sigurni da zelite da izbrisete pacijenta?")) {
      this.sub = this.patientService.deletePatientFromDB(this.patient._id).subscribe(() => {
        this.commonService.sideBarItemClicked.emit(Page.Patients);
      });
    }
    else {
    }
  }

  onClickUpdateClinicalState() {
    if (this.patient.isClinicalStateSet) {
      this.clinicalStateFormUsedForUpdating = true;
    }
    this.component = tabComponent.ClinicalStateForm;
  }

  onClickUpdatePatientInfo() {
    this.patientFormUsedForUpdating = true;
    this.component = tabComponent.Form;
  }

  onPatientUpdated() {
    this.patient = this.patientService.getCurrentPatient();
    this.component = tabComponent.PatientInfo;
    this.patientFormUsedForUpdating = false;
    this.patientHasBeenUpdated.emit();
  }

  backToPatient() {
    this.component = tabComponent.PatientInfo;
    this.patientFormUsedForUpdating = false;
    this.clinicalStateFormUsedForUpdating = false;
  }
}
