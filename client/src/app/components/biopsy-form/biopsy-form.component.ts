import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Biopsy, BiopsyType, BiopsySide, BiopsyHistotype, } from 'src/app/models/biopsy.model';
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

  dateHasErrors : boolean = false;
  sideHasErrors : boolean = false;
  biopsyTypeLeftHasErrors : boolean = false;
  numLeftHasErrors : boolean = false;
  histotypeLeftHasErrors : boolean = false;
  multifocalityLeftHasErrors : boolean = false;
  biopsyTypeRightHasErrors : boolean = false;
  numRightHasErrors : boolean = false;
  histotypeRightHasErrors : boolean = false;
  multifocalityRightHasErrors : boolean = false;

  dateErrors : string[] = [];
  sideErrors : string[] = [];
  biopsyTypeLeftErrors : string[] = [];
  numLeftErrors : string[] = [];
  histotypeLeftErrors : string[] = [];
  multifocalityLeftErrors : string[] = [];
  biopsyTypeRightErrors : string[] = [];
  numRightErrors : string[] = [];
  histotypeRightErrors : string[] = [];
  multifocalityRightErrors : string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.leftFormDisabled = false;
    this.rightFormDisabled = true;

    this.biopsyForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      side: ['', [Validators.required]],
      // za polja ispod se ne koriste na ovom mestu validatori zbog nacina kako se formular ponasa
      // validacija se radi u okviru pomocnih funkcija u okviru ovog fajla
      biopsyTypeLeft: ['', []],
      numLeft: ['', []],
      histotypeLeft: ['', []],
      multifocalityLeft: ['', []],
      biopsyTypeRight: ['', []],
      numRight: ['', []],
      histotypeRight: ['', []],
      multifocalityRight: ['', []],
      comment: ['', []],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
    $('.ui.radio.checkbox').checkbox();
  }

  onBiopsyFormSubmit() {
    if (this.biopsyForm.invalid) {
      window.alert('Neka polja nemaju validnu vrednost!');
      // za 2 ugradjena validatora
      this.updateDateErrors();
      this.updateSideErrors();
      return;
    }

    // validatori iz ovog fajla
    this.updateLeftAndRightErrors();
    
    
    if(this.dateHasErrors == true || this.sideHasErrors == true || 
      this.biopsyTypeLeftHasErrors == true || this.numLeftHasErrors == true || this.histotypeLeftHasErrors == true || this.multifocalityLeftHasErrors == true ||
      this.biopsyTypeRightHasErrors == true || this.numRightHasErrors == true || this.histotypeRightHasErrors == true || this.multifocalityRightHasErrors == true) {
        window.alert('Neka polja nemaju validnu vrednost!');
        return;
    }

    this.dateHasErrors = false;
    this.sideHasErrors = false;
    this.biopsyTypeLeftHasErrors = false;
    this.numLeftHasErrors = false;
    this.histotypeLeftHasErrors = false;
    this.multifocalityLeftHasErrors = false;
    this.biopsyTypeRightHasErrors = false;
    this.numRightHasErrors = false;
    this.histotypeRightHasErrors = false;
    this.multifocalityRightHasErrors = false;

    // TODO: slanje zahteva ovde:
    console.log(this.biopsyForm);
  }

  updateDateErrors(){
    this.dateErrors = [];
    const errors : ValidationErrors | undefined | null = this.biopsyForm.get('date')?.errors;
    if (errors === null || errors === undefined) {
      this.dateHasErrors = false;
    }
    else {
      this.dateHasErrors = true;
      if(errors['required']) {
        this.dateErrors.push("Polje za datum mora imati vrednost");
      }
    }
  }

  updateSideErrors(){
    this.sideErrors = [];
    const errors : ValidationErrors | undefined | null = this.biopsyForm.get('side')?.errors;
    if (errors === null || errors === undefined) {
      this.sideHasErrors = false;
    }
    else {
      this.sideHasErrors = true;
      if(errors['required']) {
        this.sideErrors.push("Strana biopsije mora biti odabrana");
      }
    }
  }

  updateLeftAndRightErrors(){
    const selectedSide = this.biopsyForm.get('side')?.value;
    switch (selectedSide) {
      case BiopsySide.Left:
        this.updateBiopsyTypeLeftErrors();
        this.updateNumLeftErrors();
        this.updateHistotypeLeftErrors();
        this.updateMultifocalityLeftErrors();
        break;
      case BiopsySide.Right:
        this.updateBiopsyTypeRightErrors();
        this.updateNumRightErrors();
        this.updateHistotypeRightErrors();
        this.updateMultifocalityRightErrors();
        break;
      case BiopsySide.Both:
        this.updateBiopsyTypeLeftErrors();
        this.updateNumLeftErrors();
        this.updateHistotypeLeftErrors();
        this.updateMultifocalityLeftErrors();8
        this.updateBiopsyTypeRightErrors();
        this.updateNumRightErrors();
        this.updateHistotypeRightErrors();
        this.updateMultifocalityRightErrors();
        break;
      default:
        // ako nijedna nije selektovana to znaci da ce se ispisati error msg za stranu biopsije
        break;
    }

    return;
  }

  updateBiopsyTypeLeftErrors(){
    this.biopsyTypeLeftErrors = [];
    const value : string = this.biopsyForm.get('biopsyTypeLeft')?.value;
    if (value === '') {
      this.biopsyTypeLeftHasErrors = true;
      this.biopsyTypeLeftErrors.push("Tip biopsije sa leve strane mora biti odabran");
    }
    else {
      this.biopsyTypeLeftHasErrors = false;
    }
  }

  updateNumLeftErrors(){
    this.numLeftErrors = [];
    const value : string = this.biopsyForm.get('numLeft')?.value;
    if (this.checkIfBiopsyNumberIsValid(value)) {
      this.numLeftHasErrors = false;
    }
    else {
      this.numLeftHasErrors = true;
      this.numLeftErrors.push("Broj biopsije mora biti u formatu broj/godina");
    }
  }

  updateHistotypeLeftErrors(){
    this.histotypeLeftErrors = [];
    const value : string = this.biopsyForm.get('histotypeLeft')?.value;
    if (value === '') {
      this.histotypeLeftHasErrors = true;
      this.histotypeLeftErrors.push("Histotip biopsije sa leve strane mora biti odabran");
    }
    else {
      this.histotypeLeftHasErrors = false;
    }
  }

  updateMultifocalityLeftErrors(){
    this.multifocalityLeftErrors = [];
    const value : string = this.biopsyForm.get('multifocalityLeft')?.value;
    if (this.checkIfMultifocalityIsValid(value)) {
      this.multifocalityLeftHasErrors = false;
    }
    else {
      this.multifocalityLeftHasErrors = true;
      this.multifocalityLeftErrors.push("Multifokalnost biopsije moze biti numericka vrednost ili \'ne\'");
    }
  }

  updateBiopsyTypeRightErrors(){
    this.biopsyTypeRightErrors = [];
    const value : string = this.biopsyForm.get('biopsyTypeRight')?.value;
    if (value === '') {
      this.biopsyTypeRightHasErrors = true;
      this.biopsyTypeRightErrors.push("Tip biopsije sa desne strane mora biti odabran");
    }
    else {
      this.biopsyTypeLeftHasErrors = false;
    }
  }

  updateNumRightErrors(){
    this.numRightErrors = [];
    const value : string = this.biopsyForm.get('numRight')?.value;
    if (this.checkIfBiopsyNumberIsValid(value)) {
      this.numRightHasErrors = false;
    }
    else {
      this.numRightHasErrors = true;
      this.numRightErrors.push("Broj biopsije mora biti u formatu broj/godina");
    }
  }

  updateHistotypeRightErrors(){
    this.histotypeRightErrors = [];
    const value : string = this.biopsyForm.get('histotypeRight')?.value;
    if (value === '') {
      this.histotypeRightHasErrors = true;
      this.histotypeRightErrors.push("Histotip biopsije sa desne strane mora biti odabran");
    }
    else {
      this.histotypeRightHasErrors = false;
    }
  }

  updateMultifocalityRightErrors(){
    this.multifocalityRightErrors = [];
    const value : string = this.biopsyForm.get('multifocalityRight')?.value;
    if (this.checkIfMultifocalityIsValid(value)) {
      this.multifocalityRightHasErrors = false;
    }
    else {
      this.multifocalityRightHasErrors = true;
      this.multifocalityRightErrors.push("Multifokalnost biopsije moze biti numericka vrednost ili \'ne\'");
    }
  }

  checkIfBiopsyNumberIsValid(data : string) : boolean{
    if (!data.match(new RegExp("^[0-9]+/[0-9]+$"))) {
      return false;
    }
    return true;
  } 

  checkIfMultifocalityIsValid(data: string) : boolean {
    if (!data.match(new RegExp("^ne|[0-9]+"))) {
      return false;
    }
    return true;
  }

  leftSideChecked() {
    this.leftFormDisabled = false;
    this.rightFormDisabled = true;
    // moraju da se ociste vrednsoti formulara i errori kada neka strana nije vise potrebna
    this.biopsyForm.patchValue({biopsyTypeRight: '', numRight: '', histotypeRight : '', multifocalityRight : ''});
    this.biopsyTypeRightHasErrors = false;
    this.biopsyTypeRightErrors = [];
    this.numRightHasErrors = false;
    this.numRightErrors = [];
    this.histotypeRightHasErrors = false;
    this.histotypeRightErrors = [];
    this.multifocalityRightHasErrors = false;
    this.multifocalityRightErrors = [];
  }

  rightSideChecked() {
    this.rightFormDisabled = false;
    this.leftFormDisabled = true;
    // moraju da se ociste vrednsoti formulara i errori kada neka strana nije vise potrebna
    this.biopsyForm.patchValue({biopsyTypeLeft: '', numLeft: '', histotypeLeft : '', multifocalityLeft : ''});
    this.biopsyTypeLeftHasErrors = false;
    this.biopsyTypeLeftErrors = [];
    this.numLeftHasErrors = false;
    this.numLeftErrors = [];
    this.histotypeLeftHasErrors = false;
    this.histotypeLeftErrors = [];
    this.multifocalityLeftHasErrors = false;
    this.multifocalityLeftErrors = [];
  }

  bothSidesChecked() {
    this.leftFormDisabled = false;
    this.rightFormDisabled = false;
  }
}
