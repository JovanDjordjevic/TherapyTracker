import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient-service.service';
import { Patient } from '../../../models/patient.model';

declare const $: any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['../../../styles/table.css'],
})
export class PatientListComponent implements OnInit {
  @Input() patients: Patient[] = [];

  @Output() selectPatient = new EventEmitter<void>();
  @Output() loadMorePatients = new EventEmitter<string>();

  sub: Subscription = new Subscription()

  constructor(private patientService: PatientService) { }

  onScrollDown(ev: any) {
    this.loadMorePatients.emit("load more patients");
  }

  openHistory(patient: Patient) {
    // u ovom trenutku se postavlja pacijent globalno i ne mora da se radi input/output
    this.patientService.setCurrentPatient(patient);
    this.selectPatient.emit();
  }

  ngOnInit(): void {
  }
}
