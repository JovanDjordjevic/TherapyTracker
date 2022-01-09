import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { Therapy, TherapyType } from 'src/app/models/therapy.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { TherapyService } from 'src/app/services/therapy.service';

@Component({
  selector: 'app-treatment-tab',
  templateUrl: './treatment-tab.component.html',
  styleUrls: ['./treatment-tab.component.css'],
})
export class TreatmentTabComponent implements OnInit {
  @Input() therapies: Therapy[] = [];
  sub: Subscription = new Subscription;
  switch_expression = "patientInfo";
  counter: number = 2;
  therapy: Therapy;
  patient: Patient;

  therapyFormUsedForUpdating : boolean = false;

  constructor(private therapyService: TherapyService, private patientService: PatientService) {
    this.therapy = new Therapy(new Date, 0, TherapyType.AC, false, 0, 0, "test", "test");
    this.patient = this.patientService.getCurrentPatient();
  }

  onNewTherapyAdded() {
    this.sub = this.therapyService.getAllTherapiesForPatient(this.patient._id, 1).subscribe((therapies: Therapy[]) => {
      this.therapies = therapies;
      console.log("all therapies for patient: ", this.therapies);
    });
    this.switch_expression = "patientInfo";
  }

  onTherapySelected(value: any) {
    this.therapy = value;
    this.switch_expression = "therapyInfo";
  }

  onLoadMoreTherapies(value: string) {
    this.sub = this.therapyService.getAllTherapiesForPatient(this.patient._id, this.counter).subscribe((therapies: Therapy[]) => {
      this.therapies = [...this.therapies, ...therapies];
      this.counter++;
    })
  };

  confirmDeletion() {
    if (confirm("Da li ste sigurni da zelite da izbrisete terapiju?")) {
      this.sub = this.therapyService.deleteTherapyForPatient(this.patient._id, this.therapy._id).subscribe(() => {
        this.onNewTherapyAdded();
      });
      //console.log('yes')
    }
    else {
      //console.log('no')
    }
  }

  onClickUpdateTherapyInfo(){
    //console.log('onClickUpdateTherapyInfo')
    this.therapyFormUsedForUpdating = true;
    this.switch_expression = "therapyForm";
  }

  onTherapyUpdated(){
    this.sub = this.therapyService.getAllTherapiesForPatient(this.patient._id, 1).subscribe((therapies: Therapy[]) => {
      this.therapies = therapies;
      console.log("all therapies for patient: ", this.therapies);
    });
    this.switch_expression = "patientInfo";
    this.therapyFormUsedForUpdating = false;
  }

  ngOnInit(): void { }
}
