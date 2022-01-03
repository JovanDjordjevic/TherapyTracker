import { formatDate } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { Patient, Gender, Menopause } from 'src/app/models/patient.model';
import { formattedDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-biopsy-list',
  templateUrl: './biopsy-list.component.html',
  styleUrls: ['./biopsy-list.component.css'],
})
export class BiopsyListComponent implements OnInit {
  @Input() biopsies: Biopsy[] = [];
  @Output() selectBiopsy = new EventEmitter<Biopsy>();
  formattedDate = formattedDate;

  openBiopsy(biopsy: Biopsy) {
    this.selectBiopsy.emit(biopsy);
  }

  constructor() { }

  ngOnInit(): void { }
}
