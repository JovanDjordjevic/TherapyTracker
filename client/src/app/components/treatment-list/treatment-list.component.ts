import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Therapy } from 'src/app/models/therapy.model';
import { formattedDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css'],
})
export class TreatmentListComponent implements OnInit {
  @Input() therapies: Therapy[] = [];
  @Output() selectTherapy = new EventEmitter<Therapy>();
  formatDate = formattedDate;
  constructor() { }

  openTherapy(therapy: Therapy) {
    this.selectTherapy.emit(therapy);
  }

  ngOnInit(): void { }
}
