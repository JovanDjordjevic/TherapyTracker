import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

  tStageHasErrors : boolean = false;
  nStageHasErrors : boolean = false;
  mStageHasErrors : boolean = false;
  clinicalStageHasErrors : boolean = false;

  tStageErrors : string[] = [];
  nStageErrors : string[] = [];
  mStageErrors : string[] = [];
  clinicalStageErrors : string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.clinicalStateForm = this.formBuilder.group({
      tStage: ['', [Validators.required]],
      nStage: ['', [Validators.required]],
      mStage: ['', [Validators.required]],
      tnmStage: ['', []],
      clinicalStage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onClinicalStateFormSubmit() {
    if (this.clinicalStateForm.invalid) {
      window.alert('Neka polja nemaju validnu vrednost!');
      this.updateTStageErrors();
      this.updateNStageErrors();
      this.updateMStageErrors();
      this.updateClinicalStageErrors();
      return;
    }

    this.tStageHasErrors  = false;
    this.nStageHasErrors = false;
    this.mStageHasErrors = false;
    this.clinicalStageHasErrors = false;

    // TODO: slanje zahteva ovde:
    // console.log(this.clinicalStateForm);
  }

  updateTStageErrors(){
    this.tStageErrors = [];
    const errors : ValidationErrors | undefined | null = this.clinicalStateForm.get('tStage')?.errors;
    if (errors === null || errors === undefined) {
      this.tStageHasErrors = false;
    }
    else {
      this.tStageHasErrors = true;
      if(errors['required']){
        this.tStageErrors.push("TStage mora imati vrednost");
      }
    }
  }

  updateNStageErrors(){
    this.nStageErrors = [];
    const errors : ValidationErrors | undefined | null = this.clinicalStateForm.get('nStage')?.errors;
    if (errors === null || errors === undefined) {
      this.nStageHasErrors = false;
    }
    else {
      this.nStageHasErrors = true;
      if(errors['required']){
        this.nStageErrors.push("NStage mora imati vrednost");
      }
    }
  }

  updateMStageErrors(){
    this.mStageErrors = [];
    const errors : ValidationErrors | undefined | null = this.clinicalStateForm.get('mStage')?.errors;
    if (errors === null || errors === undefined) {
      this.mStageHasErrors = false;
    }
    else {
      this.mStageHasErrors = true;
      if(errors['required']){
        this.mStageErrors.push("MStage mora imati vrednost");
      }
    }
  }

  updateClinicalStageErrors(){
    this.clinicalStageErrors = [];
    const errors : ValidationErrors | undefined | null = this.clinicalStateForm.get('clinicalStage')?.errors;
    if (errors === null || errors === undefined) {
      this.clinicalStageHasErrors = false;
    }
    else {
      this.clinicalStageHasErrors = true;
      if(errors['required']){
        this.clinicalStageErrors.push("Klinicki stadijum mora imati vrednost");
      }
    }
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
