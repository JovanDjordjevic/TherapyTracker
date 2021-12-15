import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService { 

  private readonly urls = {
    getAllPatients: "http://localhost:5000/api/patient",
    getPatientByName: "http://localhost:5000/api/patient/:name",
    insertPatientInDB: "http://localhost:5000/api/patient/",
    deletePatientFromDB: "http://localhost:5000/api/patient/:jmbg",
  }

  constructor(private http: HttpClient) { }

  // NOTE TO SELF: request ce da prodje lepo tek kada se u nekoj komponenti subscribuje na observable objekat

  // FIXME: svaki zahtev u dev konzoli u browseru kaze da se desila neka ovakva greska:
  // Access to XMLHttpRequest at 'http://localhost:5000/api/patient/' from origin 'http://localhost:4200' has been blocked by CORS 
  // policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

  public getAllPatients() : Observable<Patient[]>{
    const obs: Observable<Patient[]> = this.http.get<Patient[]>(this.urls.getAllPatients, {});
    return obs;
  }
  
  // Patient[] jer moze da se desi da ih ima vise sa istim imenom 
  public getPatientByName(firstName : string, lastName : string = "") : Observable<Patient[]>{
    const params: HttpParams = new HttpParams().append('firstName', firstName).append('lastName', lastName);
    const obs: Observable<Patient[]> = this.http.get<Patient[]>(this.urls.getPatientByName, {params: params});
    return obs;
  }

  // FIXME: ovaj zahtev se ne prihvata na serverskoj strani (?)
  public insertPatientInDB() : Observable<Patient>{
    const obs: Observable<Patient> = this.http.post<Patient>(this.urls.insertPatientInDB, {});
    return obs;
  }

  // FIXME: ovaj zahtev se ne prihvata na serverskoj strani (?)
  public deletePatientFromDB() : Observable<Patient>{
    const obs: Observable<Patient> = this.http.delete<Patient>(this.urls.insertPatientInDB, {});
    return obs;
  }

}
