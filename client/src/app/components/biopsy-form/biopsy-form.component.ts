import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Biopsy, BiopsyType, BiopsySide, BiopsyHistotype} from 'src/app/models/biopsy.model';

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

  constructor(private formBuilder : FormBuilder) {
    this.biopsyForm = this.formBuilder.group({
      date : [Validators.required],
      side : [Validators.required],
      biopsyTypeLeft : [],
      numLeft : [],
      histotypeLeft : [],
      multifocalityLeft : [],
      biopsyTypeRight : [],
      numRight : [],
      histotypeRight : [],
      multifocalityRight : [],
      comment : [],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
    $('.ui.radio.checkbox').checkbox();
  }

  onBiopsyFormSubmit() {
    //console.log(this.biopsyForm);
  }

}
