import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { Gender, Menopause } from 'src/app/models/patient.model';
import { Output, EventEmitter } from '@angular/core';
import { PatientService } from '../../../services/patient-service.service';
import { JMBGValidator } from 'src/app/validators/patient.validator';
import { Subscription } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit, OnDestroy {
  
  @Input() patient : Patient;
  @Input() usedAsUpdateForm : boolean = false;

  shouldDisplayMenopauseForm: boolean = false;
  patientForm: FormGroup;
  GenderEnum = Gender;
  MenopauseEnum = Menopause;

  sub: Subscription = new Subscription();

  @Output() onPatientFormFilled = new EventEmitter<void>();
  @Output() newPatientAdded = new EventEmitter<void>();
  @Output() patientUpdated = new EventEmitter<void>();


  jmbgHasErrors: boolean = false;
  nameHasErrors: boolean = false;
  parentNameHasErrors: boolean = false;
  surnameHasErrors: boolean = false;
  yearOfBirthHasErrors: boolean = false;
  genderHasErrors: boolean = false;
  menopauseHasErrors: boolean = false;
  addressHasErrors: boolean = false;
  cityHasErrors: boolean = false;
  contactHasErrors: boolean = false;
  emailHasErrors: boolean = false;
  tumorDateDiagnosisHasErrors: boolean = false;
  familyAnamnesisHasErrors: boolean = false;

  jmbgErrors: string[] = [];
  nameErrors: string[] = [];
  parentNameErrors: string[] = [];
  surnameErrors: string[] = [];
  yearOfBirthErrors: string[] = [];
  genderErrors: string[] = [];
  menopauseErrors: string[] = [];
  addressErrors: string[] = [];
  cityErrors: string[] = [];
  contactErrors: string[] = [];
  emailErrors: string[] = [];
  tumorDateDiagnosisErrors: string[] = [];
  familyAnamnesisErrors: string[] = [];

  constructor(private formBuilder: FormBuilder, private patientService: PatientService) {
    
    this.patient = this.patientService.getCurrentPatient();

    this.patientForm = this.formBuilder.group({
      jmbg: ['', [Validators.required, JMBGValidator]],
      name: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      yearOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      menopause: ['', []],  // za menopauzu mora u ovom fajlu validacija jer ponasnje zavisi do toga sta je selektovano 
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tumorDateDiagnosis: ['', [Validators.required]],
      familyAnamnesis: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    $('.ui.checkbox').checkbox();
    $('.ui.radio.checkbox').checkbox();

    if(this.usedAsUpdateForm) {
      console.log("update form:", this.patient)
      if(this.patient.gender === Gender.Female) {
        this.shouldDisplayMenopauseForm = true;
      }

      this.patientForm.patchValue({
        jmbg : this.patient.jmbg,
        name : this.patient.name,
        parentName : this.patient.parentName,
        surname : this.patient.surname,
        yearOfBirth : this.patient.yearOfBirth.toString(),
        gender : this.patient.gender,
        menopause : this.patient.menopause,
        address : this.patient.address,
        city : this.patient.city,
        contact : this.patient.contact,
        email : this.patient.email,
        tumorDateDiagnosis : new Date(this.patient.tumorDateDiagnosis).toISOString().slice(0,10),
        familyAnamnesis : this.patient.familyAnamnesis,
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onPatientFormSubmit() {
    // za validaciju bez Validators
    this.updateMenopauseErrors();
    if (this.menopauseHasErrors == true) {
      window.alert("Neka polja nemaju validnu vrednost");
      return;
    }

    if (this.patientForm.invalid) {
      window.alert("Neka polja nemaju validnu vrednost");
      this.updateJMBGErrors();
      this.updateNameErrors();
      this.updateParentNameErrors();
      this.updateSurnameErrors();
      this.updateYearOfBirthErrors();
      this.updateGenderErrors();
      this.updateAddressErrors();
      this.updateCityErrors();
      this.updateContactErrors();
      this.updateEmailErrors();
      this.updateTumorDateDiagnosisErrors();
      this.updateFamilyAnamnesisErrors();
      return;
    }

    this.jmbgHasErrors = false;
    this.nameHasErrors = false;
    this.parentNameHasErrors = false;
    this.surnameHasErrors = false;
    this.yearOfBirthHasErrors = false;
    this.genderHasErrors = false;
    this.menopauseHasErrors = false;
    this.addressHasErrors = false;
    this.cityHasErrors = false;
    this.contactHasErrors = false;
    this.emailHasErrors = false;
    this.tumorDateDiagnosisHasErrors = false;
    this.familyAnamnesisHasErrors = false;

    // zahtev:
    // console.log(this.patientForm);
    const data = this.patientForm.value;

    const newPatient = new Patient(
      data.jmbg, data.name, data.parentName, data.surname, data.yearOfBirth, data.gender, data.menopause,
      data.address, data.city, data.contact, data.email, data.tumorDateDiagnosis, data.familyAnamnesis
    );
    
    //console.log("Patient beeing added to DB: ", newPatient);
    if(this.usedAsUpdateForm){
      //update se postojeci
      newPatient._id = this.patient._id;
      this.sub = this.patientService.updatePatientInfo(newPatient).subscribe((updatedPatient: Patient) => {
        console.log('patient updated', updatedPatient);
        this.patientService.setCurrentPatient(updatedPatient);
        this.patientUpdated.emit();
      });
    }
    else {
      // dodaje se novi
      // NOTE/FIXME: kada se napise this.sub = ..ovo ispod... ovaj zahtev se ne izvrsi. Tj izvrsi se ali ne bude ubacen u bazu,
      // ako se samo ostavi .subscribe() kao sto je ovde, radi sve lepo, nisam nasao razlog
      this.patientService.insertPatientInDB(newPatient).subscribe((insertedPatient: Patient) => {
        console.log("Inserted patient: ", insertedPatient);
        this.newPatientAdded.emit();
      });
    }

  }

  updateJMBGErrors() {
    this.jmbgErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('jmbg')?.errors;
    if (errors === null || errors === undefined) {
      this.jmbgHasErrors = false;
    }
    else {
      this.jmbgHasErrors = true;
      if (errors['required']) {
        this.jmbgErrors.push("JMBG mora imati vrednost");
      }
      if (errors['jmbg']) {
        this.jmbgErrors.push(errors['jmbg'].message);
      }
    }
  }

  updateNameErrors() {
    this.nameErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('name')?.errors;
    if (errors === null || errors === undefined) {
      this.nameHasErrors = false;
    }
    else {
      this.nameHasErrors = true;
      if (errors['required']) {
        this.nameErrors.push("Ime mora imati vrednost");
      }
    }
  }

  updateParentNameErrors() {
    this.parentNameErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('parentName')?.errors;
    if (errors === null || errors === undefined) {
      this.parentNameHasErrors = false;
    }
    else {
      this.parentNameHasErrors = true;
      if (errors['required']) {
        this.parentNameErrors.push("Ime roditelja mora imati vrednost");
      }
    }
  }

  updateSurnameErrors() {
    this.surnameErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('surname')?.errors;
    if (errors === null || errors === undefined) {
      this.surnameHasErrors = false;
    }
    else {
      this.surnameHasErrors = true;
      if (errors['required']) {
        this.surnameErrors.push("Prezime mora imati vrednost");
      }
    }
  }

  updateYearOfBirthErrors() {
    this.yearOfBirthErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('yearOfBirth')?.errors;
    if (errors === null || errors === undefined) {
      this.yearOfBirthHasErrors = false;
    }
    else {
      this.yearOfBirthHasErrors = true;
      if (errors['required']) {
        this.yearOfBirthErrors.push("Godina rodjenja mora imati vrednost");
      }
    }
  }

  updateGenderErrors() {
    this.genderErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('gender')?.errors;
    if (errors === null || errors === undefined) {
      this.genderHasErrors = false;
    }
    else {
      this.genderHasErrors = true;
      if (errors['required']) {
        this.genderErrors.push("Pol mora imati vrednost");
      }
    }
  }

  updateMenopauseErrors() {
    this.menopauseErrors = [];
    const menopauseValue = this.patientForm.get('menopause')?.value;
    // female
    if (this.shouldDisplayMenopauseForm) {
      if (menopauseValue != Menopause.Pre && menopauseValue != Menopause.Peri && menopauseValue != Menopause.Post) {
        this.menopauseHasErrors = true;
        this.menopauseErrors.push("Za pacijente zenskog pola mora biti unet podatak o menopauzi");
      }
      else {
        this.menopauseHasErrors = false;
      }
    }
    else {
      // ovo nebi trebalo ni da se desi ikad
      if (menopauseValue != Menopause.None) {
        this.menopauseHasErrors = true;
        this.menopauseErrors.push("Pcijenti muskog pola ne mogu imati podatak o menopauzi");
      }
      else {
        this.menopauseHasErrors = false;
      }
    }
  }

  updateAddressErrors() {
    this.addressErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('address')?.errors;
    if (errors === null || errors === undefined) {
      this.addressHasErrors = false;
    }
    else {
      this.addressHasErrors = true;
      if (errors['required']) {
        this.addressErrors.push("Adresa mora imati vrednost");
      }
    }
  }

  updateCityErrors() {
    this.cityErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('city')?.errors;
    if (errors === null || errors === undefined) {
      this.cityHasErrors = false;
    }
    else {
      this.cityHasErrors = true;
      if (errors['required']) {
        this.cityErrors.push("Grad mora imati vrednost");
      }
    }
  }

  updateContactErrors() {
    this.contactErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('contact')?.errors;
    if (errors === null || errors === undefined) {
      this.contactHasErrors = false;
    }
    else {
      this.contactHasErrors = true;
      if (errors['required']) {
        this.contactErrors.push("Kontakt telefon mora biti unet");
      }
    }
  }

  updateEmailErrors() {
    this.emailErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('email')?.errors;
    if (errors === null || errors === undefined) {
      this.emailHasErrors = false;
    }
    else {
      this.emailHasErrors = true;
      if (errors['required']) {
        this.emailErrors.push("Imejl adresa mora biti uneta");
      }
      if (errors['email']) {
        this.emailErrors.push("Imejl adresa mora biti u validnom formatu");
      }
    }
  }

  updateTumorDateDiagnosisErrors() {
    this.tumorDateDiagnosisErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('tumorDateDiagnosis')?.errors;
    if (errors === null || errors === undefined) {
      this.tumorDateDiagnosisHasErrors = false;
    }
    else {
      this.tumorDateDiagnosisHasErrors = true;
      if (errors['required']) {
        this.tumorDateDiagnosisErrors.push("Datum dijagnostikovanja tumora mora biti unet");
      }
    }
  }

  updateFamilyAnamnesisErrors() {
    this.familyAnamnesisErrors = [];
    const errors: ValidationErrors | undefined | null = this.patientForm.get('familyAnamnesis')?.errors;
    if (errors === null || errors === undefined) {
      this.familyAnamnesisHasErrors = false;
    }
    else {
      this.familyAnamnesisHasErrors = true;
      if (errors['required']) {
        this.familyAnamnesisErrors.push("Porodicna anamnzeza mora biti uneta");
      }
    }
  }


  onFemaleChecked() {
    this.shouldDisplayMenopauseForm = true;
    this.patientForm.patchValue({ 'menopause': Menopause.None });
    this.menopauseErrors = [];
    this.menopauseHasErrors = false;
  }

  onMaleChecked() {
    this.shouldDisplayMenopauseForm = false;
    this.patientForm.patchValue({ 'menopause': Menopause.None });
    this.menopauseErrors = [];
    this.menopauseHasErrors = false;
  }
}
