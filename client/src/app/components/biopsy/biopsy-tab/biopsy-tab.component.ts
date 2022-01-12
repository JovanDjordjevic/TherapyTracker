import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Biopsy, BiopsyHistotype, BiopsySide, BiopsyType } from 'src/app/models/biopsy.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { Subscription } from 'rxjs';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-biopsy-tab',
  templateUrl: './biopsy-tab.component.html',
  styleUrls: ['../../../styles/tab.css'],
})
export class BiopsyTabComponent implements OnInit {
  @Input() biopsies: Biopsy[] = [];
  BiopsySideEnum = BiopsySide;
  sub: Subscription = new Subscription;
  switch_expression = "patientInfo";
  @Input() patient: Patient;
  biopsy: Biopsy;
  counter: number = 2;

  biopsyFormUsedForUpdating: boolean = false;

  @Output() refreshBiopsies = new EventEmitter<void>();

  constructor(private patientService: PatientService, private biopsyService: BiopsyService) {
    this.biopsy = new Biopsy(new Date(), BiopsySide.Left, BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', BiopsyType.AxillaBiopsy, '', BiopsyHistotype.Type0, '', '');
    this.patient = this.patientService.getCurrentPatient();
  }

  onBiopsySelected(value: any) {
    this.biopsy = value;
    this.switch_expression = 'biopsyInfo';
  }

  onNewBiopsyAdded() {
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.patient._id, 1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      console.log("all biopsies for patient: ", this.biopsies);
      this.switch_expression = "patientInfo";
      this.refreshBiopsies.emit();
    });
  }

  onLoadMoreBiopsies(value: string) {
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.patient._id, this.counter).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = [...this.biopsies, ...biopsies];
      this.counter++;
    })
  };

  confirmDeletion() {
    if (confirm("Da li ste sigurni da zelite da izbrisete biopsiju?")) {
      this.sub = this.biopsyService.deleteBiopsyForPatient(this.patient._id, this.biopsy._id).subscribe(() => {
        this.patient._biopsyIds = this.patient._biopsyIds.filter( (id) => id != this.biopsy._id);
        this.onNewBiopsyAdded();
      });
      //console.log('yes')
    }
    else {
      //console.log('no')
    }
  }

  onClickUpdateBiopsyInfo() {
    //console.log('onClickUpdateTumorInfo')
    this.biopsyFormUsedForUpdating = true;
    this.switch_expression = "biopsyForm";
  }

  onBiopsyUpdated() {
    this.sub = this.biopsyService.getAllBiopsiesForPatient(this.patient._id, 1).subscribe((biopsies: Biopsy[]) => {
      this.biopsies = biopsies;
      this.switch_expression = "patientInfo";
      this.biopsyFormUsedForUpdating = false;
      this.refreshBiopsies.emit();
      console.log("all biopsies for patient: ", this.biopsies);
    });
  }

  backToPatient() {
    this.switch_expression = 'patientInfo'
    this.biopsyFormUsedForUpdating = false;
  }

  onClickGeneratePDF() {
    const elem: HTMLElement | null = document.getElementById("biopsyReport");
    var html = htmlToPdfmake((elem as HTMLElement).innerHTML);
    console.log(html)
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

  ngOnInit(): void { }
}
