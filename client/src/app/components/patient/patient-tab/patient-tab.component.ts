import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { CommonService } from 'src/app/services/common.service';
import { PatientService } from 'src/app/services/patient-service.service';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['./patient-tab.component.css'],
})
export class PatientTabComponent implements OnInit , OnDestroy{
  //@Input() patient: Patient;
  patient: Patient;
  showPatientInfo: boolean = true;
  showClinicalStateForm: boolean = false;
  sub : Subscription = new Subscription();

  @Output() generatePDF: EventEmitter<any> = {} as EventEmitter<any>;

  constructor(private patientService: PatientService, private commonService : CommonService) {
    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  );
    this.patient = this.patientService.getCurrentPatient();
    // Ove ispise sacuvano klinicko stanje ali nece da ga ispise u tabeli
    console.log(this.patient);
    console.log(this.patient.mStage);
  }

  AddClinicalStateInfo() {
    this.showPatientInfo = !this.showPatientInfo;
    this.showClinicalStateForm = !this.showClinicalStateForm;
  }

  confirmDeletion() {
    if (confirm("Da li ste sigurni da zelite da izbrisete pacijenta?")) {
      this.sub = this.patientService.deletePatientFromDB(this.patient._id).subscribe(() => {
        this.commonService.sideBarItemClicked.emit('patients');
      });
    }
    else {
      //console.log('no')
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  genPDF() {
    const patientInfoElement: HTMLElement | null = document.getElementById("patientInfoId");
    
    html2canvas(patientInfoElement as HTMLElement).then(function (canvas) {
      var img = canvas.toDataURL("image/png")

      const doc = new jsPDF();
      doc.addImage(img, 'PNG', 19, 13, 172, 135);
      
      const clinicalStateElement: HTMLElement | null = document.getElementById("clinicalStateId");
      html2canvas(clinicalStateElement as HTMLElement).then(function (canvas) {
        var img = canvas.toDataURL("image/png")

        doc.addImage(img, 'PNG', 19, 158, 172, 56);
        doc.save("a4.pdf");

      })
    });
    
  }

  genPDF2() {
    /*const patientInfoElement: HTMLElement | null = document.getElementById("patientInfoId");

    var html = htmlToPdfmake((patientInfoElement as HTMLElement).innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();*/

    this.generatePDF.emit();
  }
}
