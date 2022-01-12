import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { Patient } from 'src/app/models/patient.model';
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

  allPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  biopsies: Biopsy[] = [];
  tumors: Tumor[] = [];
  treatments: Therapy[] = [];
  switch_expression: string = 'main';
  counter: number = 2;

  patient: Patient;
  sub: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private patientsService: PatientService, private biopsyService: BiopsyService,
    private tumorService: TumorService, private therapyService: TherapyService, private commonService: CommonService) {

    this.searchForm = this.formBuilder.group({
      searchParam: ['', []],
    });

    this.getAllPatients();

    this.patient = this.patientsService.getCurrentPatient();

    this.getAllDataForPatients();

    this.commonService.sideBarItemClicked.subscribe((data: any) => {
      this.counter = 2;
      this.switch_expression = data;
      this.getAllPatients();
      this.getAllDataForPatients();
      console.log("clicked on patients")
    })
  }

  onNewPatientAdded() {
    this.counter = 2;
    this.getAllPatients();
    this.switch_expression = 'patients';
  }

  getAllPatients() {
    this.sub = this.patientsService.getAllPatients(1).subscribe((patients: Patient[]) => {
      this.allPatients = patients;
      this.filteredPatients = patients;
      this.patientsService.setCurrentPatient(this.allPatients[0]);
    });
  }

  getAllDataForPatients() {
    this.sub = this.biopsyService.getAllBiopsies(1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
    });

    this.sub = this.tumorService.getAllTumors(1).subscribe((tumors: Tumor[]) => {
      this.tumors = tumors;
    });

    this.sub = this.therapyService.getAllTherapies(1).subscribe((therapies: Therapy[]) => {
      this.treatments = therapies;
    });
  }

  onSearchSubmit() {
    this.filteredPatients = [];
    const searchParam = this.searchForm.get('searchParam')?.value.toLowerCase().trim();

    if (searchParam === '') {
      this.filteredPatients = this.allPatients;
      this.counter = 2;
    }
    else {
      this.sub = this.patientsService.searchForPatients(searchParam, 1).subscribe((patients: Patient[]) => {
        this.filteredPatients = patients;
      });
    }
  }

  onPatientSelected() {
    this.switch_expression = 'tabs';
  }

  onLoadMoreBiopsies(value: string) {
    console.log(value)
    this.sub = this.biopsyService.getAllBiopsies(this.counter).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = [...this.biopsies, ...biopsies];
      this.counter++;
    })
  };

  onLoadMorePatients(value: string) {
    this.sub = this.patientsService.getAllPatients(this.counter).subscribe((patients: Patient[]) => {
      this.filteredPatients = [...this.filteredPatients, ...patients];
      this.counter++;
    })
  }

  onLoadMoreTumors(value: string) {
    this.sub = this.tumorService.getAllTumors(this.counter).subscribe((tumors: Tumor[]) => {
      this.tumors = [...this.tumors, ...tumors];
      this.counter++;
    })
  }

  onLoadMoreTherapies(value: string) {
    this.sub = this.therapyService.getAllTherapies(this.counter).subscribe((therapies: Therapy[]) => {
      this.treatments = [...this.treatments, ...therapies];
      this.counter++;
    })
  };

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
