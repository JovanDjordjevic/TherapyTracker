import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Tumor, Gradus, Her2Status, HER2_FISH_SICH } from 'src/app/models/tumor.model';
import { MustBeNumber } from 'src/app/validators/common.validator';
import { BiopsyNumberInTumorForm, Ki67Validator } from 'src/app/validators/tumor.validator';
import { Subscription } from 'rxjs';
import { TumorService } from 'src/app/services/tumor.service';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';

declare const $: any;

@Component({
  selector: 'app-tumor-form',
  templateUrl: './tumor-form.component.html',
  styleUrls: ['./tumor-form.component.css'],
})
export class TumorFormComponent implements OnInit {
  tumorForm: FormGroup;
  GradusEnum = Gradus;
  HER2_FISH_SICH_Enum = HER2_FISH_SICH;
  Her2StatusEnum = Her2Status;

  ki67Disabled: boolean = true;

  patient: Patient;
  sub: Subscription = new Subscription();


  dateHasErrors: boolean = false;
  tumorNameHasErrors: boolean = false;
  biopsyIndexHasErrors: boolean = false;
  gradusHasErrors: boolean = false;
  erScoreHasErrors: boolean = false;
  erScorePercentHasErrors: boolean = false;
  pgrScoreHasErrors: boolean = false;
  pgrScorePercentHasErrors: boolean = false;
  her2INCHasErrors: boolean = false;
  her2INCPercentHasErrors: boolean = false;
  her2_FISH_SICHHasErrors: boolean = false;
  her2StatusHasErrors: boolean = false;
  ki67HasErrors: boolean = false;
  molecularSubtypeHasErrors: boolean = false;

