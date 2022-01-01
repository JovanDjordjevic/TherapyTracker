import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { Patient, PatientPagination } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly urls = {
    getAllPatients: 'http://localhost:5000/api/patient',
    getPatientByName: 'http://localhost:5000/api/patient/findByName',
    insertPatientInDB: 'http://localhost:5000/api/patient/',
    updatePatientInfo: 'http://localhost:5000/api/patient/',
    deletePatientFromDB: 'http://localhost:5000/api/patient/', // na ovo se nadoveze patientId u zahtevu, kaos to se zahteva u ruteru
  };

  constructor(private http: HttpClient) {}

  // NOTE TO SELF: request ce da prodje lepo tek kada se u nekoj komponenti subscribuje na observable objekat

  public getAllPatients(
    page: number = 1,
    limit: number = 20
  ): Observable<Patient[]> {
    const params: HttpParams = new HttpParams()
      .append('page', page)
      .append('limit', limit);
    const obs: Observable<Patient[]> = this.http
      .get<PatientPagination>(this.urls.getAllPatients, { params })
      .pipe(
        map((pagination: PatientPagination) => {
          return pagination.docs;
        })
      );
    //obs.subscribe((data)=>{console.log(data)});      // for testing
    return obs;
  }

  // Patient[] jer moze da se desi da ih ima vise sa istim imenom
  public getPatientByName(
    firstName: string = '',
    lastName: string = ''
  ): Observable<Patient[]> {
    const params: HttpParams = new HttpParams()
      .append('firstName', firstName)
      .append('lastName', lastName);
    const obs: Observable<Patient[]> = this.http.get<Patient[]>(
      this.urls.getPatientByName,
      { params: params }
    );
    //obs.subscribe((data)=>{console.log("ByName", data)});      // for testing
    return obs;
  }

  public insertPatientInDB(patient: Patient): Observable<Patient> {
    const obs: Observable<Patient> = this.http.post<Patient>(
      this.urls.insertPatientInDB,
      { patient }
    );
    // obs.subscribe((data) => {
    //   console.log('inserted', data);
    // }); // for testing
    return obs;
  }

  public updatePatientInfo(patient: Patient): Observable<Patient> {
    const obs: Observable<Patient> = this.http.put<Patient>(
      this.urls.updatePatientInfo,
      { patient }
    );
    // obs.subscribe((data)=>{console.log("updated", data)});      // for testing
    return obs;
  }

  public deletePatientFromDB(_id: string): Observable<void> {
    const obs: Observable<void> = this.http.delete<void>(
      this.urls.deletePatientFromDB + '/' + _id
    );
    //obs.subscribe(()=>{console.log("deleted")});     // for testing
    return obs;
  }
}
