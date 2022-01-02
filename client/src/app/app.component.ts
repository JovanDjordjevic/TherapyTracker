import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TherapyTracker';

  displayHome : boolean = true;
  displayAllPatientsList: boolean = false;
  displayPatientForm : boolean = false;
  displayPatientHistory : boolean = false;
  displayAllBiopsiesList : boolean = false;
  displayAllTumorsList : boolean = false;
  displayAllTreatmentsList : boolean = false;

  onDisplayHome(){
    //console.log("onDisplayHome");
    this.displayHome = true;              //
    this.displayAllPatientsList = false;
    this.displayPatientForm = false;
    this.displayPatientHistory = false;
    this.displayAllBiopsiesList = false;
    this.displayAllTumorsList = false;
    this.displayAllTreatmentsList = false;
  }

  onDisplayPatients(){
    //console.log("onDisplayPatients");
    this.displayHome = false;
    this.displayAllPatientsList = true;         //
    this.displayPatientForm = false;
    this.displayPatientHistory = false;
    this.displayAllBiopsiesList = false;
    this.displayAllTumorsList = false;
    this.displayAllTreatmentsList = false;
  }
  
  onDisplayPatientForm(){
    //console.log("onDisplayPatientForm");
    this.displayHome = false;
    this.displayAllPatientsList = false;
    this.displayPatientForm = true;         //
    this.displayPatientHistory = false;
    this.displayAllBiopsiesList = false;
    this.displayAllTumorsList = false;
    this.displayAllTreatmentsList = false;     
  }

  onDisplayPatientHistory(){
    //console.log("onDisplayPatientHistory");
    this.displayHome = false;
    this.displayAllPatientsList = false;
    this.displayPatientForm = false;
    this.displayPatientHistory = true;    //
    this.displayAllBiopsiesList = false;
    this.displayAllTumorsList = false;
    this.displayAllTreatmentsList = false;     
  }

  onDisplayBiopsies(){
    // console.log("onDisplayBiopsies");
    this.displayHome = false;
    this.displayAllPatientsList = false;
    this.displayPatientForm = false;
    this.displayPatientHistory = false;
    this.displayAllBiopsiesList = true;        //
    this.displayAllTumorsList = false;
    this.displayAllTreatmentsList = false;

  }

  onDisplayTumors(){
    //console.log("onDisplayTumors");
    this.displayHome = false;
    this.displayAllPatientsList = false;
    this.displayPatientForm = false;
    this.displayPatientHistory = false;
    this.displayAllBiopsiesList = false;
    this.displayAllTumorsList = true;         //
    this.displayAllTreatmentsList = false;
  }

  onDisplayTherapies(){
    //console.log("onDisplayTherapies");
    this.displayHome = false;
    this.displayAllPatientsList = false;
    this.displayPatientForm = false;
    this.displayPatientHistory = false;
    this.displayAllBiopsiesList = false;
    this.displayAllTumorsList = false;
    this.displayAllTreatmentsList = true;     //
  }
}
