import { Component, Input, OnInit } from '@angular/core';
import { Therapy, TherapyType } from 'src/app/models/therapy.model';

@Component({
  selector: 'app-treatment-info',
  templateUrl: './treatment-info.component.html',
  styleUrls: ['./treatment-info.component.css']
})
export class TreatmentInfoComponent implements OnInit {
  @Input() therapy: Therapy
  therapyShortString: string = '';

  constructor() {
    this.therapy = new Therapy(new Date(), 0, TherapyType.AC, true, 0, 0, '', '');
  }

  ngOnInit(): void {
    //console.log('current therapy:', this.therapy)
    this.therapyShortString = this.therapy.numCycles + this.therapy.therapyType;
    if (this.therapy.numTaxol > 0) {
      this.therapyShortString += "+" + this.therapy.numTaxol + "TAXOL";
    }

    if (this.therapy.numTxtr > 0) {
      this.therapyShortString += "+" + this.therapy.numTxtr + "TXTR";
    }

    if (this.therapy.herceptinTherapy != 'nije primenljivo') {
      this.therapyShortString += "+" + this.therapy.herceptinTherapy + "H";
    }
  }

}
