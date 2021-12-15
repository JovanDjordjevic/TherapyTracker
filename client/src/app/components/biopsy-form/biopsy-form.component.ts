import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Biopsy, BiopsyType, BiopsySide, BiopsyHistotype} from 'src/app/models/biopsy.model';
import { BiopsyMultifocalityValidator, BiopsyNumberValidator } from 'src/app/validators/biopsy.validator';

declare const $: any;

@Component({
  selector: 'app-biopsy-form',
  templateUrl: './biopsy-form.component.html',
  styleUrls: ['./biopsy-form.component.css']
})
export class BiopsyFormComponent implements OnInit {

  biopsyForm : FormGroup;
  BiopsyTypeEnum = BiopsyType;
  BiopsySideEnum = BiopsySide;
  BiopsyHistotypeEnum = BiopsyHistotype;

  leftFormDisabled: boolean;
  rightFormDisabled: boolean;

  constructor(private formBuilder : FormBuilder) {

    this.leftFormDisabled = true;
    this.rightFormDisabled = true;

    this.biopsyForm = this.formBuilder.group({
      date : ['',[Validators.required]],
      side : ['', [Validators.required]],
      biopsyTypeLeft : ['', []],
      numLeft : [ '', [BiopsyNumberValidator]],
      histotypeLeft : ['', []],
      multifocalityLeft : ['', [BiopsyMultifocalityValidator]],
      biopsyTypeRight : ['', []],
      numRight : [ '', [BiopsyNumberValidator]],
      histotypeRight : ['', []],
      multifocalityRight : ['', [BiopsyMultifocalityValidator]],
      comment : ['', []],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
    $('.ui.radio.checkbox').checkbox();
  }

  onBiopsyFormSubmit() {
    //console.log(this.biopsyForm);
  }

  leftSideChecked(){
    this.leftFormDisabled = false;
    this.rightFormDisabled = true;
  }

  rightSideChecked(){
    this.leftFormDisabled = true;
    this.rightFormDisabled = false;
  }

  bothSidesChecked(){
    this.leftFormDisabled = false;
    this.rightFormDisabled = false;
  }
}
