import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Biopsy, BiopsyHistotype, BiopsySide, BiopsyType } from 'src/app/models/biopsy.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-biopsy-tab',
  templateUrl: './biopsy-tab.component.html',
  styleUrls: ['./biopsy-tab.component.css'],
})
export class BiopsyTabComponent implements OnInit {
  @Input() biopsies: Biopsy[] = [];
  BiopsySideEnum = BiopsySide;
  sub: Subscription = new Subscription;
  switch_expression = "patientInfo";
  patient: Patient;
  biopsy: Biopsy;
  counter: number = 2;

  biopsyFormUsedForUpdating : boolean = false;

  constructor(private patientService: PatientService, private biopsyService: BiopsyService) {
    this.biopsy = new Biopsy(new Date(), BiopsySide.Left, BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', '');
    this.patient = this.patientService.getCurrentPatient();
  }

  onBiopsySelected(value: any) {
    this.biopsy = value;
    this.switch_expression = 'biopsyInfo';
  }

  onNewBiopsyAdded() {
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.patient._id, 1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      console.log("all biopsies for patient: ", this.biopsies);
      this.switch_expression = "patientInfo";
    });
  }

  onLoadMoreBiopsies(value: string) {
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.patient._id, this.counter).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = [...this.biopsies, ...biopsies];
      this.counter++;
    })
  };

  confirmDeletion() {
    if (confirm("Da li ste sigurni da zelite da izbrisete biopsiju?")) {
      this.sub = this.biopsyService.deleteBiopsyForPatient(this.patient._id, this.biopsy._id).subscribe(() => {
        this.onNewBiopsyAdded();
      });
      //console.log('yes')
    }
    else {
      //console.log('no')
    }
  }

  onClickUpdateBiopsyInfo(){
    //console.log('onClickUpdateTumorInfo')
    this.biopsyFormUsedForUpdating = true;
    this.switch_expression = "biopsyForm";
  }

  onBiopsyUpdated(){
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.patient._id, 1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      console.log("all biopsies for patient: ", this.biopsies);
    });
    this.switch_expression = "patientInfo";
    this.biopsyFormUsedForUpdating = false;
  }

  backToPatient() {
    this.switch_expression = 'patientInfo'
    this.biopsyFormUsedForUpdating = false;
  }

  ngOnInit(): void { }
}
