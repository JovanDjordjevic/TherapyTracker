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

  // FIXME: ovaj zahtev se prihvati na serverskoj strani, ali onda na client strani u konzoli kaze da postoji neka greska na serverskoj strani
  // POST http://localhost:5000/api/patient/ 500 (Internal Server Error)
  public insertPatientInDB() : Observable<Patient>{
    const obs: Observable<Patient> = this.http.post<Patient>(this.urls.insertPatientInDB, {});
    return obs;
  }

  // FIXME: ovaj zahtev se ne prihvata na serverskoj strani (?)
  // kada se posalje, na client strani dobijam isti DELETE ... internal server error kao za POST
  public deletePatientFromDB(jmbg : string) : Observable<Patient>{
    const body = {
      'jmbg' : jmbg,
    };
    const obs: Observable<Patient> = this.http.delete<Patient>(this.urls.insertPatientInDB, {body: body});
    return obs;
  }

}
