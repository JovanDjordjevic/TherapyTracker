import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Biopsy,
  BiopsyType,
  BiopsySide,
  BiopsyHistotype,
} from 'src/app/models/biopsy.model';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import {
  BiopsyMultifocalityValidator,
  BiopsyNumberValidator,
} from 'src/app/validators/biopsy.validator';

declare const $: any;

@Component({
  selector: 'app-biopsy-form',
  templateUrl: './biopsy-form.component.html',
  styleUrls: ['./biopsy-form.component.css'],
})
export class BiopsyFormComponent implements OnInit {
  biopsyForm: FormGroup;
  BiopsyTypeEnum = BiopsyType;
  BiopsySideEnum = BiopsySide;
  BiopsyHistotypeEnum = BiopsyHistotype;

  leftFormDisabled: boolean;
  rightFormDisabled: boolean;

  @Input() patient: Patient;

  constructor(
    private formBuilder: FormBuilder,
    private biopsyService: BiopsyService
  ) {
    this.leftFormDisabled = false;
    this.rightFormDisabled = true;

    this.patient = new Patient(
      'aaa',
      '',
      '',
      '',
      0,
      Gender.Female,
      Menopause.None,
      '',
      '',
      '',
      '',
      new Date(),
      ''
    );

    this.biopsyForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      side: ['', [Validators.required]],
      biopsyTypeLeft: ['', []],
      numLeft: ['', [BiopsyNumberValidator]],
      histotypeLeft: ['', []],
      multifocalityLeft: ['', [BiopsyMultifocalityValidator]],
      biopsyTypeRight: ['', []],
      numRight: ['', [BiopsyNumberValidator]],
      histotypeRight: ['', []],
      multifocalityRight: ['', [BiopsyMultifocalityValidator]],
      comment: ['', []],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
    $('.ui.radio.checkbox').checkbox();
  }

  onBiopsyFormSubmit() {
    //console.log(this.biopsyForm);

    const data = this.biopsyForm.value;

    const newBiopsy = new Biopsy(
      data.date,
      data.side,
      data.biopsyTypeLeft,
      data.numLeft,
      data.histotypeLeft,
      data.multifocalityLeft,
      data.biopsyTypeRight,
      data.numRight,
      data.histotypeRight,
      data.multifocalityRight,
      data.comment
    );

    console.log(this.patient._id);
    this.biopsyService.addNewBiopsyForPatient(this.patient._id, newBiopsy)
      .subscribe;

    this.biopsyService.getAllBiopsies(1).subscribe((data) => console.log(data));
  }

  leftSideChecked() {
    this.leftFormDisabled = false;
    this.rightFormDisabled = true;
  }

  rightSideChecked() {
    this.leftFormDisabled = true;
    this.rightFormDisabled = false;
  }

  bothSidesChecked() {
    this.leftFormDisabled = false;
    this.rightFormDisabled = false;
  }
}
