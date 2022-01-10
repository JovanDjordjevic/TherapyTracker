import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { Observable, Subscription } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { PatientService } from 'src/app/services/patient-service.service';
import { Tumor } from 'src/app/models/tumor.model';
import { Therapy } from 'src/app/models/therapy.model';
import { TumorService } from 'src/app/services/tumor.service';
import { TherapyService } from 'src/app/services/therapy.service';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare const $: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnDestroy {
  //@Input() patient: Patient;
  currentPatient: Patient;

  biopsies: Biopsy[] = []
  tumors: Tumor[] = []
  therapies: Therapy[] = []
  sub: Subscription = new Subscription;

  constructor(private patietnService: PatientService, private biopsyService: BiopsyService, private tumorService: TumorService, private therapyService: TherapyService) {

    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  );   
    this.currentPatient = patietnService.getCurrentPatient();

    //console.log(this.patient._id);  // error
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.currentPatient._id, 1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      console.log("all biopsies for patient: ", this.biopsies);
    });
    this.sub = this.tumorService.getAllTumorsForPatient(this.currentPatient._id, 1).subscribe((tumors: Tumor[]) => {
      this.tumors = tumors;
      console.log("all tumors for patient: ", this.tumors);
    });
    this.sub = this.therapyService.getAllTherapiesForPatient(this.currentPatient._id, 1).subscribe((therapies: Therapy[]) => {
      this.therapies = therapies;
      console.log("all therapies for patient: ", this.therapies);
    });
  }

  ngOnInit() {
    $('.menu .item').tab();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  genPDF() {
    const elem: HTMLElement | null = document.getElementById("pdfFormId");

    var html = htmlToPdfmake((elem as HTMLElement).innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
}