  dateErrors: string[] = [];
  tumorNameErrors: string[] = [];
  biopsyIndexErrors: string[] = [];
  gradusErrors: string[] = [];
  erScoreErrors: string[] = [];
  erScorePercentErrors: string[] = [];
  pgrScoreErrors: string[] = [];
  pgrScorePercentErrors: string[] = [];
  her2INCErrors: string[] = [];
  her2INCPercentErrors: string[] = [];
  her2_FISH_SICHErrors: string[] = [];
  her2StatusErrors: string[] = [];
  ki67Errors: string[] = [];
  molecularSubtypeErrors: string[] = [];

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private tumorService: TumorService) {
    this.patient = this.patientService.getCurrentPatient();

    this.tumorForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      tumorName: ['', [Validators.required]],
      biopsyIndex: ['', [Validators.required, BiopsyNumberInTumorForm]],
      gradus: ['', [Validators.required]],
      erScore: ['', [Validators.required, MustBeNumber]],
      erScorePercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      erStatus: ['', []],
      pgrScore: ['', [Validators.required, MustBeNumber]],
      pgrScorePercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      pgrStatus: ['', []],
      her2INC: ['', [Validators.required, MustBeNumber]],
      her2INCPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      her2_FISH_SICH: ['', [Validators.required]],
      her2Status: ['', [Validators.required]],
      ki67: ['nepoznato', [Validators.required, Ki67Validator]],
      molecularSubtype: ['', [Validators.required, MustBeNumber]],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
  }

  onTumorFormSubmit() {
    if (this.tumorForm.invalid) {
      //window.alert('Neka polja nemaju validnu vrednost!');
      this.updateDateErrors();
      this.updateTumorNameErrors();
      this.updateBiopsyIndexErrors();
      this.updateGradusErrors();
      this.updateErScoreErrors();
      this.updateErScorePercentErrors();
      this.updatePgrScoreErrors();
      this.updatePgrScorePercentErrors();
      this.updateHer2INCErrors();
      this.updateHer2INCPercentErrors();
      this.updateHer2_FISH_SICHErrors();
      this.updateHer2StatusErrors();
      this.updateKi67Errors();
      this.updateMolecularSubtypeErrors();
      return;
    }

    this.gradusHasErrors = false;
    this.erScoreHasErrors = false;
    this.erScorePercentHasErrors = false;
    this.pgrScoreHasErrors = false;
    this.pgrScorePercentHasErrors = false;
    this.her2INCHasErrors = false;
    this.her2INCPercentHasErrors = false;
    this.her2_FISH_SICHHasErrors = false;
    this.her2StatusHasErrors = false;
    this.ki67HasErrors = false;
    this.molecularSubtypeHasErrors = false;

    // slanje zahteva:
    console.log(this.tumorForm);
    const data = this.tumorForm.value;

    const newTumor = new Tumor(data.date, data.tumorName, data.biopsyIndex, data.gradus, data.erScore, data.erScorePercent, data.erStatus, data.pgrScore, data.pgrScorePercent,
      data.pgrStatus, data.her2INC, data.her2INCPercent, data.her2_FISH_SICH, data.her2Status, data.ki67, data.molecularSubtype
    );

    console.log(newTumor);
    this.sub = this.tumorService.addNewTumorForPatient(this.patient._id, newTumor)
      .subscribe((addedTumor: Tumor) => {
        console.log('added tumor for ', this.patient._id, ' : ', addedTumor);
      });
  }

  updateDateErrors() {
    this.dateErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('date')?.errors;
    if (errors === null || errors === undefined) {
      this.dateHasErrors = false;
    }
    else {
      this.dateHasErrors = true;
      if (errors['required']) {
        this.dateErrors.push("Datum mora imati vrednost");
      }
    }
  }

  updateTumorNameErrors() {
    this.tumorNameErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('tumorName')?.errors;
    if (errors === null || errors === undefined) {
      this.tumorNameHasErrors = false;
    }
    else {
      this.tumorNameHasErrors = true;
      if (errors['required']) {
        this.tumorNameErrors.push("Naziv tumora mora imati vrednost");
      }
    }
  }

  updateBiopsyIndexErrors() {
    this.biopsyIndexErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('biopsyIndex')?.errors;
    if (errors === null || errors === undefined) {
      this.biopsyIndexHasErrors = false;
    }
    else {
      this.biopsyIndexHasErrors = true;
      if (errors['required']) {
        this.biopsyIndexErrors.push("Naziv tumora mora imati vrednost");
      }
      if (errors['biopsyIndex']) {
        this.biopsyIndexErrors.push(errors['biopsyIndex'].message);
      }
    }
  }


  updateGradusErrors() {
    this.gradusErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('gradus')?.errors;
    if (errors === null || errors === undefined) {
      this.gradusHasErrors = false;
    }
    else {
      this.gradusHasErrors = true;
      if (errors['required']) {
        this.gradusErrors.push("Gradus mora imati vrednost");
      }
    }
  }

  updateErScoreErrors() {
    this.erScoreErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('erScore')?.errors;
    if (errors === null || errors === undefined) {
      this.erScoreHasErrors = false;
    }
    else {
      this.erScoreHasErrors = true;
      if (errors['required']) {
        this.erScoreErrors.push("Er skor mora imati vrednost");
      }
      if (errors['mustBeNumber']) {
        this.erScoreErrors.push(errors['mustBeNumber'].message);
      }
    }
  }

  updateErScorePercentErrors() {
    this.erScorePercentErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('erScorePercent')?.errors;
    if (errors === null || errors === undefined) {
      this.erScorePercentHasErrors = false;
    }
    else {
      this.erScorePercentHasErrors = true;
      if (errors['required']) {
        this.erScorePercentErrors.push("Er skor % mora imati vrednost");
      }
      if (errors['min'] || errors['max']) {
        this.erScorePercentErrors.push("Vrednost mora biti broj izmedju 0 i 100");
      }
    }
  }

  updatePgrScoreErrors() {
    this.pgrScoreErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('pgrScore')?.errors;
    if (errors === null || errors === undefined) {
      this.pgrScoreHasErrors = false;
    }
    else {
      this.pgrScoreHasErrors = true;
      if (errors['required']) {
        this.pgrScoreErrors.push("Pgr skor mora imati vrednost");
      }
      if (errors['mustBeNumber']) {
        this.pgrScoreErrors.push(errors['mustBeNumber'].message);
      }
    }
  }

  updatePgrScorePercentErrors() {
    this.pgrScorePercentErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('pgrScorePercent')?.errors;
    if (errors === null || errors === undefined) {
      this.pgrScorePercentHasErrors = false;
    }
    else {
      this.pgrScorePercentHasErrors = true;
      if (errors['required']) {
        this.pgrScorePercentErrors.push("Pgr skor % mora imati vrednost");
      }
      if (errors['min'] || errors['max']) {
        this.pgrScorePercentErrors.push("Vrednost mora biti broj izmedju 0 i 100");
      }
    }
  }

  updateHer2INCErrors() {
    this.her2INCErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('her2INC')?.errors;
    if (errors === null || errors === undefined) {
      this.her2INCHasErrors = false;
    }
    else {
      this.her2INCHasErrors = true;
      if (errors['required']) {
        this.her2INCErrors.push("Her2 INC mora imati vrednost");
      }
      if (errors['mustBeNumber']) {
        this.her2INCErrors.push(errors['mustBeNumber'].message);
      }
    }
  }

  updateHer2INCPercentErrors() {
    this.her2INCPercentErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('her2INCPercent')?.errors;
    if (errors === null || errors === undefined) {
      this.her2INCPercentHasErrors = false;
    }
    else {
      this.her2INCPercentHasErrors = true;
      if (errors['required']) {
        this.her2INCPercentErrors.push("Her2 INC % mora imati vrednost");
      }
      if (errors['min'] || errors['max']) {
        this.her2INCPercentErrors.push("Vrednost mora biti broj izmedju 0 i 100");
      }
    }
  }

  updateHer2_FISH_SICHErrors() {
    this.her2_FISH_SICHErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('her2_FISH_SICH')?.errors;
    if (errors === null || errors === undefined) {
      this.her2_FISH_SICHHasErrors = false;
    }
    else {
      this.her2_FISH_SICHHasErrors = true;
      if (errors['required']) {
        this.her2_FISH_SICHErrors.push("Her2 FISH-SICH mora imati vrednost");
      }
    }
  }

  updateHer2StatusErrors() {
    this.her2StatusErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('her2Status')?.errors;
    if (errors === null || errors === undefined) {
      this.her2StatusHasErrors = false;
    }
    else {
      this.her2StatusHasErrors = true;
      if (errors['required']) {
        this.her2StatusErrors.push("Her2 status mora imati vrednost");
      }
    }
  }

  updateKi67Errors() {
    this.ki67Errors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('ki67')?.errors;
    if (errors === null || errors === undefined) {
      this.ki67HasErrors = false;
    }
    else {
      this.ki67HasErrors = true;
      if (errors['required']) {
        this.ki67Errors.push("Ki67 mora imati vrednost");
      }
      if (errors['ki67']) {
        this.ki67Errors.push(errors['ki67'].message);
      }
    }
  }

  updateMolecularSubtypeErrors() {
    this.molecularSubtypeErrors = [];
    const errors: ValidationErrors | undefined | null = this.tumorForm.get('molecularSubtype')?.errors;
    if (errors === null || errors === undefined) {
      this.molecularSubtypeHasErrors = false;
    }
    else {
      this.molecularSubtypeHasErrors = true;
      if (errors['required']) {
        this.molecularSubtypeErrors.push("Molekularni subtip mora imati vrednost");
      }
      if (errors['mustBeNumber']) {
        this.molecularSubtypeErrors.push(errors['mustBeNumber'].message);
      }
    }
  }

  gradusSelected() {
    const gradusValue: Gradus = this.tumorForm.get('gradus')?.value;
    if (gradusValue === Gradus.Unknown) {
      this.tumorForm.patchValue({ erStatus: 0, pgrStatus: 0 });
    } else {
      const erPercentValue = parseFloat(
        this.tumorForm.get('erScorePercent')?.value
      );
      if (!Number.isNaN(erPercentValue)) {
        if (erPercentValue < 1) {
          this.tumorForm.patchValue({ erStatus: 0 });
        } else {
          this.tumorForm.patchValue({ erStatus: 1 });
        }
      }

      const pgrPercentValue = parseFloat(
        this.tumorForm.get('pgrScorePercent')?.value
      );
      if (!Number.isNaN(pgrPercentValue)) {
        if (pgrPercentValue < 1) {
          this.tumorForm.patchValue({ pgrStatus: 0 });
        } else {
          this.tumorForm.patchValue({ pgrStatus: 1 });
        }
      }
    }
  }

  erPercentEntered() {
    const erPercentValue = parseFloat(
      this.tumorForm.get('erScorePercent')?.value
    );
    const gradusValue: Gradus = this.tumorForm.get('gradus')?.value;
    if (gradusValue != Gradus.Unknown) {
      if (erPercentValue < 1) {
        this.tumorForm.patchValue({ erStatus: 0 });
      } else {
        this.tumorForm.patchValue({ erStatus: 1 });
      }
    }
  }

  pgrPercentEntered() {
    const pgrPercentValue = parseFloat(
      this.tumorForm.get('pgrScorePercent')?.value
    );
    const gradusValue: Gradus = this.tumorForm.get('gradus')?.value;
    if (gradusValue != Gradus.Unknown) {
      if (pgrPercentValue < 1) {
        this.tumorForm.patchValue({ pgrStatus: 0 });
      } else {
        this.tumorForm.patchValue({ pgrStatus: 1 });
      }
    }
  }

  onKi67CheckboxChange() {
    if (this.ki67Disabled) {
      this.tumorForm.patchValue({
        ki67: '',
      });
    } else {
      this.tumorForm.patchValue({
        ki67: 'nepoznato',
      });
    }

    this.ki67Disabled = !this.ki67Disabled;
  }
}
