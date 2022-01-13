import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { Observable, Subscription } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { PatientService } from 'src/app/services/patient-service.service';
import { Tumor } from 'src/app/models/tumor.model';
import { Therapy } from 'src/app/models/therapy.model';
import { TumorService } from 'src/app/services/tumor.service';
import { TherapyService } from 'src/app/services/therapy.service';
import { formatDate } from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnDestroy {
  patient: Patient;

  biopsies: Biopsy[] = []
  tumors: Tumor[] = []
  therapies: Therapy[] = []
  sub: Subscription = new Subscription;

  lastBiopsyDate: string = "";
  numberOfBiopsies: number = 0;
  lastTumorDate: string = "";
  numberOfTumors: number = 0;
  lastTherapyDate: string = "";
  numberOfTherapies: number = 0;

  constructor(private patientService: PatientService, private biopsyService: BiopsyService, private tumorService: TumorService, private therapyService: TherapyService) {
    this.patient = this.patientService.getCurrentPatient();
    this.getInitialBiopsiesForPatient();
    this.getInitialTumorsForPatient();
    this.getInitialTherapiesForPatient();
  }

  ngOnInit() {
    $('.menu .item').tab();
    this.patient = this.patientService.getCurrentPatient();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getInitialBiopsiesForPatient() {
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.patient._id, 1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      this.numberOfBiopsies = this.patient._biopsyIds.length;
      if (this.numberOfBiopsies > 0) {
        this.lastBiopsyDate = formatDate(biopsies[0].date, 'dd/MM/yyyy', 'en-US');
      }
      else {
        this.lastBiopsyDate = "/";
      }
    });
  }

  getInitialTumorsForPatient() {
    this.sub = this.tumorService.getAllTumorsForPatient(this.patient._id, 1).subscribe((tumors: Tumor[]) => {
      this.tumors = tumors;
      this.numberOfTumors = this.patient._tumorIds.length;
      if (this.numberOfTumors > 0) {
        this.lastTumorDate = formatDate(tumors[0].date, 'dd/MM/yyyy', 'en-US');
      }
      else {
        this.lastTumorDate = "/";
      }
    });
  }

  getInitialTherapiesForPatient() {
    this.sub = this.therapyService.getAllTherapiesForPatient(this.patient._id, 1).subscribe((therapies: Therapy[]) => {
      this.therapies = therapies;
      this.numberOfTherapies = this.patient._therapyIds.length;
      if (this.numberOfTherapies > 0) {
        this.lastTherapyDate = formatDate(therapies[0].date, 'dd/MM/yyyy', 'en-US');
      }
      else {
        this.lastTherapyDate = "/";
      }
    });
  }

  onPatientFormHasBeenUpdated() {
    this.patient = this.patientService.getCurrentPatient();
  }

  refreshBiopsies() {
    this.getInitialBiopsiesForPatient();
  }

  refreshTherapies() {
    this.getInitialTherapiesForPatient();
  }

  refreshTumors() {
    this.getInitialTumorsForPatient();
  }
}
