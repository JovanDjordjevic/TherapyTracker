import { Component, Input, OnInit } from '@angular/core';
import { Therapy, TherapyType } from 'src/app/models/therapy.model';

@Component({
  selector: 'app-treatment-tab',
  templateUrl: './treatment-tab.component.html',
  styleUrls: ['./treatment-tab.component.css'],
})
export class TreatmentTabComponent implements OnInit {
  showTherapyForm: boolean = false;
  showTherapyInfo: boolean = false;

  @Input() therapies: Therapy[] = [];
  therapy: Therapy;

  onShowBiopsyForm() {
    this.showTherapyForm = !this.showTherapyForm;
    this.showTherapyInfo = false;
  }

  constructor() {
    this.therapy = new Therapy(new Date, 0, TherapyType.AC, false, 0, 0, "test", "test");
  }

  onTherapySelected(value: any) {
    this.therapy = value;
    this.showTherapyForm = false;
    this.showTherapyInfo = true;
  }

  ngOnInit(): void { }
}
