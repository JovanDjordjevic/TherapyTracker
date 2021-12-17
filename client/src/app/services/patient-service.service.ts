import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService { 

  private readonly urls = {
    getAllPatients: "http://localhost:5000/api/patient",
    getPatientByName: "http://localhost:5000/api/patient/findByName",
    insertPatientInDB: "http://localhost:5000/api/patient/",
    deletePatientFromDB: "http://localhost:5000/api/patient/",
  }

  constructor(private http: HttpClient) { }

  // NOTE TO SELF: request ce da prodje lepo tek kada se u nekoj komponenti subscribuje na observable objekat

  public getAllPatients() : Observable<Patient[]>{
    const obs: Observable<Patient[]> = this.http.get<Patient[]>(this.urls.getAllPatients, {});
    //obs.subscribe((data)=>{console.log(data)});      // for testing
    return obs;
  }

  // Patient[] jer moze da se desi da ih ima vise sa istim imenom 
  public getPatientByName(firstName : string= "", lastName : string = "") : Observable<Patient[]>{
    const params: HttpParams = new HttpParams().append('firstName', firstName).append('lastName', lastName);
    const obs: Observable<Patient[]> = this.http.get<Patient[]>(this.urls.getPatientByName, {params: params});
    //obs.subscribe((data)=>{console.log(data)});      // for testing
    return obs;
  }

  public insertPatientInDB(patient : Patient) : Observable<Patient>{
    const obs: Observable<Patient> = this.http.post<Patient>(this.urls.insertPatientInDB, {patient});
    //obs.subscribe((data)=>{console.log(data)});      // for testing
    return obs;
  }

  public deletePatientFromDB(jmbg : string) : Observable<void>{
    const obs: Observable<void> = this.http.delete<void>(this.urls.insertPatientInDB + '/' + jmbg);
    //obs.subscribe(()=>{console.log("deleted")});     // for testing
    return obs;
  }

}
