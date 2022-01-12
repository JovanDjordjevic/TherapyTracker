import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Therapy, TherapyResponse, TherapyType } from 'src/app/models/therapy.model';
import { MustBeNumber } from 'src/app/validators/common.validator';
import { HerceptinTherapyValidator } from 'src/app/validators/therapy.validator';
import { Subscription } from 'rxjs';
import { TherapyService } from 'src/app/services/therapy.service';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';

declare const $: any;

@Component({
  selector: 'app-therapy-form',
  templateUrl: './therapy-form.component.html',
  styleUrls: ['./therapy-form.component.css'],
})
export class TherapyFormComponent implements OnInit {
  @Input() therapy : Therapy;
  @Input() usedAsUpdateForm : boolean = false;

  therapyForm: FormGroup;
  TherapyTypeEnum = TherapyType;
  TherapyResponseEnum = TherapyResponse;
  sub: Subscription = new Subscription();
  patient: Patient;

  @Output() newTherapyAdded = new EventEmitter<string>();
  @Output() therapyUpdated = new EventEmitter<void>();

  // nigde nije naglaseno koliko moze da bude kolicine kog leka, recimo 500
  numberValues: number[] = [];

  herceptinDisabled: boolean = true;

  numCyclesHasErrors: boolean = false;
  therapyTypeHasErrors: boolean = false;
  numTaxolHasErrors: boolean = false;
  numTxtrHasErrors: boolean = false;
  herceptinTherapyHasErrors: boolean = false;

  numCyclesErrors: string[] = [];
  therapyTypeErrors: string[] = [];
  numTaxolErrors: string[] = [];
  numTxtrErrors: string[] = [];
  herceptinTherapyErrors: string[] = [];

  constructor(private formBuilder: FormBuilder, private therapyService: TherapyService, private patientService: PatientService) {
    for (let i = 0; i <= 500; i++) {
      this.numberValues.push(i);
    }
    
    this.therapy = new Therapy(new Date, 2, TherapyType.AC, 3, 2, "2", "temp", "neki komentar");

    this.patient = this.patientService.getCurrentPatient();

    this.therapyForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      numCycles: ['', [Validators.required, MustBeNumber]],
      therapyType: ['', [Validators.required]],
      numTaxol: ['', [Validators.required]],
      numTxtr: ['', [Validators.required]],
      herceptinTherapy: ['nije primenljivo', [Validators.required, HerceptinTherapyValidator]],
      comment: ['', []],
      therapyResponse: ['', []],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();

    if (this.usedAsUpdateForm) {
      if (this.therapy.herceptinTherapy !== "nije primenljivo") {
        $("#herceptinCheckbox").prop("checked", true);
        this.herceptinDisabled = false;
      }

      this.therapyForm.patchValue({ 
        date : new Date(this.therapy.date).toISOString().slice(0,10),
        numCycles : this.therapy.numCycles.toString(),
        therapyType : this.therapy.therapyType,
        numTaxol : this.therapy.numTaxol,
        numTxtr : this.therapy.numTxtr,
        herceptinTherapy : this.therapy.herceptinTherapy,
        comment : this.therapy.comment,
      });

      if(this.therapy.isTherapyResponseSet) {
        this.therapyForm.patchValue({ 
          therapyResponse : this.therapy.therapyResponse,
        });
      }
    }
  }

