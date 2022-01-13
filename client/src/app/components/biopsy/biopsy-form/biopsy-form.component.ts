import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Biopsy, BiopsyType, BiopsySide, BiopsyHistotype, } from 'src/app/models/biopsy.model';
import { Patient } from 'src/app/models/patient.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { PatientService } from 'src/app/services/patient-service.service';

declare const $: any;

@Component({
  selector: 'app-biopsy-form',
  templateUrl: './biopsy-form.component.html',
  styleUrls: ['./biopsy-form.component.css'],
})
export class BiopsyFormComponent implements OnInit, OnDestroy {
  @Input() biopsy: Biopsy;
  @Input() usedAsUpdateForm: boolean = false;

  biopsyForm: FormGroup;
  BiopsyTypeEnum = BiopsyType;
  BiopsySideEnum = BiopsySide;
  BiopsyHistotypeEnum = BiopsyHistotype;

  leftFormDisabled: boolean = false;
  rightFormDisabled: boolean = false;

  patient: Patient;

  @Output() newBiopsyAdded = new EventEmitter<void>();
  @Output() biopsyUpdated = new EventEmitter<void>();

  sub: Subscription = new Subscription();
  dateHasErrors: boolean = false;
  sideHasErrors: boolean = false;
  biopsyTypeLeftHasErrors: boolean = false;
  histotypeLeftHasErrors: boolean = false;
  multifocalityLeftHasErrors: boolean = false;
  biopsyTypeRightHasErrors: boolean = false;
  histotypeRightHasErrors: boolean = false;
  multifocalityRightHasErrors: boolean = false;

