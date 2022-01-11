import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { CommonService } from 'src/app/services/common.service';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['../../../styles/tab.css'],
})
export class PatientTabComponent implements OnInit, OnDestroy {
  patient: Patient;
  sub: Subscription = new Subscription();

  switch_expression = "patientInfo";
  patientFormUsedForUpdating: boolean = false;
  clinicalStateFormUsedForUpdating: boolean = false;

  // kada se ovo desi, ostali tabovi moraju da ponovo dohvate current patienta iz patient servisa
  @Output() patientHasBeenUpdated = new EventEmitter<void>();
  
  constructor(private patientService: PatientService, private commonService : CommonService) {
    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  );
    this.patient = this.patientService.getCurrentPatient();
  }

  onClinicalStateUpdated() {
    this.backToPatient();
  }

  confirmDeletion() {
    if (confirm("Da li ste sigurni da zelite da izbrisete pacijenta?")) {
      this.sub = this.patientService.deletePatientFromDB(this.patient._id).subscribe(() => {
        this.commonService.sideBarItemClicked.emit('patients');
      });
    }
    else {
      //console.log('no')
    }
  }

  onClickUpdateClinicalState() {
    if (this.patient.isClinicalStateSet) {
      this.clinicalStateFormUsedForUpdating = true;
    }
    this.switch_expression = 'clinicalStateForm';
  }

  onClickUpdatePatientInfo() {
    //console.log('onClickUpdateTherapyInfo')
    this.patientFormUsedForUpdating = true;
    this.switch_expression = "patientFormForUpdate";
  }

  onPatientUpdated() {
    this.patient = this.patientService.getCurrentPatient();
    this.switch_expression = "patientInfo";
    this.patientFormUsedForUpdating = false;
    this.patientHasBeenUpdated.emit();
  }

  backToPatient() {
    this.switch_expression = 'patientInfo'
    this.patientFormUsedForUpdating = false;
    this.clinicalStateFormUsedForUpdating = false;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
