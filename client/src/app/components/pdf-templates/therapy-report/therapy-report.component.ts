import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
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
    this.therapy = new Therapy(new Date, 2, TherapyType.AC, false, 3, 2, "2", "neki komentar");
  }

  ngOnInit(): void {
    if(this.patient.gender == 'z') {
      switch (this.patient.menopause) {
        case 1:
          this.menopauseString = "Pre"
          break;
        case 2:
          this.menopauseString = "Post"
          break;
        case 3:
          this.menopauseString = "Peri"
          break;
        default:
          break;
      }
    }

    this.patientHistoryDate = formattedDate(this.patient.date);
    this.diagnosisDate = formattedDate(this.patient.tumorDateDiagnosis);
    this.therapyStartDate = formattedDate(this.therapy.date);
    
    this.therapyShortString = this.therapy.numCycles + this.therapy.therapyType;
    if(this.therapy.numTaxol > 0) {
      this.therapyShortString += "+" + this.therapy.numTaxol + "TAXOL";
    }

    if(this.therapy.numTxtr > 0) {
      this.therapyShortString += "+" + this.therapy.numTxtr + "TXTR";
    }

    if(this.therapy.herceptinTherapy != 'nije primenljivo') {
      this.therapyShortString += "+" + this.therapy.herceptinTherapy + "H";
    }
  }
}