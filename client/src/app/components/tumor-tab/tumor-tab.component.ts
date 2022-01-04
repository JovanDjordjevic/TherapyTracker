import { Component, Input, OnInit } from '@angular/core';
import { Gradus, HER2_FISH_SICH, Tumor } from 'src/app/models/tumor.model';
import { TumorFormComponent } from '../tumor-form/tumor-form.component';

@Component({
  selector: 'app-tumor-tab',
  templateUrl: './tumor-tab.component.html',
  styleUrls: ['./tumor-tab.component.css'],
})
export class TumorTabComponent implements OnInit {
  showTumorForm: boolean = false;
  showTumorInfo: boolean = false;
  switch_expression = "patientInfo";
  @Input() tumors: Tumor[] = [];
  tumor: Tumor;

  onShowTumorForm() {
    this.switch_expression = "tumorForm";
  }

  onTumorSelected(value: any) {
    this.tumor = value;
    this.switch_expression = "tumorInfo";
  }

  constructor() {
    this.tumor = new Tumor(new Date(), "", "", Gradus.Type1, 0, 0, 0, 0, 0, 0, 0, 0, HER2_FISH_SICH.Negative, 0, "", 0);
  }

  ngOnInit(): void { }
}
