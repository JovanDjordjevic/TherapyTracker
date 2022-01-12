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
    this.therapy = new Therapy(new Date, 2, TherapyType.AC, 3, 2, "2", "temp", "neki komentar");
  }

  ngOnInit(): void {
  }

}
