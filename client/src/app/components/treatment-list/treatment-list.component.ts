import { Component, OnInit, Input } from '@angular/core';
import { Therapy } from 'src/app/models/therapy.model';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css'],
})
export class TreatmentListComponent implements OnInit {
  @Input() therapies: Therapy[] = [];
  constructor() {}

  ngOnInit(): void {}
}
