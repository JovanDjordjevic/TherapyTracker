import { formatDate } from '@angular/common';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
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

  switch_expression = "patientInfo";
  patientFormUsedForUpdating: boolean = false;
  clinicalStateFormUsedForUpdating: boolean = false;

  @Input() lastBiopsyDate : string = "";
  @Input() numberOfBiopsies : number = 0;
  @Input() lastTumorDate : string = "";
  @Input() numberOfTumors : number = 0;
  @Input() lastTherapyDate : string = "";
  @Input() numberOfTherapies : number = 0;

  // kada se ovo desi, ostali tabovi moraju da ponovo dohvate current patienta iz patient servisa
  @Output() patientHasBeenUpdated = new EventEmitter<void>();
  
  constructor(private patientService: PatientService, private biopsyService : BiopsyService, 
              private tumorService : TumorService, private therapyService : TherapyService, private commonService : CommonService) {
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

  ngOnInit(): void { 
    // this.biopsyService.getAllBiopsiesForPatient(this.patient._id, 1, 1).subscribe( (biopsies : Biopsy[]) => {
    //   this.lastBiopsyDate = formatDate(biopsies[0].date, 'dd/MM/yyyy', 'en-US');
    // });
    
    // this.tumorService.getAllTumorsForPatient(this.patient._id, 1, 1).subscribe( (tumors : Tumor[]) => {
    //   this.lastTumorDate = formatDate(tumors[0].date, 'dd/MM/yyyy', 'en-US');
    // });

    // this.therapyService.getAllTherapiesForPatient(this.patient._id, 1, 1).subscribe( (therapies : Therapy[]) => {
    //   this.lastTherapyDate = formatDate(therapies[0].date, 'dd/MM/yyyy', 'en-US');
    // });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
