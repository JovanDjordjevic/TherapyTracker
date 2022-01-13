import { Component, Input, OnInit } from '@angular/core';
import { Menopause, Patient } from 'src/app/models/patient.model';
import { Gradus, Her2Status, HER2_FISH_SICH, Tumor } from 'src/app/models/tumor.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { formattedDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-tumor-report',
  templateUrl: './tumor-report.component.html',
  styleUrls: ['./tumor-report.component.css']
})
export class TumorReportComponent implements OnInit {

  @Input() patient : Patient;
  @Input() tumor : Tumor;
  menopauseString : string = "";
  patientHistoryDate : string = "";
  diagnosisDate : string = "";
  today : string = formattedDate(new Date());
  tumorDate : string = "";

  constructor(private patientService : PatientService) { 
    this.patient = this.patientService.getCurrentPatient();
    this.tumor = new Tumor(new Date(), "neki tumor", "123/2021", Gradus.Type1, 1, 0.3, 1, 2, 0.4, 0, 4, 20, HER2_FISH_SICH.Unusable, Her2Status.One, "nepoznato", 2);
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
    this.tumorDate = formattedDate(this.tumor.date);
  }

}
