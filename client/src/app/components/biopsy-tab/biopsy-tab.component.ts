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
  showBiopsyForm: boolean = false;
  showPatientInfo: boolean = true;
  showBiopsyInfo: boolean = false;

  //@Input() patient: Patient;
  patient: Patient;
  biopsy: Biopsy;

  @Input() biopsies: Biopsy[] = [];

  sub: Subscription = new Subscription;

  onShowBiopsyForm() {
    this.showBiopsyForm = !this.showBiopsyForm;
    this.showBiopsyInfo = false;
  }

  onBiopsySelected(value: any) {
    this.biopsy = value;
    this.showBiopsyForm = false;
    this.showBiopsyInfo = true;
  }

  onNewBiopsyAdded() {
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.patient._id, 1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      console.log("all biopsies for patient: ", this.biopsies);
    });
  }

  constructor(private patientService: PatientService, private biopsyService: BiopsyService) {
    this.biopsy = new Biopsy(new Date(), BiopsySide.Left, BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', '');
    this.patient = this.patientService.getCurrentPatient();
  }

  confirmDeletion() {
    if(confirm("Da li ste sigurni da zelite da izbrisete biopsiju?")) {
      this.sub = this.biopsyService.deleteBiopsyForPatient(this.patient._id, this.biopsy._id).subscribe( () => {
        this.onNewBiopsyAdded();
      });
      //console.log('yes')
    }
    else {
      //console.log('no')
    }
  }

  ngOnInit(): void { }
}
