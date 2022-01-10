import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Therapy } from 'src/app/models/therapy.model';
import { formattedDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['../../../styles/table.css'],
})
export class TreatmentListComponent implements OnInit {
  @Input() therapies: Therapy[] = [];
  @Input() position: boolean = false;
  @Output() selectTherapy = new EventEmitter<Therapy>();
  @Output() loadMoreTherapies = new EventEmitter<string>();

  formatDate = formattedDate;
  constructor() { }

  openTherapy(therapy: Therapy) {
    this.selectTherapy.emit(therapy);
  }

  onScrollDown(ev: any) {
    this.loadMoreTherapies.emit("load more therapies emitted")
  }

  ngOnInit(): void { }
}
