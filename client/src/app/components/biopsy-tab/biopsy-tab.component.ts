import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Biopsy, BiopsyHistotype, BiopsySide, BiopsyType } from 'src/app/models/biopsy.model';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-biopsy-tab',
  templateUrl: './biopsy-tab.component.html',
  styleUrls: ['./biopsy-tab.component.css'],
})
export class BiopsyTabComponent implements OnInit {
  showBiopsyForm: boolean = false;
  showPatientInfo: boolean = true;
  showBiopsyInfo: boolean = false;

  //@Input() patient: Patient;
  patient: Patient;
  biopsy: Biopsy;
  @Input() biopsies: Biopsy[] = [];

  onShowBiopsyForm() {
    this.showBiopsyForm = !this.showBiopsyForm;
    this.showBiopsyInfo = false;
  }

  onBiopsySelected(value: any) {
    this.biopsy = value;
    this.showBiopsyForm = false;
    this.showBiopsyInfo = true;
  }

  constructor(private patientService: PatientService) {
    this.biopsy = new Biopsy(new Date(), BiopsySide.Left, BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', '');
    this.patient = this.patientService.getCurrentPatient();
  }

  ngOnInit(): void { }
}
