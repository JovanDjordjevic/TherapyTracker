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
  showTherapyForm: boolean = false;
  showTherapyInfo: boolean = false;

  @Input() therapies: Therapy[] = [];
  sub: Subscription = new Subscription;
  therapy: Therapy;
  patient: Patient;

  onShowBiopsyForm() {
    this.showTherapyForm = !this.showTherapyForm;
    this.showTherapyInfo = false;
  }

  onNewTherapyAdded(message: string) {
    this.sub = this.therapyService.getAllTherapiesForPatient(this.patient._id, 1).subscribe((therapies: Therapy[]) => {
      this.therapies = therapies;
      console.log("all therapies for patient: ", this.therapies);
    });
  }

  constructor(private therapyService: TherapyService, private patientService: PatientService) {
    this.therapy = new Therapy(new Date, 0, TherapyType.AC, false, 0, 0, "test", "test");
    this.patient = this.patientService.getCurrentPatient();
  }

  onTherapySelected(value: any) {
    this.therapy = value;
    this.showTherapyForm = false;
    this.showTherapyInfo = true;
  }

  ngOnInit(): void { }
}
