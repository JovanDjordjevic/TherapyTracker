import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { Therapy, TherapyType } from 'src/app/models/therapy.model';
import { PatientService } from 'src/app/services/patient-service.service';
import { TherapyService } from 'src/app/services/therapy.service';
import { tabComponent } from 'src/app/models/enums.model';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-treatment-tab',
  templateUrl: './treatment-tab.component.html',
  styleUrls: ['../../../styles/tab.css'],
})
export class TreatmentTabComponent implements OnInit {
  @Input() therapies: Therapy[] = [];
  sub: Subscription = new Subscription;
  tabComponent = tabComponent;
  component = tabComponent.PatientInfo;
  counter: number = 2;
  therapy: Therapy;
  @Input() patient: Patient;

  therapyFormUsedForUpdating: boolean = false;

  @Output() refreshTherapies = new EventEmitter<void>();

  constructor(private therapyService: TherapyService, private patientService: PatientService) {
    this.therapy = new Therapy(new Date, 2, TherapyType.AC, 3, 2, "2", "temp", "neki komentar");
    this.patient = this.patientService.getCurrentPatient();
  }

  ngOnInit(): void { }

  onNewTherapyAdded() {
    this.sub = this.therapyService.getAllTherapiesForPatient(this.patient._id, 1).subscribe((therapies: Therapy[]) => {
      this.therapies = therapies;
      this.component = tabComponent.PatientInfo;
      this.refreshTherapies.emit();
    });
  }

  onTherapySelected(value: any) {
    this.therapy = value;
    this.component = tabComponent.Info;
  }

  onLoadMoreTherapies() {
    this.sub = this.therapyService.getAllTherapiesForPatient(this.patient._id, this.counter).subscribe((therapies: Therapy[]) => {
      this.therapies = [...this.therapies, ...therapies];
      this.counter++;
    })
  };

  confirmDeletion() {
    if (confirm("Da li ste sigurni da zelite da izbrisete terapiju?")) {
      this.sub = this.therapyService.deleteTherapyForPatient(this.patient._id, this.therapy._id).subscribe(() => {
        this.patient._therapyIds = this.patient._therapyIds.filter((id) => id != this.therapy._id);
        this.onNewTherapyAdded();
      });
    }
    else {
    }
  }

  onClickUpdateTherapyInfo() {
    this.therapyFormUsedForUpdating = true;
    this.component = tabComponent.Form;
  }

  onTherapyUpdated() {
    this.sub = this.therapyService.getAllTherapiesForPatient(this.patient._id, 1).subscribe((therapies: Therapy[]) => {
      this.therapies = therapies;
      this.component = tabComponent.PatientInfo;
      this.therapyFormUsedForUpdating = false;
      this.refreshTherapies.emit();
    });
  }

  backToPatient() {
    this.component = tabComponent.PatientInfo;
    this.therapyFormUsedForUpdating = false;
  }

  onClickGeneratePDF() {
    const elem: HTMLElement | null = document.getElementById("therapyReport");
    var html = htmlToPdfmake((elem as HTMLElement).innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
}
