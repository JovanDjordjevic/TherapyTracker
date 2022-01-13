import { Component, Input, OnInit } from '@angular/core';
import { Biopsy, BiopsyHistotype, BiopsySide, BiopsyType } from 'src/app/models/biopsy.model';
import { Menopause, Patient, TStage } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { formattedDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-biopsy-report',
  templateUrl: './biopsy-report.component.html',
  styleUrls: ['./biopsy-report.component.css']
})
export class BiopsyReportComponent implements OnInit {

  @Input() patient: Patient;
  @Input() biopsy: Biopsy;
  menopauseString: string = "";
  patientHistoryDate: string = "";
  diagnosisDate: string = "";
  today: string = formattedDate(new Date());

  BiopsySideEnum = BiopsySide;

  constructor(private patientService: PatientService) {
    this.patient = this.patientService.getCurrentPatient();
    this.biopsy = new Biopsy(new Date(), BiopsySide.Left, BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', '');
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
  }

}
