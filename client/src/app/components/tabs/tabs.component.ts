import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { Observable, Subscription } from 'rxjs';
import { Biopsy } from 'src/app/models/biopsy.model';
import { BiopsyService } from 'src/app/services/biopsy-service.service';
import { PatientService } from 'src/app/services/patient-service.service';

declare const $: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnDestroy{
  //@Input() patient: Patient;
  currentPatient : Patient;

  biopsies: Biopsy[] = []
  sub : Subscription = new Subscription;

  constructor(private patietnService : PatientService, private biopsyService: BiopsyService) {

    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  );   
    this.currentPatient = patietnService.getCurrentPatient();

    //console.log(this.patient._id);  // error
    this.sub =  this.biopsyService.getAllBiopsiesForPatient(this.currentPatient._id, 1).subscribe( (biopsies : Biopsy[]) => {
      this.biopsies = biopsies;
      //console.log("all biopsies for patient: ", this.biopsies);
    });
  }

  ngOnInit() {
    $('.menu .item').tab();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
