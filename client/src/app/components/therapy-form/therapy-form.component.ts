import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TherapyResponse, TherapyType } from 'src/app/models/therapy.model';

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

  constructor(private formBuilder : FormBuilder) { 
    for (let i = 0; i <= 500; i++) {
      this.numberValues.push(i)
    }

    this.therapyForm = this.formBuilder.group({
      numCycles  : ['', [Validators.required]],
      therapyType  : ['', [Validators.required]],
      usingNeoadjuvant : ['', [Validators.required]],
      numTaxol   : ['', [Validators.required]],
      numTxtr   : ['', [Validators.required]],
      herceptinTherapy   : ['nije primenljivo', [Validators.required]],
      comment   : ['', [Validators.required]],
      therapyResponse : ['', []],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
  }

  onTherapyFormSubmit(){
    //console.log(this.therapyForm)
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
    
    this.herceptinDisabled = !this.herceptinDisabled;
  }
}
