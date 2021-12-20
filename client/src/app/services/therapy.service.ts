import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Therapy } from '../models/therapy.model';

@Injectable({
  providedIn: 'root'
})
export class TherapyService {
  private readonly urls = {
    getAllTherapies: "http://localhost:5000/api/therapy",
    getAllTherapiesForPatient: "http://localhost:5000/api/therapy/getTherapiesForPatient",
    addNewTherapyForPatient: "http://localhost:5000/api/therapy/",
    updateTherapyInfo: "http://localhost:5000/api/therapy/",
    deleteTherapyForPatient: "http://localhost:5000/api/therapy/",  // na ovo se nadoveze patientId i therapyId u zahtevu, kaos to se zahteva u ruteru
  }

  constructor(private http: HttpClient) { }

  public getAllTherapies() : Observable<Therapy[]>{
    const obs: Observable<Therapy[]> = this.http.get<Therapy[]>(this.urls.getAllTherapies, {});
    //obs.subscribe((data : Therapy[])=>console.log(data));
    return obs;
  }
  
  public getAllTherapiesForPatient(patientId : string) : Observable<Therapy[]>{
    const params: HttpParams = new HttpParams().append('_id', patientId)
    const obs: Observable<Therapy[]> = this.http.get<Therapy[]>(this.urls.getAllTherapiesForPatient, {params: params});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public addNewTherapyForPatient(patientId : string, therapy : Therapy) : Observable<Therapy>{
    const obs: Observable<Therapy> = this.http.post<Therapy>(this.urls.addNewTherapyForPatient, {patientId, therapy});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public updateTherapyInfo(therapy : Therapy) : Observable<Therapy>{
    const obs: Observable<Therapy> = this.http.put<Therapy>(this.urls.updateTherapyInfo, {therapy});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public deleteTherapyForPatient(patientId : string, therapyId : string) : Observable<Therapy>{
    const obs: Observable<Therapy> = this.http.delete<Therapy>(this.urls.deleteTherapyForPatient + '/' + patientId + '/' + therapyId);
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }
}
