import { Component, OnInit, Input } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { Observable } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';

declare const $: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  @Input() patient: Patient;
  biopsies: Observable<Biopsy[]> = {} as Observable<Biopsy[]>;
  constructor(private biopsyService: BiopsyService) {
    this.patient = new Patient(
      's',
      '',
      '',
      '',
      0,
      Gender.Female,
      Menopause.Peri,
      '',
      '',
      '',
      '',
      new Date(),
      ''
    );
  }

  ngOnInit() {
    console.log(this.patient._id);
    this.biopsies = this.biopsyService.getAllBiopsiesForPatient(
      this.patient._id,
      1
    );

    this.biopsyService
      .getAllBiopsiesForPatient(this.patient._id, 1)
      .subscribe((data) => console.log(data));
    $('.menu .item').tab();
  }
}
