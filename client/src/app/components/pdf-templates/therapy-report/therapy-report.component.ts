import { Component, Input, OnInit } from '@angular/core';
import { Menopause, Patient } from 'src/app/models/patient.model';
import { Therapy, TherapyType } from 'src/app/models/therapy.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { formattedDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-therapy-report',
  templateUrl: './therapy-report.component.html',
  styleUrls: ['./therapy-report.component.css']
})
export class TherapyReportComponent implements OnInit {

  @Input() patient : Patient;
  @Input() therapy : Therapy;
  menopauseString : string = "";
  patientHistoryDate : string = "";
  diagnosisDate : string = "";
  today : string = formattedDate(new Date());
  therapyStartDate : string = "";
  therapyShortString : string = "";

  constructor(private patientService : PatientService) { 
    this.patient = this.patientService.getCurrentPatient();
    this.therapy = new Therapy(new Date, 2, TherapyType.AC, 3, 2, "2", "temp", "neki komentar");
  }

  ngOnInit(): void {
    if (this.patient.gender == 'z') {
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

    this.patientHistoryDate = formattedDate(this.patient.date);
    this.diagnosisDate = formattedDate(this.patient.tumorDateDiagnosis);
    this.therapyStartDate = formattedDate(this.therapy.date);
  }
}