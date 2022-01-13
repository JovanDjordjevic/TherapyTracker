import { Component, Input, OnInit } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { CommonService } from 'src/app/services/common.service';
import { PatientService } from 'src/app/services/patient-service.service';
import { formattedDate } from 'src/app/utils/utils';

declare const $: any;

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  @Input() patient: Patient;
  GenderEnum = Gender;
  showFullText: boolean = false;
  menopauseString : string = "";

  constructor(private patientService: PatientService, private commonService: CommonService) {
    this.patient = this.patientService.getCurrentPatient();
  }

  ngOnInit() {
    $('.menu .item').tab();
    switch (this.patient.menopause) {
      case Menopause.Pre:
        this.menopauseString = "Pre";
        break;
      case Menopause.Post:
        this.menopauseString = "Post";
        break;
      case Menopause.Peri:
        this.menopauseString = "Peri";
        break;
      default:
        this.menopauseString = "Nema";
        break;
    }
  }

  shortenText(text: string) {
    return text.substring(0, 50) + "...";
  }

  formatDate(date: Date) {
    return formattedDate(date);
  }
}
