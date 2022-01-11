import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { CommonService } from 'src/app/services/common.service';
import { PatientService } from 'src/app/services/patient-service.service';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['../../../styles/tab.css'],
})
export class PatientTabComponent implements OnInit, OnDestroy {
  patient: Patient;
  sub: Subscription = new Subscription();

  switch_expression = "patientInfo";
  patientFormUsedForUpdating: boolean = false;
  clinicalStateFormUsedForUpdating: boolean = false;

  // kada se ovo desi, ostali tabovi moraju da ponovo dohvate current patienta iz patient servisa
  @Output() patientHasBeenUpdated = new EventEmitter<void>();

  @Output() generatePDF: EventEmitter<any> = new EventEmitter<any>();

  constructor(private patientService: PatientService, private commonService : CommonService) {
    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  );
    this.patient = this.patientService.getCurrentPatient();
  }

  onClinicalStateUpdated() {
    this.backToPatient();
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

  onClickUpdateClinicalState() {
    if (this.patient.isClinicalStateSet) {
      this.clinicalStateFormUsedForUpdating = true;
    }
    this.switch_expression = 'clinicalStateForm';
  }

  onClickUpdatePatientInfo() {
    //console.log('onClickUpdateTherapyInfo')
    this.patientFormUsedForUpdating = true;
    this.switch_expression = "patientFormForUpdate";
  }

  onPatientUpdated() {
    this.patient = this.patientService.getCurrentPatient();
    this.switch_expression = "patientInfo";
    this.patientFormUsedForUpdating = false;
    this.patientHasBeenUpdated.emit();
  }

  backToPatient() {
    this.switch_expression = 'patientInfo'
    this.patientFormUsedForUpdating = false;
    this.clinicalStateFormUsedForUpdating = false;
  }

  ngOnInit(): void { }

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
