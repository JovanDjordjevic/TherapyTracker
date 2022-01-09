import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { CommonService } from 'src/app/services/common.service';
import { PatientService } from 'src/app/services/patient-service.service';

declare const $: any;

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  @Input() patient: Patient;
  //patient: Patient;
  showFullText: boolean = false;

  constructor(private patientService: PatientService, private commonService: CommonService) {
    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  ); 
    this.patient = this.patientService.getCurrentPatient();
  }

  shortenText(text: string) {
    return text.substring(0, 50) + "...";
  }

  ngOnInit() {
    $('.menu .item').tab();
  }
}
