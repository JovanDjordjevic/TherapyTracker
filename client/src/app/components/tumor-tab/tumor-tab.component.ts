import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { Gradus, HER2_FISH_SICH, Tumor } from 'src/app/models/tumor.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { TumorService } from 'src/app/services/tumor.service';
import { TumorFormComponent } from '../tumor-form/tumor-form.component';

@Component({
  selector: 'app-tumor-tab',
  templateUrl: './tumor-tab.component.html',
  styleUrls: ['./tumor-tab.component.css'],
})
export class TumorTabComponent implements OnInit {
  showTumorForm: boolean = false;
  showTumorInfo: boolean = false;
  switch_expression = "patientInfo";
  sub: Subscription = new Subscription;
  @Input() tumors: Tumor[] = [];
  tumor: Tumor;
  patient: Patient;

  onShowTumorForm() {
    this.switch_expression = "tumorForm";
  }

  onTumorSelected(value: any) {
    this.tumor = value;
    this.switch_expression = "tumorInfo";
  }

  onNewTumorAdded(message: string) {
    this.sub = this.tumorService.getAllTumorsForPatient(this.patient._id, 1).subscribe((tumors: Tumor[]) => {
      this.tumors = tumors;
      console.log("all tumors for patient: ", this.tumors);
    });
  }

  constructor(private tumorService: TumorService, private patientService: PatientService) {
    this.patient = this.patientService.getCurrentPatient();
    this.tumor = new Tumor(new Date(), "", "", Gradus.Type1, 0, 0, 0, 0, 0, 0, 0, 0, HER2_FISH_SICH.Negative, 0, "", 0);
  }

  ngOnInit(): void { }
}
