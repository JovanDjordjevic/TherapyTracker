import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TherapyResponse, TherapyType } from 'src/app/models/therapy.model';
import { MustBeNumber } from 'src/app/validators/common.validator';
import { HerceptinTherapyValidator } from 'src/app/validators/therapy.validator';

declare const $: any;

@Component({
  selector: 'app-therapy-form',
  templateUrl: './therapy-form.component.html',
  styleUrls: ['./therapy-form.component.css']
})
export class TherapyFormComponent implements OnInit {

  therapyForm : FormGroup;
  TherapyTypeEnum = TherapyType;
  TherapyResponseEnum = TherapyResponse;

  // nigde nije naglaseno koliko moze da bude kolicine kog leka, recimo 500
  numberValues : number[] = []

  herceptinDisabled : boolean = true

  // deo za terapijski odgovor ne treba da bude dostupan prilikom unosa terapije u bazu, nego samo ako se terapija edituje
  // iz kartona
  placeholder : boolean = false;  // samo za testiranje

  numCyclesHasErrors : boolean = false;
  therapyTypeHasErrors : boolean = false;
  numTaxolHasErrors : boolean = false;
  numTxtrHasErrors : boolean = false;
  herceptinTherapyHasErrors : boolean = false;

  numCyclesErrors : string[] = [];
  therapyTypeErrors : string[] = [];
  numTaxolErrors : string[] =[];
  numTxtrErrors : string[] = [];
  herceptinTherapyErrors : string[] = [];

  constructor(private formBuilder : FormBuilder) { 
    for (let i = 0; i <= 500; i++) {
      this.numberValues.push(i)
    }

    this.therapyForm = this.formBuilder.group({
      numCycles  : ['', [Validators.required, MustBeNumber]],
      therapyType  : ['', [Validators.required]],
      usingNeoadjuvant : ['', []],                  // ovo ni ne treba izgleda
      numTaxol   : ['', [Validators.required]],
      numTxtr   : ['', [Validators.required]],
      herceptinTherapy : ['nije primenljivo', [Validators.required, HerceptinTherapyValidator]],
      comment   : ['', []],
      therapyResponse : ['', []],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
  }

  onTherapyFormSubmit(){
    if (this.therapyForm.invalid) {
      //window.alert('Neka polja nemaju validnu vrednost!');
      this.updateNumCyclesErrors();
      this.updateTherapyTypeErrors();
      this.updateNumTaxolErrors();
      this.updateNumTxtrErrors();
      this.updateHerceptinTherapyErrors();
      return;
    }

    this.numCyclesHasErrors  = false;
    this.therapyTypeHasErrors = false;
    this.numTaxolHasErrors = false;
    this.numTxtrHasErrors = false;
    this.herceptinTherapyHasErrors  = false;

    // TODO: ovde ide zahtev
    console.log(this.therapyForm)
  }

  updateNumCyclesErrors(){
    this.numCyclesErrors = [];
    const errors : ValidationErrors | undefined | null = this.therapyForm.get('numCycles')?.errors;
    if (errors === null || errors === undefined) {
      this.numCyclesHasErrors = false;
    }
    else {
      this.numCyclesHasErrors = true;
      if(errors['required']){
        this.numCyclesErrors.push("Broj ciklusa mora imati vrednost");
      }
      if(errors['mustBeNumber']){
        this.numCyclesErrors.push(errors['mustBeNumber'].message);
      }
    }
  }

  updateTherapyTypeErrors(){
    this.therapyTypeErrors = [];
    const errors : ValidationErrors | undefined | null = this.therapyForm.get('therapyType')?.errors;
    if (errors === null || errors === undefined) {
      this.therapyTypeHasErrors = false;
    }
    else {
      this.therapyTypeHasErrors = true;
      if(errors['required']){
        this.therapyTypeErrors.push("Tip terapije mora imati vrednost");
      }
    }
  }
  
  updateNumTaxolErrors() {
    this.numTaxolErrors = [];
    const errors : ValidationErrors | undefined | null = this.therapyForm.get('numTaxol')?.errors;
    if (errors === null || errors === undefined) {
      this.numTaxolHasErrors = false;
    }
    else {
      this.numTaxolHasErrors = true;
      if(errors['required']){
        this.numTaxolErrors.push("Doza Taxol-a mora imati vrednost");
      }
    }
  }

  updateNumTxtrErrors() {
    this.numTxtrErrors = [];
    const errors : ValidationErrors | undefined | null = this.therapyForm.get('numTxtr')?.errors;
    if (errors === null || errors === undefined) {
      this.numTxtrHasErrors = false;
    }
    else {
      this.numTxtrHasErrors = true;
      if(errors['required']){
        this.numTxtrErrors.push("Doza TXTR-a mora imati vrednost");
      }
    }
  }

  updateHerceptinTherapyErrors() {
    this.herceptinTherapyErrors = [];
    const errors : ValidationErrors | undefined | null = this.therapyForm.get('herceptinTherapy')?.errors;
    if (errors === null || errors === undefined) {
      this.herceptinTherapyHasErrors = false;
    }
    else {
      this.herceptinTherapyHasErrors = true;
      if(errors['required']){
        this.herceptinTherapyErrors.push("Broj ciklusa terapije herceptinom mora imati vrednost");
      }
      if(errors['herceptinTherapy']){
        this.herceptinTherapyErrors.push(errors['herceptinTherapy'].message);
      }
    }
  }

  onHerceptinCheckboxChange(){
    if (this.herceptinDisabled) { 
      this.therapyForm.patchValue({
        herceptinTherapy : ''
      });
    }
    else {
      this.therapyForm.patchValue({
        herceptinTherapy : 'nije primenljivo'
      });
    }

    this.herceptinTherapyErrors = [];
    this.herceptinTherapyHasErrors = false;
    
    this.herceptinDisabled = !this.herceptinDisabled;
  }
}
