import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { CommonService } from 'src/app/services/common.service';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['./patient-tab.component.css'],
})
export class PatientTabComponent implements OnInit , OnDestroy{
  //@Input() patient: Patient;
  patient: Patient;
  showPatientInfo: boolean = true;
  showClinicalStateForm: boolean = false;
  sub : Subscription = new Subscription();

  constructor(private patientService: PatientService, private commonService : CommonService) {
    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  );
    this.patient = this.patientService.getCurrentPatient();
    // Ove ispise sacuvano klinicko stanje ali nece da ga ispise u tabeli
    console.log(this.patient);
    console.log(this.patient.mStage);
  }

  AddClinicalStateInfo() {
    this.showPatientInfo = !this.showPatientInfo;
    this.showClinicalStateForm = !this.showClinicalStateForm;
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
