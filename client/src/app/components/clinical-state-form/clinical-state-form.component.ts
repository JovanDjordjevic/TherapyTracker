import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ClinicalStage,
  MStage,
  NStage,
  Patient,
  TStage,
} from 'src/app/models/patient.model';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-clinical-state-form',
  templateUrl: './clinical-state-form.component.html',
  styleUrls: ['./clinical-state-form.component.css'],
})
export class ClinicalStateFormComponent implements OnInit {
  clinicalStateForm: FormGroup;
  TStageEnum = TStage;
  NStageEnum = NStage;
  MStageEnum = MStage;
  ClinicalStaegEnum = ClinicalStage;

  TStageEnumKeys: string[] = [];
  patient: Patient;
  sub: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) {
    this.TStageEnumKeys = Object.keys(this.TStageEnum);
    this.patient = this.patientService.getCurrentPatient();
    this.clinicalStateForm = this.formBuilder.group({
      tStage: ['', [Validators.required]],
      nStage: ['', [Validators.required]],
      mStage: ['', [Validators.required]],
      tnmStage: ['', [Validators.required]],
      clinicalStage: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  onClinicalStateFormSubmit() {
    const data = this.clinicalStateForm.value;

    this.patient.isClinicalStateSet = true;
    this.patient.tStage = data.tStage;
    this.patient.nStage = data.nStage;
    this.patient.mStage = data.mStage;
    this.patient.clinicalStage = data.clinicalStage;
    this.patient.tnmStage =
      'T' + data.tStage + 'N' + data.nStage + 'M' + data.mStage;

    this.sub = this.patientService
      .updatePatientInfo(this.patient)
      .subscribe((updatedPatient: Patient) => {
        console.log('updated clinical stage', updatedPatient);
      });
    //console.log("onClinicalStateFormSubmit")
  }

  setTnmStage() {
    const t: string = this.clinicalStateForm.get('tStage')?.value;
    const n: string = this.clinicalStateForm.get('nStage')?.value;
    const m: string = this.clinicalStateForm.get('mStage')?.value;

    if (t === '' || n === '' || m === '') {
      return;
    } else {
      const tnm = 'T' + t + 'N' + n + 'M' + m;
      this.clinicalStateForm.patchValue({ tnmStage: tnm });
    }
  }
}