  dateErrors: string[] = [];
  sideErrors: string[] = [];
  biopsyTypeLeftErrors: string[] = [];
  histotypeLeftErrors: string[] = [];
  multifocalityLeftErrors: string[] = [];
  biopsyTypeRightErrors: string[] = [];
  histotypeRightErrors: string[] = [];
  multifocalityRightErrors: string[] = [];

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private biopsyService: BiopsyService) {
    this.leftFormDisabled = false;
    this.rightFormDisabled = true;

    this.patient = this.patientService.getCurrentPatient();

    this.biopsy = new Biopsy(new Date(), BiopsySide.Left, BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', '');

    this.biopsyForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      biopsySide: ['', [Validators.required]],
      // za polja ispod se ne koriste na ovom mestu validatori zbog nacina kako se formular ponasa
      // validacija se radi u okviru pomocnih funkcija u okviru ovog fajla
      biopsyTypeLeft: ['', []],
      histotypeLeft: ['', []],
      multifocalityLeft: ['', []],
      biopsyTypeRight: ['', []],
      histotypeRight: ['', []],
      multifocalityRight: ['', []],
      comment: ['', []],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
    $('.ui.radio.checkbox').checkbox();

    if (this.usedAsUpdateForm) {
      switch (this.biopsy.biopsySide) {
        case BiopsySide.Left:
          this.leftFormDisabled = false;
          this.rightFormDisabled = true;
          break;
        case BiopsySide.Right:
          this.leftFormDisabled = true;
          this.rightFormDisabled = false;
          break;
        case BiopsySide.Both:
          this.leftFormDisabled = false;
          this.rightFormDisabled = false;
          break;
        default:
          break;
      }

      this.biopsyForm.patchValue({
        date: new Date(this.biopsy.date).toISOString().slice(0, 10),
        biopsySide: this.biopsy.biopsySide,
        comment: this.biopsy.comment,
      });

      if (this.biopsy.biopsySide == BiopsySide.Left || this.biopsy.biopsySide == BiopsySide.Both) {
        this.biopsyForm.patchValue({
          biopsyTypeLeft: this.biopsy.biopsyTypeLeft,
          histotypeLeft: this.biopsy.histotypeLeft,
          multifocalityLeft: this.biopsy.multifocalityLeft,
        });
      }

      if (this.biopsy.biopsySide == BiopsySide.Right || this.biopsy.biopsySide == BiopsySide.Both) {
        this.biopsyForm.patchValue({
          biopsyTypeRight: this.biopsy.biopsyTypeRight,
          histotypeRight: this.biopsy.histotypeRight,
          multifocalityRight: this.biopsy.multifocalityRight,
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBiopsyFormSubmit() {
    if (this.biopsyForm.invalid) {
      window.alert('Neka polja nemaju validnu vrednost!');
      // za 2 ugradjena validatora
      this.updateDateErrors();
      this.updateSideErrors();
      return;
    }
    else {
      this.dateHasErrors = false;
      this.dateErrors = [];
      this.sideHasErrors = false;
      this.sideErrors = [];
    }

    // validatori iz ovog fajla
    this.updateLeftAndRightErrors();


    if (this.biopsyTypeLeftHasErrors == true || this.histotypeLeftHasErrors == true || this.multifocalityLeftHasErrors == true ||
      this.biopsyTypeRightHasErrors == true || this.histotypeRightHasErrors == true || this.multifocalityRightHasErrors == true) {
      window.alert('Neka polja nemaju validnu vrednost!');
      return;
    }

    this.dateHasErrors = false;
    this.sideHasErrors = false;
    this.biopsyTypeLeftHasErrors = false;
    this.histotypeLeftHasErrors = false;
    this.multifocalityLeftHasErrors = false;
    this.biopsyTypeRightHasErrors = false;
    this.histotypeRightHasErrors = false;
    this.multifocalityRightHasErrors = false;

    // slanje zahteva ovde:
    const data = this.biopsyForm.value;

    const newBiopsy = new Biopsy(data.date, data.biopsySide, data.biopsyTypeLeft, '', data.histotypeLeft, data.multifocalityLeft,
      data.biopsyTypeRight, '', data.histotypeRight, data.multifocalityRight, data.comment
    );

    if (this.usedAsUpdateForm) {
      //update se postojeci
      newBiopsy._id = this.biopsy._id;

      if (newBiopsy.biopsySide === BiopsySide.Both) {
        newBiopsy.numLeft = this.biopsy.numLeft;
        newBiopsy.numRight = this.biopsy.numRight;
      }
      else if (newBiopsy.biopsySide === BiopsySide.Left) {
        newBiopsy.numLeft = this.biopsy.numLeft;
        newBiopsy.numRight = '';
      }
      else if (newBiopsy.biopsySide === BiopsySide.Right) {
        newBiopsy.numLeft = '';
        newBiopsy.numRight = this.biopsy.numRight;
      }

      this.sub = this.biopsyService.updateBiopsyInfo(newBiopsy).subscribe((updatedBiopsy: Biopsy) => {
        this.biopsyUpdated.emit();
      });
    }
    else {
      // dodaje se novi
      this.sub = this.biopsyService.addNewBiopsyForPatient(this.patient._id, newBiopsy)
        .subscribe((addedBiopsy: Biopsy) => {
          this.patient._biopsyIds.push(addedBiopsy._id);
          this.newBiopsyAdded.emit()
        });
    }
  }

  updateDateErrors() {
    this.dateErrors = [];
    const errors: ValidationErrors | undefined | null = this.biopsyForm.get('date')?.errors;
    if (errors === null || errors === undefined) {
      this.dateHasErrors = false;
    }
    else {
      this.dateHasErrors = true;
      if (errors['required']) {
        this.dateErrors.push("Polje za datum mora imati vrednost");
      }
    }
  }

  updateSideErrors() {
    this.sideErrors = [];
    const errors: ValidationErrors | undefined | null = this.biopsyForm.get('biopsySide')?.errors;
    if (errors === null || errors === undefined) {
      this.sideHasErrors = false;
    }
    else {
      this.sideHasErrors = true;
      if (errors['required']) {
        this.sideErrors.push("Strana biopsije mora biti odabrana");
      }
    }
  }

  updateLeftAndRightErrors() {
    const selectedSide = this.biopsyForm.get('biopsySide')?.value;
    switch (selectedSide) {
      case BiopsySide.Left:
        this.updateBiopsyTypeLeftErrors();
        this.updateHistotypeLeftErrors();
        this.updateMultifocalityLeftErrors();
        break;
      case BiopsySide.Right:
        this.updateBiopsyTypeRightErrors();
        this.updateHistotypeRightErrors();
        this.updateMultifocalityRightErrors();
        break;
      case BiopsySide.Both:
        this.updateBiopsyTypeLeftErrors();
        this.updateHistotypeLeftErrors();
        this.updateMultifocalityLeftErrors();
        this.updateBiopsyTypeRightErrors();
        this.updateHistotypeRightErrors();
        this.updateMultifocalityRightErrors();
        break;
      default:
        // ako nijedna nije selektovana to znaci da ce se ispisati error msg za stranu biopsije
        break;
    }

    return;
  }

  updateBiopsyTypeLeftErrors() {
    this.biopsyTypeLeftErrors = [];
    const value: string = this.biopsyForm.get('biopsyTypeLeft')?.value;
    if (value === '') {
      this.biopsyTypeLeftHasErrors = true;
      this.biopsyTypeLeftErrors.push("Tip biopsije sa leve strane mora biti odabran");
    }
    else {
      this.biopsyTypeLeftHasErrors = false;
    }
  }

  updateHistotypeLeftErrors() {
    this.histotypeLeftErrors = [];
    const value: string = this.biopsyForm.get('histotypeLeft')?.value;
    if (value === '') {
      this.histotypeLeftHasErrors = true;
      this.histotypeLeftErrors.push("Histotip biopsije sa leve strane mora biti odabran");
    }
    else {
      this.histotypeLeftHasErrors = false;
    }
  }

  updateMultifocalityLeftErrors() {
    this.multifocalityLeftErrors = [];
    const value: string = this.biopsyForm.get('multifocalityLeft')?.value;
    if (this.checkIfMultifocalityIsValid(value)) {
      this.multifocalityLeftHasErrors = false;
    }
    else {
      this.multifocalityLeftHasErrors = true;
      this.multifocalityLeftErrors.push("Multifokalnost biopsije moze biti numericka vrednost ili \'ne\'");
    }
  }

  updateBiopsyTypeRightErrors() {
    this.biopsyTypeRightErrors = [];
    const value: string = this.biopsyForm.get('biopsyTypeRight')?.value;
    if (value === '') {
      this.biopsyTypeRightHasErrors = true;
      this.biopsyTypeRightErrors.push("Tip biopsije sa desne strane mora biti odabran");
    }
    else {
      this.biopsyTypeRightHasErrors = false;
    }
  }

  updateHistotypeRightErrors() {
    this.histotypeRightErrors = [];
    const value: string = this.biopsyForm.get('histotypeRight')?.value;
    if (value === '') {
      this.histotypeRightHasErrors = true;
      this.histotypeRightErrors.push("Histotip biopsije sa desne strane mora biti odabran");
    }
    else {
      this.histotypeRightHasErrors = false;
    }
  }

  updateMultifocalityRightErrors() {
    this.multifocalityRightErrors = [];
    const value: string = this.biopsyForm.get('multifocalityRight')?.value;
    if (this.checkIfMultifocalityIsValid(value)) {
      this.multifocalityRightHasErrors = false;
    }
    else {
      this.multifocalityRightHasErrors = true;
      this.multifocalityRightErrors.push("Multifokalnost biopsije moze biti numericka vrednost ili \'ne\'");
    }
  }

  checkIfMultifocalityIsValid(data: string): boolean {
    const regex1 = new RegExp("^ne$");
    const regex2 = new RegExp("^[0-9]+$");
    if (!data.match(regex1) && !data.match(regex2)) {
      return false;
    }
    return true;
  }

  leftSideChecked() {
    this.leftFormDisabled = false;
    this.rightFormDisabled = true;
    // moraju da se ociste vrednsoti formulara i errori kada neka strana nije vise potrebna
    this.biopsyForm.patchValue({ biopsyTypeRight: '', histotypeRight: '', multifocalityRight: '' });
    this.biopsyTypeRightHasErrors = false;
    this.biopsyTypeRightErrors = [];
    this.histotypeRightHasErrors = false;
    this.histotypeRightErrors = [];
    this.multifocalityRightHasErrors = false;
    this.multifocalityRightErrors = [];
  }

  rightSideChecked() {
    this.rightFormDisabled = false;
    this.leftFormDisabled = true;
    // moraju da se ociste vrednsoti formulara i errori kada neka strana nije vise potrebna
    this.biopsyForm.patchValue({ biopsyTypeLeft: '', histotypeLeft: '', multifocalityLeft: '' });
    this.biopsyTypeLeftHasErrors = false;
    this.biopsyTypeLeftErrors = [];
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
