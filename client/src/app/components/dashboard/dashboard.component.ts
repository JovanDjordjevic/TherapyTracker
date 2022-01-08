import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { Therapy } from 'src/app/models/therapy.model';
import { Tumor } from 'src/app/models/tumor.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { CommonService } from 'src/app/services/common.service';
import { PatientService } from 'src/app/services/patient-service.service';
import { TherapyService } from 'src/app/services/therapy.service';
import { TumorService } from 'src/app/services/tumor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;

  //patients: Patient[] = [];
  allPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  biopsies: Biopsy[] = [];
  tumors: Tumor[] = [];
  treatments: Therapy[] = [];
  switch_expression: string = 'main';
  counter: number = 2;

  patient: Patient;
  patientsSub: Subscription = new Subscription();
  patientSearchSub: Subscription = new Subscription();
  biopsiesSub: Subscription = new Subscription();
  tumorsSub: Subscription = new Subscription();
  treatmentsSub: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private patientsService: PatientService, private biopsyService: BiopsyService,
    private tumorService: TumorService, private therapyService: TherapyService, private commonService: CommonService) {

    this.searchForm = this.formBuilder.group({
      searchParam: ['', []],
    });

    this.getAllPatients();

    this.patient = this.patientsService.getCurrentPatient();

    this.getAllDataForPatient();

    this.commonService.sideBarItemClicked.subscribe((data: any) => {
      this.counter = 2;
      this.switch_expression = data;
      this.getAllPatients();
      this.getAllDataForPatient();
      console.log("clicked on patients")
    })
  }

  onNewPatientAdded() {
    this.getAllPatients();
    this.switch_expression = 'patients';
  }

  getAllPatients() {
    this.patientsSub = this.patientsService.getAllPatients(1).subscribe((patients: Patient[]) => {
      this.allPatients = patients;
      this.filteredPatients = patients;
      this.patientsService.setCurrentPatient(this.allPatients[0]);
      //console.log("dashboard constructor, getAllPatients zahtev: ", this.allPatients);    // radi dobro
    });
    //this.onDisplayAllPatientsList.emit();
    //this.switch_expression = 'patients'
  }

  getAllDataForPatient() {
    this.biopsiesSub = this.biopsyService.getAllBiopsies(1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      //console.log("dashboard constructor, getAllBiopsies zahtev: ", this.biopsies);    // radi dobro
    });

    this.tumorsSub = this.tumorService.getAllTumors(1).subscribe((tumors: Tumor[]) => {
      this.tumors = tumors;
      //console.log("dashboard constructor, getAllTumors zahtev: ", this.tumors);    // radi dobro
    });

    this.treatmentsSub = this.therapyService.getAllTherapies(1).subscribe((therapies: Therapy[]) => {
      this.treatments = therapies;
      //console.log("dashboard constructor, getAllTherapies zahtev: ", this.treatments);    // radi dobro
    });
  }

  onSearchSubmit() {
    this.filteredPatients = [];
    const searchParam = this.searchForm.get('searchParam')?.value.toLowerCase().trim();
    //console.log("param ", searchParam)

    if (searchParam === '') {
      //console.log('empty search param');
      this.filteredPatients = this.allPatients;
      this.counter = 2;
    }
    else {
      this.patientsSub = this.patientsService.searchForPatients(searchParam, 1).subscribe((patients: Patient[]) => {
        this.filteredPatients = patients;
        //console.log("search request results: ", this.filteredPatients);    // radi dobro
      });
    }
  }

  onPatientSelected() {
    this.switch_expression = 'tabs';
  }

  onLoadMoreBiopsies(value: string) {
    console.log(value)
    this.biopsiesSub = this.biopsyService.getAllBiopsies(this.counter).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = [...this.biopsies, ...biopsies];
      this.counter++;
    })
  };

  onLoadMorePatients(value: string) {
    this.patientsSub = this.patientsService.getAllPatients(this.counter).subscribe((patients: Patient[]) => {
      this.filteredPatients = [...this.filteredPatients, ...patients];
      this.counter++;
    })
  }

  onLoadMoreTumors(value: string) {
    this.tumorsSub = this.tumorService.getAllTumors(this.counter).subscribe((tumors: Tumor[]) => {
      this.tumors = [...this.tumors, ...tumors];
      this.counter++;
    })
  }

  onLoadMoreTherapies(value: string) {
    this.treatmentsSub = this.therapyService.getAllTherapies(this.counter).subscribe((therapies: Therapy[]) => {
      this.treatments = [...this.treatments, ...therapies];
      this.counter++;
    })
  };

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.patientsSub.unsubscribe();
    this.patientSearchSub.unsubscribe();
    this.biopsiesSub.unsubscribe();
    this.tumorsSub.unsubscribe();
    this.treatmentsSub.unsubscribe();
  }
}
