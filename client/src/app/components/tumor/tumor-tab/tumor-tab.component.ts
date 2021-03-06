import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { Gradus, HER2_FISH_SICH, Tumor } from 'src/app/models/tumor.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { TumorService } from 'src/app/services/tumor.service';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { tabComponent } from 'src/app/models/enums.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tumor-tab',
  templateUrl: './tumor-tab.component.html',
  styleUrls: ['../../../styles/tab.css'],
})
export class TumorTabComponent implements OnInit {
  tabComponent = tabComponent
  component = tabComponent.PatientInfo;
  sub: Subscription = new Subscription;
  @Input() tumors: Tumor[] = [];
  tumor: Tumor;
  @Input() patient: Patient;
  counter: number = 2;

  tumorFormUsedForUpdating: boolean = false;

  @Output() refreshTumors = new EventEmitter<void>();

  constructor(private tumorService: TumorService, private patientService: PatientService) {
    this.patient = this.patientService.getCurrentPatient();
    this.tumor = new Tumor(new Date(), "", "", Gradus.Type1, 0, 0, 0, 0, 0, 0, 0, 0, HER2_FISH_SICH.Negative, 0, "", 0);
  }

  ngOnInit(): void { }

  onShowTumorForm() {
    this.component = tabComponent.Form;
  }

  onTumorSelected(value: any) {
    this.tumor = value;
    this.component = tabComponent.Info;
  }

  onNewTumorAdded() {
    this.sub = this.tumorService.getAllTumorsForPatient(this.patient._id, 1).subscribe((tumors: Tumor[]) => {
      this.tumors = tumors;
      this.component = tabComponent.PatientInfo;
      this.refreshTumors.emit();
    });
  }

  onLoadMoreTumors() {
    this.sub = this.tumorService.getAllTumorsForPatient(this.patient._id, this.counter).subscribe((tumors: Tumor[]) => {
      this.tumors = [...this.tumors, ...tumors];
      this.counter++;
    })
  };

  confirmDeletion() {
    if (confirm("Da li ste sigurni da zelite da izbrisete tumor?")) {
      this.sub = this.tumorService.deleteTumorForPatient(this.patient._id, this.tumor._id).subscribe(() => {
        this.patient._tumorIds = this.patient._tumorIds.filter((id) => id != this.tumor._id);
        this.onNewTumorAdded();
      });
    }
    else {
    }
  }

  onClickUpdateTumorInfo() {
    this.tumorFormUsedForUpdating = true;
    this.component = tabComponent.Form;
  }

  onTumorUpdated() {
    this.sub = this.tumorService.getAllTumorsForPatient(this.patient._id, 1).subscribe((tumors: Tumor[]) => {
      this.tumors = tumors;
      this.component = tabComponent.PatientInfo;
      this.tumorFormUsedForUpdating = false;
      this.refreshTumors.emit();
    });
  }

  backToPatient() {
    this.component = tabComponent.PatientInfo
    this.tumorFormUsedForUpdating = false;
  }

  onClickGeneratePDF() {
    const elem: HTMLElement | null = document.getElementById("tumorReport");
    var html = htmlToPdfmake((elem as HTMLElement).innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
}
