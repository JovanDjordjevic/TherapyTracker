import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClinicalStage, MStage, NStage, Patient, TStage } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-clinical-state-form',
  templateUrl: './clinical-state-form.component.html',
  styleUrls: ['./clinical-state-form.component.css'],
})
export class ClinicalStateFormComponent implements OnInit {
  @Input() patient : Patient;
  @Input() usedAsUpdateForm : boolean = false;

  @Output() onClinicalStateUpdated = new EventEmitter<void>();

  clinicalStateForm: FormGroup;

  TStageEnum = TStage;
  NStageEnum = NStage;
  MStageEnum = MStage;
  ClinicalStaegEnum = ClinicalStage;

  TStageEnumKeys: string[] = [];
  
  sub: Subscription = new Subscription();
  
  tStageHasErrors : boolean = false;
  nStageHasErrors : boolean = false;
  mStageHasErrors : boolean = false;
  clinicalStageHasErrors : boolean = false;

  tStageErrors : string[] = [];
  nStageErrors : string[] = [];
  mStageErrors : string[] = [];
  clinicalStageErrors : string[] = [];

  constructor(private formBuilder: FormBuilder, private patientService: PatientService) {
    this.TStageEnumKeys = Object.keys(this.TStageEnum);
    this.patient = this.patientService.getCurrentPatient();

    this.clinicalStateForm = this.formBuilder.group({
      tStage: ['', [Validators.required]],
      nStage: ['', [Validators.required]],
      mStage: ['', [Validators.required]],
      tnmStage: ['', []],
      clinicalStage: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    if (this.usedAsUpdateForm) {
      this.clinicalStateForm.patchValue({
        tStage : this.patient.tStage,
        nStage : this.patient.nStage,
        mStage : this.patient.mStage,
        tnmStage : this.patient.tnmStage,
        clinicalStage : this.patient.clinicalStage,
      });
    }
  }

  onClinicalStateFormSubmit() {
    //console.log("onClinicalStateFormSubmit")
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

    // slanje zahteva:
    // console.log(this.clinicalStateForm);
    const data = this.clinicalStateForm.value;

    this.patient.isClinicalStateSet = true;
    this.patient.tStage = data.tStage;
    this.patient.nStage = data.nStage;
    this.patient.mStage = data.mStage;
    this.patient.tnmStage = 'T' + data.tStage + 'N' + data.nStage + 'M' + data.mStage;
    this.patient.clinicalStage = data.clinicalStage;
      
    this.sub = this.patientService.updatePatientInfo(this.patient).subscribe((updatedPatient: Patient) => {
      console.log('updated clinical stage', updatedPatient);
      this.onClinicalStateUpdated.emit();
    });
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
