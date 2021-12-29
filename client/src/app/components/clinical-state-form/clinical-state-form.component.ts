import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicalStage, MStage, NStage, TStage } from 'src/app/models/patient.model';

@Component({
  selector: 'app-clinical-state-form',
  templateUrl: './clinical-state-form.component.html',
  styleUrls: ['./clinical-state-form.component.css']
})
export class ClinicalStateFormComponent implements OnInit {

  clinicalStateForm: FormGroup;
  TStageEnum = TStage;
  NStageEnum = NStage;
  MStageEnum = MStage;
  ClinicalStaegEnum = ClinicalStage;

  TStageEnumKeys : string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.TStageEnumKeys = Object.keys(this.TStageEnum)

    this.clinicalStateForm = this.formBuilder.group({
      tStage: ['', [Validators.required]],
      nStage: ['', [Validators.required]],
      mStage: ['', [Validators.required]],
      tnmStage: ['', [Validators.required]],
      clinicalStage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onClinicalStateFormSubmit() {
    //console.log("onClinicalStateFormSubmit")
  }

  setTnmStage() {
    const t : string = this.clinicalStateForm.get("tStage")?.value;
    const n : string = this.clinicalStateForm.get("nStage")?.value;
    const m : string = this.clinicalStateForm.get("mStage")?.value;
    
    if (t === '' || n === '' || m === '') {
      return;
    }
    else {
      const tnm = 'T' + t + 'N' + n + 'M' + m;
      this.clinicalStateForm.patchValue({tnmStage: tnm})
    }
  }
}
