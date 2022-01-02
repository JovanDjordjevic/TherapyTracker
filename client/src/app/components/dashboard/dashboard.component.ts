import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { Therapy } from 'src/app/models/therapy.model';
import { Tumor } from 'src/app/models/tumor.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { PatientService } from 'src/app/services/patient-service.service';
import { TherapyService } from 'src/app/services/therapy.service';
import { TumorService } from 'src/app/services/tumor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Input() displayHome : boolean = false;

  @Output() onDisplayAllPatientsList = new EventEmitter<void>();   
  @Input() displayAllPatientsList: boolean = false;
  
  @Output() onDisplayPatientForm = new EventEmitter<void>();
  @Input() displayPatientForm: boolean = false;

  @Output() onDisplayPatientHistory = new EventEmitter<void>();
  @Input() displayPatientHistory: boolean = false;

  @Output() onDisplayAllBiopsiesList = new EventEmitter<void>();   
  @Input() diplayAllBiopsiesList : boolean = false;
  
  @Output() onDisplayAllTumorsList = new EventEmitter<void>();
  @Input() displayAllTumorsList : boolean = false;
  
  @Output() onDisplayAllTreatmentsList = new EventEmitter<void>();
  @Input() displayAllTreatmentsList : boolean = false;

  patients: Patient[] = [];
  biopsies : Biopsy[] = [];
  tumors : Tumor[] = [];
  treatments : Therapy[] = [];

  patient: Patient;
  patientsSub: Subscription = new Subscription();
  biopsiesSub: Subscription = new Subscription();
  tumorsSub: Subscription = new Subscription();
  treatmentsSub: Subscription = new Subscription();


  constructor(private patientsService: PatientService, private biopsyService : BiopsyService, 
              private tumorService : TumorService, private therapyService : TherapyService) {
    this.patientsSub = this.patientsService.getAllPatients(1).subscribe((patients: Patient[]) => {
        this.patients = patients;
        this.patientsService.setCurrentPatient(this.patients[0]);
        //console.log("dashboard constructor, getAllPatients zahtev: ", this.patients);    // radi dobro
      });

    this.patient = this.patientsService.getCurrentPatient();

    this.biopsiesSub = this.biopsyService.getAllBiopsies(1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      //console.log("dashboard constructor, getAllBiopsies zahtev: ", this.biopsies);    // radi dobro
    });

    this.tumorsSub = this.tumorService.getAllTumors(1).subscribe((tumors: Tumor[]) => {
      this.tumors = tumors ;
      //console.log("dashboard constructor, getAllTumors zahtev: ", this.tumors);    // radi dobro
    });

    this.treatmentsSub = this.therapyService.getAllTherapies(1).subscribe((therapies: Therapy[]) => {
      this.treatments = therapies;
      //console.log("dashboard constructor, getAllTherapies zahtev: ", this.treatments);    // radi dobro
    });
  
  }

  onPatientFormFilled() {
    //console.log("onPatientFormFilled");
    this.onDisplayAllPatientsList.emit();
  }
  
  showAllPatientsClicked(){
    //console.log("showAllPatientsClicked")
    this.onDisplayAllPatientsList.emit();
  }

  addNewPatientClicked() {
    //console.log("addNewPatientClicked")
    this.onDisplayPatientForm.emit();
  }

  onPatientSelected() {
    //console.log("onPatientSelected")
    this.onDisplayPatientHistory.emit();
  }

  showAllBiopsiessClicked(){
    //console.log("showAllBiopsiessClicked")
    this.onDisplayAllBiopsiesList.emit();
  }

  showAllTumorsClicked(){
    //console.log("showAllTumorsClicked")
    this.onDisplayAllTumorsList.emit();
  }

  showAllTreatmentsClicked(){
    //console.log("showAllTreatmentsClicked")
    this.onDisplayAllTreatmentsList.emit();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.patientsSub.unsubscribe();
    this.biopsiesSub.unsubscribe();
    this.tumorsSub.unsubscribe();
    this.treatmentsSub.unsubscribe();
  }
}