  onTherapyFormSubmit() {
    if (this.therapyForm.invalid) {
      window.alert('Neka polja nemaju validnu vrednost!');
      this.updateNumCyclesErrors();
      this.updateTherapyTypeErrors();
      this.updateNumTaxolErrors();
      this.updateNumTxtrErrors();
      this.updateHerceptinTherapyErrors();
      return;
    }

    this.numCyclesHasErrors = false;
    this.therapyTypeHasErrors = false;
    this.numTaxolHasErrors = false;
    this.numTxtrHasErrors = false;
    this.herceptinTherapyHasErrors = false;

    // TODO: ovde ide zahtev
    console.log(this.therapyForm);
    const data = this.therapyForm.value;

    var therapyShortString = this.therapy.numCycles + this.therapy.therapyType
                            + (data.numTaxol > 0 ? ("+" + this.therapy.numTaxol + "TAXOL") : "")
                            + (data.numTxtr > 0 ? ("+" + this.therapy.numTxtr + "TXTR") : "")
                            + (data.herceptinTherapy != 'nije primenljivo' ? "+" + this.therapy.herceptinTherapy + "H" : "");

    const newTherapy = new Therapy(data.date, data.numCycles, data.therapyType, data.numTaxol, data.numTxtr, data.herceptinTherapy, therapyShortString, data.comment);

    console.log(newTherapy);
    if(this.usedAsUpdateForm){
      //update se postojeci
      newTherapy._id = this.therapy._id;

      const responseValue = this.therapyForm.get('therapyResponse')?.value
      if (responseValue) {
        newTherapy.isTherapyResponseSet = true;
        newTherapy.therapyResponse = responseValue;
      }

      this.sub = this.therapyService.updateTherapyInfo(newTherapy).subscribe((updatedTherapy: Therapy) => {
        console.log('therapy updated', updatedTherapy);
        this.therapyUpdated.emit();
      });
    }
    else {
      // dodaje se novi
      this.sub = this.therapyService.addNewTherapyForPatient(this.patient._id, newTherapy).subscribe((addedTherapy: Therapy) => {
        this.patient._therapyIds.push(addedTherapy._id);
        console.log('added therapy for ', this.patient._id, ' : ', addedTherapy);
        this.newTherapyAdded.emit("dodat nova terapija, refresuj listu")
      });
    }
  }

  updateNumCyclesErrors() {
    this.numCyclesErrors = [];
    const errors: ValidationErrors | undefined | null =
      this.therapyForm.get('numCycles')?.errors;
    if (errors === null || errors === undefined) {
      this.numCyclesHasErrors = false;
    } else {
      this.numCyclesHasErrors = true;
      if (errors['required']) {
        this.numCyclesErrors.push('Broj ciklusa mora imati vrednost');
      }
      if (errors['mustBeNumber']) {
        this.numCyclesErrors.push(errors['mustBeNumber'].message);
      }
    }
  }

  updateTherapyTypeErrors() {
    this.therapyTypeErrors = [];
    const errors: ValidationErrors | undefined | null =
      this.therapyForm.get('therapyType')?.errors;
    if (errors === null || errors === undefined) {
      this.therapyTypeHasErrors = false;
    } else {
      this.therapyTypeHasErrors = true;
      if (errors['required']) {
        this.therapyTypeErrors.push('Tip terapije mora imati vrednost');
      }
    }
  }

  updateNumTaxolErrors() {
    this.numTaxolErrors = [];
    const errors: ValidationErrors | undefined | null =
      this.therapyForm.get('numTaxol')?.errors;
    if (errors === null || errors === undefined) {
      this.numTaxolHasErrors = false;
    } else {
      this.numTaxolHasErrors = true;
      if (errors['required']) {
        this.numTaxolErrors.push('Doza Taxol-a mora imati vrednost');
      }
    }
  }

  updateNumTxtrErrors() {
    this.numTxtrErrors = [];
    const errors: ValidationErrors | undefined | null =
      this.therapyForm.get('numTxtr')?.errors;
    if (errors === null || errors === undefined) {
      this.numTxtrHasErrors = false;
    } else {
      this.numTxtrHasErrors = true;
      if (errors['required']) {
        this.numTxtrErrors.push('Doza TXTR-a mora imati vrednost');
      }
    }
  }

  updateHerceptinTherapyErrors() {
    this.herceptinTherapyErrors = [];
    const errors: ValidationErrors | undefined | null =
      this.therapyForm.get('herceptinTherapy')?.errors;
    if (errors === null || errors === undefined) {
      this.herceptinTherapyHasErrors = false;
    } else {
      this.herceptinTherapyHasErrors = true;
      if (errors['required']) {
        this.herceptinTherapyErrors.push(
          'Broj ciklusa terapije herceptinom mora imati vrednost'
        );
      }
      if (errors['herceptinTherapy']) {
        this.herceptinTherapyErrors.push(errors['herceptinTherapy'].message);
      }
    }
  }

  onHerceptinCheckboxChange() {
    if (this.herceptinDisabled) {
      this.therapyForm.patchValue({
        herceptinTherapy: '',
      });
    } else {
      this.therapyForm.patchValue({
        herceptinTherapy: 'nije primenljivo',
      });
    }

    this.herceptinTherapyErrors = [];
    this.herceptinTherapyHasErrors = false;

    this.herceptinDisabled = !this.herceptinDisabled;
  }
}
